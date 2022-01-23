import {
	Box,
	Divider,
	Flex,
	HStack,
	IconButton,
	Link,
	Stack,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { FiPlayCircle } from "react-icons/fi";
import CustomImage from "../UI/CustomImage";
import SongModal from "./SongModal";

const SongItem = (props) => {
	const { name, spotify, trialSong } = props;
	const { _ref: ref } = trialSong.asset;

	const assetRefParts = ref.split("-"); // ["file", "ff7...", "m4a"]
	const id = assetRefParts[1]; // "ff7..."

	const format = assetRefParts[2]; // "mp3"
	const assetUrl = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${format}`;

	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box p="1rem">
			{/* Divider between each song */}
			<Divider mb="2rem" />
			{/* Flex box for main song section */}
			<Flex direction="row" justify="space-between" align="center">
				{/* Stack section for play button and song name */}
				<HStack spacing="0.2rem">
					<IconButton
						colorScheme="yellow"
						aria-label="Play Demo Song"
						icon={<FiPlayCircle color="white" fontSize="24px" />}
						onClick={onOpen}
					/>
					<SongModal
						isOpen={isOpen}
						onClose={onClose}
						onOpen={onOpen}
						name={name}
						spotify={spotify}
						trialSong={assetUrl}
					/>
					<Text>{name}</Text>
				</HStack>
				{/* Linked Stack box of Spotify, following guidelines of Spotify to write "Play on" the the image. Se https://developer.spotify.com/documentation/general/design-and-branding/#using-our-logo */}
				{spotify ? (
					<Link href={spotify} isExternal>
						<Stack width="9rem" align="flex-end" spacing="-1">
							<Box width="40%">
								<Text fontSize="sm" fontWeight="bold">
									Play on
								</Text>
							</Box>
							<Box width="60%">
								<CustomImage
									src="/images/spotify-logos/Spotify_Logo_RGB_White.png"
									alt="Spotify"
									layout="fill"
								/>
							</Box>
						</Stack>
					</Link>
				) : (
					<Box>
						<Text fontSize="sm">Coming out soon</Text>
					</Box>
				)}
			</Flex>
		</Box>
	);
};

export default SongItem;
