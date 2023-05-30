import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Spinner,
  Stack,
  Box,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import cSharpAxios, { CONTACT_URL } from "../features/cSharpAxios";

export const Dashboard = () => {
  const [contactNum, setContactNum] = useState<number>();

  const getContacts = async () => {
    try {
      await cSharpAxios.get(CONTACT_URL).then((result) => {
        setContactNum(result.data.length);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      <Heading pl={100}>Dashboard</Heading>
      <Stack>
        <Card maxW={200} m={50}>
          <CardHeader>
            <Heading>Contacts</Heading>
          </CardHeader>
          <CardBody>
            {contactNum == 0 ? (
              <Box textAlign={"center"}>
                <Spinner size={"lg"} />
              </Box>
            ) : (
              <Text fontSize="5xl" textAlign={"center"}>
                {contactNum}
              </Text>
            )}
          </CardBody>
        </Card>
      </Stack>
    </>
  );
};
