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
import { GrNext, GrPrevious } from "react-icons/gr";
import { HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { imageCDN } from "../../lib/imageCdnFn";
import Image from "next/image";
import { IconContext } from "react-icons";
import { ClassNames } from "@emotion/react";

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
			} else if() {
				modalSize = "3xl";
			}
		}

		return modalSize;
	};
	const iconStyles = {
		hover: {
			size: "5rem",
		},
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
						renderArrowPrev={(
							// custom slide left arrow
							onClickHandler,
							hasPrev,
							label
						) =>
							hasPrev && (
								<button
									type="button"
									onClick={onClickHandler}
									title={label}
									style={{
										position: "absolute",
										zIndex: 2,
										top: "calc(50% - 15px)",
										width: 30,
										height: 30,
										cursor: "pointer",
										left: 15,
									}}
								>
									<IconContext.Provider //custom react icon
										value={{
											color: "#9e4620",
											size: "2rem",
											className: `${iconStyles}`,
										}}
									>
										<HiArrowCircleLeft />
									</IconContext.Provider>
								</button>
							)
						}
						renderArrowNext={(
							//custom slide right arrow
							onClickHandler,
							hasPrev,
							label
						) =>
							hasPrev && (
								<button
									type="button"
									onClick={onClickHandler}
									title={label}
									style={{
										position: "absolute",
										zIndex: 2,
										top: "calc(50% - 15px)",
										width: 30,
										height: 30,
										cursor: "pointer",
										right: 15,
									}}
								>
									<IconContext.Provider //custom react icon
										value={{ color: "#9e4620", size: "2rem" }}
									>
										<HiArrowCircleRight />
									</IconContext.Provider>
								</button>
							)
						}
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
								<Box pt="%">
									<Text>{img.photoCaption}</Text>
								</Box>
							</Flex>
						))}
					</Carousel>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default GalleyModel;
