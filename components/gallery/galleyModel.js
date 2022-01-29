import React from "react";
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import ImageSlider from "./imageSlider";
const GalleyModel = (props) => {
	const { isOpen, onClose, title } = props;
	console.log("images", title);
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent color="black">
				<ModalHeader>
					<Text fontSize="sm" fontStyle="italic" color="gray.600">
						{title}
					</Text>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody alignSelf="center">
					<ImageSlider />
				</ModalBody>

				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default GalleyModel;
