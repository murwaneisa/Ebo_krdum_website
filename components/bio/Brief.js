import { Text } from "@chakra-ui/react";
import React from "react";
import CustomH4 from "../UI/CustomH4";
import TextSectionStack from "../UI/TextSectionStack";

const Brief = () => {
  return (
    <TextSectionStack>
      <CustomH4>Brief</CustomH4>
      <Text as="strong" fontSize="lg">
        A voice rising from the ashes of war
      </Text>
      <Text>
        Ebo Krdum is a Sudanese-Swedish self-taught singer, guitarist, artist,
        actor and activist. He creates contemporary political afro-blues &
        afrobeat music rooted in several musical traditions around the
        sub-Saharan area (in his current projects). Ebo sings in many different
        languages and his lyrics mostly contain topics such as justice, peace,
        freedom, equality, diversity, revolution and liberty.
      </Text>
      <Text>
        When Ebo was only six years old he discovered that he could sing and
        drum with his bare hands and he started entertaining people in his
        village, where he’d sometimes got paid with a small penny or sweets. At
        the age of thirteen he built his own guitar and learned how to play
        through his father’s radio and the only black-white TV in the village,
        where he got to hear artists such as Ali Farka Touré and Boubacar
        Traoré. Later in life Ebo also learned how to play other instruments
        such as Gojo, Ngoni, Oud, Tamboor, drums, keyboard and wood-flute.
      </Text>
      <Text>
        When the war started in Darfur in 2003 Ebo became an important voice for
        the peaceful revolution against the corrupt and violent regime. Beside
        his musical participation in the situation, he was also active in a huge
        activism for the opposition that aimed to overthrow the dictatorship in
        Sudan, which was also the reason why he was forced to flee the country.
        Ebo is now based in Stockholm, Sweden, where he has established himself
        as one of the most prominent world music acts on the music-scene. Here
        in Sweden he has also started his own band at the end of 2017, combined
        of 7-seven musicians.
      </Text>
      <Text>
        Today, Ebo and his band have 11-eleven songs released in both EP and
        singles forms. They were all from Ebo’s project (Memory of War).
      </Text>
      <Text>
        In September 2021 Ebo will release his first solo album
        &quot;Diversity&quot; on Sweden’s most interesting label
        &quot;Supertraditional&quot;. The album Diversity is from Ebo’s project
        named The Sub-Saharan Jigs. He will also start a new collaboration soon
        with the well-known music organization Selam.
      </Text>
    </TextSectionStack>
  );
};

export default Brief;
