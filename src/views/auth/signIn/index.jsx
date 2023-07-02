import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import axios from "axios";
import { useUser } from "contexts/UserContext";
import { useHistory } from 'react-router-dom';

function SignIn() {
  const { user, setUser } = useUser();
  const history = useHistory();
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  useEffect(() => {
    if (user) {
      history.push('/admin');
    }
  }, [user, history, localStorage.getItem('user')]);

  const login = () => {
    const url = "https://api.applicationsondage.deletesystem32.fr/login";
    const body = {
      username,
      password,
    };

    axios.post(url, body)
      .then(response => {
        const user = {
          admin_id: response.data.admin_id,
          username: response.data.username,
          role: response.data.role,
          created_at: response.data.created_at,
        };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  return (
    <Flex justifyContent='center' position='relative' h='max-content'>
      <Flex
        h={{
          sm: "initial",
          md: "unset",
          lg: "100vh",
          xl: "97vh",
        }}
        w='100%'
        pt={{ sm: "50px", md: "0px" }}
        px={{ lg: "30px", xl: "0px" }}
        ps={{ xl: "70px" }}
        justifyContent='center'
        direction='row'>
        <Flex
          maxW={{ base: "100%", md: "max-content" }}
          w='100%'
          mx={{ base: "auto", lg: "0px" }}
          me='auto'
          h='100%'
          alignItems='start'
          justifyContent='center'
          mb={{ base: "30px", md: "60px" }}
          px={{ base: "25px", md: "0px" }}
          mt={{ base: "40px", md: "14vh" }}
          flexDirection='column'>
          <Box me='auto'>
            <Heading color={textColor} fontSize='36px' mb='10px'>
              Connexion
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColorSecondary}
              fontWeight='400'
              fontSize='md'>
              Entrez votre nom d'utilisateur et mot de passe
            </Text>
          </Box>
          <Flex
            zIndex='2'
            direction='column'
            w={{ base: "100%", md: "420px" }}
            maxW='100%'
            background='transparent'
            borderRadius='15px'
            mx={{ base: "auto", lg: "unset" }}
            me='auto'
            mb={{ base: "20px", md: "auto" }}>
            <FormControl>
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                Nom d'utilisateur<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                type='email'
                placeholder="Nom d'utilisateur"
                mb='24px'
                fontWeight='500'
                size='lg'
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <FormLabel
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                display='flex'>
                Mot de passe<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size='md'>
                <Input
                  isRequired={true}
                  fontSize='sm'
                  placeholder='Min. 8 caractères'
                  mb='24px'
                  size='lg'
                  type={show ? "text" : "password"}
                  variant='auth'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <InputRightElement display='flex' alignItems='center' mt='4px'>
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <Flex justifyContent='space-between' align='center' mb='24px'>
                <NavLink to='/auth/forgot-password'>
                  <Text
                    color={textColorBrand}
                    fontSize='sm'
                    w='150px'
                    fontWeight='500'>
                    Mot de passe oublié ?
                  </Text>
                </NavLink>
              </Flex>
              <Button
                fontSize='sm'
                variant='brand'
                fontWeight='500'
                w='100%'
                h='50'
                mb='24px'
                onClick={login}>
                Se connecter
              </Button>
            </FormControl>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignIn;
