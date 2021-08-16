import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

const SongsModal = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Modal isOpen={props.isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<p>Hello</p>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
						<Button variant="ghost">
							<p>Secondary Action</p>
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default SongsModal;
