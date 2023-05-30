import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
  Thead,
  IconButton,
  Stack,
  HStack,
  SkeletonText,
  Text,
  Spacer,
  useDisclosure,
  Badge,
  Select,
  ButtonGroup,
} from "@chakra-ui/react";
import { FaTrashAlt, FaSearch, FaPlus } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { useState, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import cSharpAxios, { CONTACT_URL } from "../features/cSharpAxios";
import { contact } from "../features/Interface";
import { DrawerForm } from "../components/DrawerForm";
import { DeleteModal } from "../components/DeleteModal";

export const Contacts = () => {
  // per aprire modal e drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedModal, setSelectedModal] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  // per entrare nella pagina detail
  const navigate: NavigateFunction = useNavigate();

  const [contacts, setContacts] = useState<contact[]>();

  const getContacts = async () => {
    try {
      setLoading(true);
      await cSharpAxios.get(CONTACT_URL).then((result) => {
        setContacts(result.data);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const orderByContacts = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      setLoading(true);
      if (e.currentTarget.value != "") {
        await cSharpAxios
          .get(CONTACT_URL + "filter/" + e.currentTarget.value)
          .then((result) => {
            setContacts(result.data);
            setLoading(false);
          });
      } else {
        getContacts();
      }
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

  const openDrawerFor = () => {
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
            <Text as={"b"}>Order by:</Text>
            <Select onChange={orderByContacts} maxW={150}>
              <option value="">---</option>
              <option value="name">name</option>
              <option value="surname">surname</option>
              <option value="email">email</option>
              <option value="status">status</option>
            </Select>
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
              onClick={() => openDrawerFor()}
              aria-label={"add"}
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
              <Table variant="striped" colorScheme="blackAlpha">
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
                        <ButtonGroup size={"xs"}>
                          <IconButton
                            shadow={"md"}
                            borderRadius={"3xl"}
                            icon={<FaTrashAlt />}
                            aria-label={"remove"}
                            onClick={() => openDeleteModal(contact.id)}
                          />
                          <IconButton
                            shadow={"md"}
                            borderRadius={"3xl"}
                            icon={<FaSearch />}
                            aria-label={"detail"}
                            onClick={() => navigate(`${contact.id}`)}
                          />
                        </ButtonGroup>
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
          <DrawerForm
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
