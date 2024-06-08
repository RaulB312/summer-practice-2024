import { Link } from 'react-router-dom'
import { Box, Image, Text, Flex } from '@chakra-ui/react'
import { imagePath } from '../services/api'
import { transform } from 'framer-motion'
import { StarIcon } from '@chakra-ui/icons'

const CardComponent = ({item, type}) => {
  return (
    <Link to= {`${type}/${item?.id}`}>
        <Box position={"relative"} transform={"scale(1)"} 
            _hover = {{
                transform: {base: "scale(1)", md: "scale(1.08)"},
                transition: "transform 0.2s ease-in-out",
                zIndex : "10",
                "& .overlay" : {
                    opacity: 1
                },
            }}>
            <Image src={`${imagePath}/${item?.poster_path}`} alt={item?.title || item?.name} height = {"100%"} />
            <Box
            className="overlay" 
            position={"absolute"} p = "2" bottom={"0"} left = {"0"} w =  {"100%"} h = {"33%"} bg = "rgba(0, 0, 0, 0.9)" opacity={"0"} transition={"opacity 0.3s ease-in-out"}>
                <Text color = "white" align = "center">{item?.title || item?.name} </Text>
                <Text color = "white" align = "center" fontSize = {"x-small"}>{item?.release_date || item?.first_air_date} </Text>
                <Flex alignItems = "center" justifyContent = "center" >
                <Text color={item?.vote_average > 8 ? 'green.800' : item?.vote_average > 7 ? 'lightgreen' : item?.vote_average > 6 ? 'yellow.500' : item?.vote_average > 5 ? 'orange.500' : 'red.500'} align = "center" fontSize = {"small"} fontWeight="bold">{item?.vote_average.toFixed(1)} </Text>
                <StarIcon fontSize = {"small"} color = "white" />
                </Flex>
            </Box>
        </Box>
    </Link>
  )
}

export default CardComponent;