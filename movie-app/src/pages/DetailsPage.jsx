import { useParams } from "react-router-dom";
import { Box, Flex, Spinner, Image, Container, Heading, Text, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { fetchDetails, imagePath, imagePathOriginal } from "../services/api";
import { CalendarIcon } from "@chakra-ui/icons";
import { format } from 'date-fns';
import {minutesTohours, ratingToPercentage, resolveRatingColor} from "../utils/helper";

const DetailsPage = () => {
    const { type, id } = useParams();
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState({});

    useEffect(() => {
        fetchDetails(type, id)
            .then((res) => {
                setDetails(res);
                console.log(res);
            })
            .catch((err) => {
                console.log(err, "err");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [type, id]);

    if (loading) {
        return (
            <Flex justify="center">
                <Spinner size="xl" color="red" />
            </Flex>
        );
    }

    const title = details?.title || details?.name;
    const releaseDate = details?.release_date || details?.first_air_date;
    const formattedDate = releaseDate ? format(new Date(releaseDate), 'dd-MM-yyyy') : '';
    const rate = details?.vote_average;

    return (
        <Box>
            <Box background={`linear-gradient(rgba(0, 0, 0, 0.90), rgba(0, 0, 0, 0.90)), url(${imagePathOriginal}/${details?.backdrop_path})`}
                backgroundRepeat={"no-repeat"}
                backgroundSize={"cover"}
                backgroundPosition={"center"}
                w={"100%"}
                h={{base: "auto", md: "666px"}}
                zIndex={"-1"}
                py={"2"}
                display={"flex"}
                alignItems={"center"}
                >
                <Container maxW={"container.xl"}>
                    <Flex alignItems="center" gap="10" flexDirection={{ base: "column", md: "row" }}>
                        <Image height="450px" borderRadius="sm" src={`${imagePath}/${details?.poster_path}`} />
                        <Box>
                            <Heading fontSize="3xl">
                            <Box>
                                <Text as="span" fontSize="md" color="gray.400">{title}</Text>
                            </Box>
                            <Box>
                                <Text as="span" fontSize="md" color="gray.400">{releaseDate}</Text>
                            </Box>
                            <Box>
                                <Text as="span" fontSize="md" color="gray.400">{rate}</Text>
                            </Box>
                            </Heading>

                            <Flex alignItems="center" gap="4" mt="1" mb="5">
                                <Flex alignItems="center">
                                    <CalendarIcon mr={2} color={"gray.400"}/>
                                    <Text fontSize="small">
                                        {formattedDate}
                                    </Text>
                                </Flex>
                            </Flex>

                            <Flex alignItems="center" gap="4" >
                                <CircularProgress
                                    value={ratingToPercentage(details?.vote_average)}
                                    bg={"gray.600"}
                                    borderRadius={"full"}
                                    p={"0.5"}
                                    size={"70px"}
                                    color={resolveRatingColor(details?.vote_average)}
                                    thickness={"6px"}
                                >
                                    <CircularProgressLabel fontSize={"lg"}>
                                        {ratingToPercentage(details?.vote_average)}{" "}
                                        <Box as="span" fontSize={"10px"}>%</Box>
                                    </CircularProgressLabel>
                                </CircularProgress>
                                <Text display={{ base: "none", md: "initial" }}>
                                    User Score
                                </Text>
                            </Flex>

                        </Box>
                    </Flex>
                </Container>
            </Box>
        </Box>
    );
};

export default DetailsPage;