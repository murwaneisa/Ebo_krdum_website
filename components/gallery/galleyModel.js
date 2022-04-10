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
		let globalSize;
		if (typeof window !== "undefined") {
			const [size, setSize] = useState(window.innerWidth);
			useEffect(() => {
				const handleResize = () => {
					setSize(window.innerWidth);
				};
				window.addEventListener("resize", handleResize);
			}, []);

			if (size <= 290) {
				globalSize = "sm";
				console.log("1-size is", globalSize, "windowS is", size);
			} else if (290 < size && size <= 800) {
				globalSize = "lg";
				console.log("2-size is", globalSize, "windowS is", size);
			} else {
				globalSize = "3xl";
				console.log("3-size is", globalSize, "windowS is", size);
			}
		}
		console.log("gloabalsize", globalSize);
		return globalSize;
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
						showStatus={false}
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

/* height="100%"
width="100%"
position="relative"
backgroundPosition="center"
backgroundRepeat="no-repeat"
backgroundSize={["contain", "cover", "full"]}
backgroundImage={`url(${imageCDN(img.itemImage)})`} */
