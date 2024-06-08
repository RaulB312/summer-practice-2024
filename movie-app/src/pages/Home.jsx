import { Container } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { fetchTrending } from '../services/api';
import { Grid } from '@chakra-ui/react'
import CardComponent from '../components/CardComponent';
import { Flex } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react';
import { Skeleton } from '@chakra-ui/react'

const Home = () => {

  const [data, setData] = useState([]);
  const[timeWindow, setTimeWindow] = useState("day");
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchTrending(timeWindow)
      .then((res) => {
        setData(res);
      }).catch((err) => {
        console.log(err, "err");
      }).finally(() => {
        setLoading(false);
      })
  }, [timeWindow]);


  return (
    <Container maxW={'container.xl'} >

    <Flex alignItems="baseline" gap = "4" my="10">
      <Heading as="h2" size="md" textTransform={"uppercase"}>
        Trending
      </Heading>
      <Flex alignItems = "center" gap = "2" border = {"1px solid teal"} borderRadius = {"20px"} >
        <Box as="button" px="3" py="1" borderRadius="20px" bg={`${timeWindow === "day" ? "orange.700" : ""}`}  _hover={{ bg: timeWindow === 'day' ? 'orange.900' : '' }} onClick={() => setTimeWindow("day")}>
          Today
        </Box>
        <Box as="button" px="3" py="1" borderRadius="20px" bg={`${timeWindow === "week" ? "orange.700" : ""}`} _hover={{ bg: timeWindow === 'week' ? 'orange.900' : '' }} onClick={() => setTimeWindow("week")}>
          This Week
        </Box>
      </Flex>
    </Flex>
    {loading && <div>Loading ...</div>}
        <Grid templateColumns={{
          base: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(5, 1fr)',
        }} gap = "5">
          {data &&
          data?.map((item, i) =>
            loading ? (
              <Skeleton height={300} key={i} />
            ) : (
              <CardComponent
                key={item?.id}
                item={item}
                type={item?.media_type}
              />
            )
          )}
        </Grid>
    </Container>
  )
}

export default Home