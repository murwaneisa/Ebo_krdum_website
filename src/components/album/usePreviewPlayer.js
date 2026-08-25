import { useCallback, useEffect, useRef, useState } from "react";

/*
 * Playback state for one album's 30-second Deezer previews.
 *
 * Shared by the inline Tracklist and the Spotify-style AlbumPreviewPlayer card
 * so the two can never drift apart.
 *
 * Preview URLs are never prerendered: Deezer signs them with a 15-minute expiry
 * and answers 403 afterwards, so they are fetched from /api/previews/[albumId]
 * on the first press. If a signature lapses while the tab sits open, playback
 * fails and `playTrack` retries once with a fresh set.
 *
 * `audioRef` is owned by the caller and attached to its own <audio> element.
 * Deliberately not created and returned from here: a ref handed back out of a
 * hook taints the whole returned object for the react-hooks/refs rule, which
 * then flags every plain field on it as a ref read during render.
 */
export default function usePreviewPlayer(deezerAlbumId, tracks = [], audioRef) {
  const previewsRef = useRef(null); // { [trackId]: signed mp3 url }
  const [currentId, setCurrentId] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  // Named currentTrack, not current: a `.current` property read during render
  // trips the react-hooks/refs lint rule, which cannot tell it from a ref.
  const currentTrack = tracks.find((t) => t.id === currentId) || null;

  const loadPreviews = useCallback(
    async (force = false) => {
      if (previewsRef.current && !force) return previewsRef.current;
      const res = await fetch(`/api/previews/${deezerAlbumId}`);
      if (!res.ok) throw new Error("Previews are unavailable right now");
      const json = await res.json();
      previewsRef.current = Object.fromEntries(
        (json.previews || []).map((p) => [p.id, p.preview])
      );
      return previewsRef.current;
    },
    [deezerAlbumId]
  );

  const playTrack = useCallback(
    async (track) => {
      const audio = audioRef.current;
      if (!audio) return;

      setError(null);
      setLoadingId(track.id);
      try {
        const start = async (src) => {
          audio.src = src;
          await audio.play();
        };

        let map = await loadPreviews();
        if (!map[track.id]) map = await loadPreviews(true);
        if (!map[track.id]) throw new Error("No preview for this track");

        try {
          await start(map[track.id]);
        } catch {
          // Most likely a lapsed signature. Refresh once, then give up.
          map = await loadPreviews(true);
          if (!map[track.id]) throw new Error("No preview for this track");
          await start(map[track.id]);
        }

        setCurrentId(track.id);
        setPlaying(true);
      } catch (err) {
        setError(err.message || "Could not play this track");
        setCurrentId(null);
        setPlaying(false);
      } finally {
        setLoadingId(null);
      }
    },
    [loadPreviews, audioRef]
  );

  const toggle = useCallback(
    (track) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (track.id !== currentId) {
        playTrack(track);
        return;
      }
      if (audio.paused) {
        audio
          .play()
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      } else {
        audio.pause();
        setPlaying(false);
      }
    },
    [currentId, playTrack, audioRef]
  );

  /** Play/pause whatever is loaded, starting at track one if nothing is. */
  const toggleCurrent = useCallback(() => {
    if (!currentTrack) {
      if (tracks[0]) playTrack(tracks[0]);
      return;
    }
    toggle(currentTrack);
  }, [currentTrack, tracks, playTrack, toggle]);

  // Advance through the record the way an album is actually listened to.
  const onEnded = useCallback(() => {
    const i = tracks.findIndex((t) => t.id === currentId);
    const next = i >= 0 ? tracks[i + 1] : null;
    if (next) {
      playTrack(next);
    } else {
      setPlaying(false);
      setCurrentId(null);
    }
  }, [tracks, currentId, playTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;
    const onTime = () => setElapsed(audio.currentTime || 0);
    const onMeta = () => setTotal(audio.duration || 0);
    const onPause = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [onEnded, audioRef]);

  const seek = useCallback(
    (value) => {
      const audio = audioRef.current;
      if (audio && total) audio.currentTime = (Number(value) / 1000) * total;
    },
    [total, audioRef]
  );

  const step = useCallback(
    (delta) => {
      const i = tracks.findIndex((t) => t.id === currentId);
      const next = tracks[(i < 0 ? 0 : i) + delta];
      if (next) playTrack(next);
    },
    [tracks, currentId, playTrack]
  );

  return {
    currentTrack,
    currentId,
    playing,
    loadingId,
    elapsed,
    total,
    error,
    toggle,
    toggleCurrent,
    step,
    seek,
    progress: total ? (elapsed / total) * 100 : 0,
  };
}

/** mm:ss for a duration in seconds. */
export function fmt(seconds) {
  if (!seconds || Number.isNaN(seconds)) return "0:00";
  const s = Math.floor(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
