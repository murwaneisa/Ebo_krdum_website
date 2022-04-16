import React, { useEffect, useState } from "react";
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	Flex,
	Box,
} from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { imageCDN } from "../../lib/imageCdnFn";
import Image from "next/image";

const GalleyModel = (props) => {
	const { isOpen, onClose, title, images } = props;

	const handleScreenSize = () => {
		// function to keep track of the screen size
		let modalSize;
		if (typeof window !== "undefined") {
			const [size, setSize] = useState(window.innerWidth);
			useEffect(() => {
				const handleResize = () => {
					setSize(window.innerWidth);
				};
				window.addEventListener("resize", handleResize); // add event listener to listen to screen siz
				return () => {
					window.removeEventListener("resize", handleResize); // remove the event listener
				};
			}, []);

			if (size <= 290) {
				modalSize = "sm";
			} else if (290 < size && size <= 800) {
				modalSize = "lg";
			} else if (801 <= size && size <= 1050) {
				modalSize = "2xl";
			} else {
				modalSize = "3xl";
			}
		}

		return modalSize;
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered
			size={handleScreenSize()}
		>
			<ModalOverlay />
			<ModalContent color="black">
				<ModalHeader>
					<Text fontSize="sm" fontStyle="italic" color="gray.600">
						{title}
					</Text>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody
					alignSelf="center"
					w="100%"
					h="100%"
					m={["0%", "1%"]}
					p={["0%", "1%", "2%"]}
				>
					<Carousel
						width="100%"
						showThumbs={false}
						infiniteLoop
						autoPlay
						showStatus={true}
						showArrows={true}
						useKeyboardArrows
						transitionTime={800}
					>
						{images.map((img) => (
							<Flex
								flexDirection="column"
								justifyContent="space-between"
								justifyItems="center"
								key={img.photoCaption}
								direction="row"
								key={img._key}
							>
								<Image
									src={imageCDN(img.itemImage)}
									objectFit="fill"
									objectPosition="center"
									width="800"
									height="800"
								/>
								<Box pt="2%">
									<Text>{img.photoCaption}</Text>
								</Box>
							</Flex>
						))}
					</Carousel>
				</ModalBody>
				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default GalleyModel;
