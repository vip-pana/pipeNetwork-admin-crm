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
  FormHelperText,
  Box,
  VStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";

export const Login = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark: boolean = colorMode === "dark";

  const [loading, setLoading] = useState<boolean>(false);

  const [show, setShow] = useState<boolean>(false);
  const handleShowPwd = () => setShow(!show);

  const [email, setEmail] = useState<string>();
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const [pwd, setPwd] = useState<string>();
  const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPwd(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(email, pwd);
    } catch (error) {
      console.log("ciao");
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
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={10} align={"stretch"}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
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
                    placeholder="Password"
                    type={show ? "text" : "password"}
                    onChange={handlePwdInput}
                    isRequired
                  />
                  <InputRightElement w={"4.5rem"}>
                    <Button size={"sm"} onClick={handleShowPwd}>
                      {show ? "hide" : "show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText>
                  Did you forget the password? Click here.
                </FormHelperText>
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
