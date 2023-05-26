import {
  Card,
  CardHeader,
  CardBody,
  Input,
  InputGroup,
  InputRightElement,
  Heading,
  FormLabel,
  FormControl,
  Text,
  Box,
  VStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import cSharpAxios from "../api/cSharpAxios";
import { AxiosError } from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const Login = () => {
  const LOGIN_URL = "Users/login";
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark: boolean = colorMode === "dark";

  // indica se la pagina sta eseguendo una chiamata API e quindi blocca l'azione di mandare ulteriori richieste
  const [loading, setLoading] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  // toggle per mostrare o no la password
  const [show, setShow] = useState<boolean>(false);
  const handleShowPwd = () => setShow(!show);

  // dati email e password vengono salvati in degli state
  const [email, setEmail] = useState<string | undefined>();
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrEmail(false);
    setErrPassword(false);
    setErrMessage("");
  };

  const [password, setPassword] = useState<string>();
  const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrEmail(false);
    setErrPassword(false);
    setErrMessage("");
  };

  // errori visibili all'utente tramite submit del form errato
  const [errEmail, setErrEmail] = useState<boolean>(false);
  const [errPassword, setErrPassword] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>();

  // submit del form, se ok restituisce un JWT Token, lo salva il localstorage
  // e indirizza alla Dashboard
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = await cSharpAxios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        { headers: { "Content-Type": "application/json" } }
      );
      localStorage.setItem("token", token.data);
      setLoading(false);
      navigate("dashboard");
    } catch (error) {
      const status = (error as AxiosError)?.response?.status;
      switch (status) {
        case 400:
          setErrPassword(true);
          setErrMessage("Wrong password!");
          setPassword("");
          break;
        case 404:
          setErrEmail(true);
          setErrMessage("Email not found!");
          setEmail("");
          setPassword("");
          break;
        default:
          setEmail("");
          setPassword("");
          setErrMessage("No Server response! please try later.");
          break;
      }
      setLoading(false);
    }
  };

  return (
    <Box m={5}>
      <Button mb={5} onClick={toggleColorMode}>
        {isDark ? "Light" : "Dark"}
      </Button>
      <Card maxW={"lg"} margin={"auto"}>
        <CardHeader>
          <Heading size="2xl" textAlign={"center"}>
            Login
          </Heading>
          <Text textAlign={"center"} color={"tomato"} mt={5}>
            {errMessage}
          </Text>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={10} align={"stretch"}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  isInvalid={errEmail}
                  defaultValue={email}
                  placeholder="Email"
                  type="email"
                  onChange={handleEmailInput}
                  isRequired
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    isInvalid={errPassword}
                    defaultValue={password}
                    placeholder="Password"
                    type={show ? "text" : "password"}
                    onChange={handlePwdInput}
                    isRequired
                  />
                  <InputRightElement w={"4.5rem"}>
                    <Button
                      size={"sm"}
                      onClick={handleShowPwd}
                      variant={"ghost"}
                    >
                      {show ? "hide" : "show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button type="submit" colorScheme="blue" isLoading={loading}>
                Submit
              </Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
};
