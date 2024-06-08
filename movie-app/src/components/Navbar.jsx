import {Box, Container, Flex, Avatar, Menu, MenuButton, MenuItem, MenuList} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { SearchIcon } from '@chakra-ui/icons';


const Navbar = () => {
    const {user, signInWithGoogle, logOut} = useAuth();


    const handleGoogleLogIn = async () => {
        try {
            await signInWithGoogle();
            console.log("Logged in");
        } catch (error) {
            console.error(error, "error");
            
        }
    }

  return (
    <Box py = "4" mb = "2">
        <Container maxW={'container.xl'} >
            <Flex justifyContent={"space-between"}>
                <Link to = "/">
                    <Box fontSize = {"2xl"} fontWeight={"bolt"} color={"Red"} letterSpacing = {"widset"} fontFamily= {"mono"}>
                        Metflix
                    </Box>
                </Link>
                {/* Desktop */}
                <Flex gap="4" alignItems="center" fontSize="25" fontStyle="italic">
                    <Link to = "/">
                        Home
                    </Link>
                    <Link to = "/movies">
                        Movies
                    </Link>
                    <Link to = "/shows">
                        TV Shows
                    </Link>
                    <Link to = "/search">
                        <SearchIcon/>
                    </Link>
                    {user && (
                        <Menu>
                            <MenuButton>
                                <Avatar bg={"red.500"} color={"black"} size={"sm"} name={user?.email} />
                            </MenuButton>
                            <MenuList>
                                <Link to = "/">
                                    <MenuItem>WatchList</MenuItem>
                                </Link>
                                <MenuItem onClick={logOut}>LogOut</MenuItem>
                            </MenuList>
                        </Menu>
                    )}
                    {!user && (
                        <Avatar size={"sm"} bg= {"gray.500"} as="button" onClick={handleGoogleLogIn}/>
                    )}
                </Flex>
            </Flex>
        </Container>
    </Box>
  )
}

export default Navbar