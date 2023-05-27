import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  IconButton,
  Stack,
  SkeletonText,
  Spacer,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { FaTrashAlt, FaSearch, FaPlus } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { useState, useEffect } from "react";
import cSharpAxios from "../api/cSharpAxios";
import { AddDrawer } from "../components/AddDrawer";
import { DeleteModal } from "../components/DeleteModal";

interface contacts {
  id: number;
  name: string;
  surname: string;
  email: string;
  status: string;
}

export const Contacts = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const CONTACTS_URL = "Contacts";

  const [contacts, setContacts] = useState<contacts[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedModal, setSelectedModal] = useState<string>();

  const getContacts = async () => {
    try {
      setLoading(true);
      await cSharpAxios.get(CONTACTS_URL).then((result) => {
        setContacts(result.data);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const openDeleteModal = (id: number) => {
    localStorage.setItem("id", id.toString());
    setSelectedModal("modal");
    onOpen();
  };

  const openAddDrawer = () => {
    setSelectedModal("drawer");
    onOpen();
  };

  return (
    <>
      <Heading pl={100}>Contacts</Heading>
      <Card m={50}>
        <CardHeader>
          <HStack>
            <Heading size="md">Contact book</Heading>
            <Spacer />
            <IconButton
              shadow={"md"}
              rounded={"3xl"}
              icon={<MdRefresh />}
              onClick={() => getContacts()}
              aria-label={"detail"}
            />
            <IconButton
              shadow={"md"}
              rounded={"3xl"}
              icon={<FaPlus />}
              aria-label={"add"}
              onClick={() => openAddDrawer()}
            />
          </HStack>
        </CardHeader>

        <CardBody>
          {loading ? (
            <Stack>
              <SkeletonText
                mt="4"
                noOfLines={10}
                spacing="6"
                skeletonHeight="4"
              />
            </Stack>
          ) : (
            <TableContainer>
              <Table variant="striped" colorScheme="blackAlpha" size={"lg"}>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Surname</Th>
                    <Th>Email</Th>
                    <Th> Status</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {contacts?.map((contact, index) => (
                    <Tr key={index}>
                      <Td>{contact.name}</Td>
                      <Td>{contact.surname}</Td>
                      <Td>{contact.email}</Td>
                      <Td>
                        <Badge
                          colorScheme={
                            contact.status == "expired" ? "red" : "green"
                          }
                          rounded={"md"}
                        >
                          {contact.status}
                        </Badge>
                      </Td>
                      <Td>
                        <IconButton
                          marginRight={1}
                          shadow={"md"}
                          size={"xs"}
                          borderRadius={"3xl"}
                          icon={<FaTrashAlt />}
                          aria-label={"remove"}
                          onClick={() => openDeleteModal(contact.id)}
                        />
                        <IconButton
                          shadow={"md"}
                          size={"xs"}
                          rounded={"3xl"}
                          icon={<FaSearch />}
                          aria-label={"detail"}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </CardBody>
        {selectedModal == "modal" ? (
          <DeleteModal
            isOpen={isOpen}
            onClose={onClose}
            getContacts={getContacts}
          />
        ) : (
          <></>
        )}
        {selectedModal == "drawer" ? (
          <AddDrawer
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            getContacts={getContacts}
          />
        ) : (
          <></>
        )}
      </Card>
    </>
  );
};
