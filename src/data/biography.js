/*
 * Biography copy, taken from the Claude Design artboard (Biography.dc.html).
 *
 * This is no longer what the page shows — it is the fallback. The Biography page
 * reads the `biographyPage` singleton in Sanity and falls back to these constants
 * field by field, so the site still reads correctly before the artist has filled
 * the document in, and on a machine with no .env at all.
 *
 * Field by field matters: editing a constant here has no effect on the live site
 * once the matching field has been filled in over in the CMS. If you are trying to
 * change wording, change it in the Studio, not here.
 *
 * HEADLINE is not in this file any more. It is a typographic device rather than
 * copy — its second half is set in italic amber — so it lives in the page that
 * renders it, which also keeps this module out of the browser bundle.
 */

export const INTRO =
  "Ebo Krdum is a Sudanese-Swedish self-taught singer, guitarist, artist, actor and activist. He creates contemporary political afro-blues & afrobeat music rooted in several musical traditions around the sub-Saharan area. Ebo sings in many different languages and his lyrics mostly contain topics such as justice, peace, freedom, equality, diversity, revolution and liberty.";

export const META = [
  { label: "Based in", value: "Stockholm" },
  { label: "Born", value: "Nyala, South Darfur" },
  { label: "Award", value: "Grammis 2022, Newcomer of the year 2020" },
];

export const PORTRAIT_CAPTION = "Self-taught since the age of six";

export const PROSE = [
  "When Ebo was only six years old he discovered that he could sing and drum with his bare hands and he started entertaining people in his village, where he'd sometimes got paid with a small penny or sweets. At the age of thirteen he built his own guitar and learned how to play through his father's radio and the only black-white TV in the village, where he got to hear artists such as Ali Farka Toure and Boubacar Traore. Later in life Ebo also learned how to play other instruments such as Gojo, Ngoni, Oud, Tamboor, drums, keyboard and wood-flute.",
  "When the war started in Darfur in 2003 Ebo became an important voice for the peaceful revolution against the corrupt and violent regime. Beside his musical participation in the situation, he was also active in a huge activism for the opposition that aimed to overthrow the dictatorship in Sudan, which was also the reason why he was forced to flee the country. Ebo is now based in Stockholm, Sweden, where he has established himself as one of the most prominent world music acts on the music-scene. Here in Sweden he has also started his own band at the end of 2017, combined of seven musicians.",
  "Today, Ebo and his band have eleven songs released in both EP and singles forms. They were all from Ebo's project (Memory of War). In September 2021 Ebo released his first solo album Diversity on Sweden's most interesting label Supertraditional. The album Diversity is from Ebo's project named The Sub-Saharan Jigs.",
  "Followed by two solo albums (Love & Struggle and Revolt For Change) in 2022 and one more (Soga Jamaile) in 2023, all three albums were released with the record label Epidemic Sound. Including the single (Warfree World) in 2023 as part of the UN SDGs. Ebo's last release is the single Umbele in 2024, a new and first of its kind collaboration in the electronic music world.",
];

export const SECTIONS = [
  {
    key: "journey",
    label: "Musical journey",
    kicker: "The beginning",
    title: "Selling cakes to earn a rehearsal",
    paras: [
      "Ebo started his musical journey as a kid in Ngala/Nyala town in South Darfur, where he joined the primary school. The beginning was singing in the classroom or school events, he then joined an organized group for kids his age that presented children's talents and helped them develop in theatre, dance and music.",
      "It wasn't as easy as Ebo thought it would be to get the opportunity to be discovered and developed, as he was not from the so-called rich class in society as most of the children in that group were. In that time he used to work after school, selling hats, cakes and snacks that his mother made to help the family, but he insisted and kept going to their rehearsals every day for more than half a year, until he got the chance to prove what he can do, and he kept it on ever since.",
    ],
    quote:
      "For the love of music I'd run home after school so that I could rush back out and sell something of what my mother made at home, in order to get the permission to go to the group rehearsal in the evening. It was so tight that there was no time to get cleaned up or change, so I'd just be happy getting the permission to go there, and looking good wasn't my concern at all.",
  },
  {
    key: "activist",
    label: "Human rights work",
    kicker: "Social worker & activist",
    title: "Music as the only living dynamo",
    paras: [
      "In 2004, after the war broke out in Darfur, Ebo joined the humanitarian field as a volunteer with WHO first, then moved on with international NGOs and UN agencies working in Darfur during the war. Up to 2009 he took part in many courses in human rights, gender based violence, child rights, peace-building, psychosocial support through art and creative activities, and many theatrical workshops.",
      "He worked on several projects involving UN agencies in collaboration with local and national NGOs, mostly in the camps for internally displaced people in different locations in Darfur, in stable communities and villages as well as war zones. He never left music despite all the work and the struggle of dealing with an escalating humanitarian situation. According to him, music was the only living dynamo keeping his soul thriving, providing hope and generating energy for his strength and creativity in the field.",
      "The experience of working in such political and humanitarian crises in his motherland gave him many ideas to write about, in both theatre and lyrics. Most of his lyrics and plays are message-based, reflecting tragedies and hard truths, discussing sensitive issues: society classifications, justice, freedom, peace, civil rights, harmful traditional habits, gender based violence, equality, prejudice and stereotypes, and criticism of corrupt politicians.",
    ],
    quote:
      "When a part of my body is infected or affected, the rest of me will definitely feel that. The same thing applies to me and my relation to a nation and the entire world. I can't turn myself into feelingless, blind and deaf while I'm privileged with these senses, especially when I dare to call myself an artist.",
  },
  {
    key: "political",
    label: "Political background",
    kicker: "Reading & formation",
    title: "From socialism to Pan-Africanism",
    paras: [
      "He started reading books after joining secondary school. What was available to him was books about socialism in Europe. He then expanded his interest to Pan-Africanism and the pan-African movement, which led him further to read about the Black Panther Party in the USA, where he got to know great writers and revolutionaries such as Thomas Sankara, Kwame Nkrumah, Patrice Lumumba, Ahmed Sekou Toure, Marcus Garvey, Angela Davis, Julius Nyerere, Haile Selassie, Malcolm X and Martin Luther King.",
      "He began to understand that in many parts of this world there are issues of colonialism, racism, civil rights, discrimination, oppression, corruption, marginalization and revolution. That made him more aware and opened his mind to what was really going on in Sudan, and to the revolution of the SPLM, which he considers a very important part of his musical and personal formation then and now.",
    ],
    quote:
      "An artist with a commitment needs to be aware of everything happening in their present and past history. As artists we are not separated from the history of our nations and we're part of this world, and every artist needs to be backed up and inspired by their history, with its pain and its sweetness. No matter.",
  },
  {
    key: "sufism",
    label: "Spirituality & Sufism",
    kicker: "Vocal technique",
    title: "Tone-combinations learned in prayer",
    paras: [
      "He considers this an important part of his musical formation as well: reading about Shikho Omar Alfoty, Muntagha Alfoty, Amadou Hampate Ba, Ibrahim BinYas and Shikho Musa Eltigani. Learning more by listening when he joined his father Khalil, who was a Tigani himself, was a big plus, especially for gaining new vocal technique from their Azkar and prayers.",
    ],
    quote:
      "What I focused on most was the melodic and harmonic vocal sounds during the prayers. There you get to listen to totally different tone-combinations than when listening to a musical instrument or practicing singing.",
  },
  {
    key: "influences",
    label: "Influences",
    kicker: "Influential & inspiring artists",
    title: "Whatever came his way",
    paras: [
      "Ebo was influenced and inspired by many artists he got to hear and listen to. Most of them left an impression on Ebo the kid and the artist today. Putting in consideration where he comes from: Ali Farka Toure, Amadou & Mariam, Bara Sambaru, Maryom Ammou, Adam Abu Taweela, Alpha Blondy, Peter Tosh, Tracy Chapman, Hawa Ramadan, Mississippi John Hurt, Fela Kuti and many others from inside and outside the continent of Africa.",
    ],
    quote:
      "Back then I'd listen to whatever came my way, and some of the artists just got me stuck. The more I listened to their music repeatedly, the more I liked them and felt inspired by them, their stories, and their contribution with their music to nations.",
  },
];

export const IDEOLOGY = {
  statement:
    "Always stand with the poor's side, keep creating awareness on issues that need to be lifted up, never underestimate the power of words and music in creating change, always support the oppressed, vulnerable and marginalized people, and always choose nonviolence as a solution for conflicts and problems.",
  inspiration:
    "Real revolutionaries don't sleep, don't quit and never give up until they achieve what they started. If not in their time and generation, may it be a seed for new and upcoming generations, where they will be mentioned and remembered, as history will not forget and will never forgive. May justice, change, peace and love cover the whole world one day.",
  quote:
    "As an artist I have my commitments towards populations and nations, just like any other savior, warner or decision maker in any community. So I'm committed to speak the truth, to represent those who need me to put out their words and to cry out their suffering and pain, because I'm responsible for taking action and fighting with my lyrics, voice and hands against whatever evil I see, hear or feel around the smaller communities and up to the whole world.",
};

export const INFLUENCES = [
  "Ali Farka Toure",
  "Amadou & Mariam",
  "Bara Sambaru",
  "Maryom Ammou",
  "Adam Abu Taweela",
  "Alpha Blondy",
  "Peter Tosh",
  "Tracy Chapman",
  "Hawa Ramadan",
  "Mississippi John Hurt",
  "Fela Kuti",
  "Boubacar Traore",
];
