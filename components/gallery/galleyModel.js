import React from "react";
import {
	Box,
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
const GalleyModel = (props) => {
	const { isOpen, onOpen, onClose } = props;
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent color="black">
				<ModalHeader>
					<Text fontSize="sm" fontStyle="italic" color="gray.600">
						Play demo
					</Text>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody alignSelf="center">Contant</ModalBody>

				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default GalleyModel;
