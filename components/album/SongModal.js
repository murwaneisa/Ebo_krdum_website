import {
	Link,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import ButtonUi from "../UI/Button";

const SongModal = (props) => {
	const { isOpen, onOpen, onClose, name, spotify, trialSong } = props;
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent color="black">
					<ModalHeader>
						{name}
						<Text fontSize="sm" fontStyle="italic" color="gray.600">
							Play demo
						</Text>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody alignSelf="center">
						<audio controls autoPlay>
							<source src={trialSong} type="audio/mpeg" />
							Your browser does not support the audio element.
						</audio>
					</ModalBody>

					<ModalFooter>
						{spotify && (
							<Link href={spotify} isExternal>
								<ButtonUi marginRight={3}>Play on Spotify</ButtonUi>
							</Link>
						)}
						{/* <Button variant="ghost" onClick={onClose}>
              <p>Close</p>
            </Button> */}
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default SongModal;
