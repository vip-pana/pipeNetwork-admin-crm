import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  IconButton,
  Skeleton,
  Spacer,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cSharpAxios, { CONTACT_URL } from "../features/cSharpAxios";
import { contact } from "../features/Interface";
import { DeleteModal } from "../components/DeleteModal";
import { DrawerForm } from "../components/DrawerForm";
import { TicketGrid } from "../components/TicketGrid";

export const ContactDetail = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const param = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedModal, setSelectedModal] = useState<string>();

  const [contact, setContact] = useState<contact>();
  const getContact = async () => {
    try {
      setLoading(true);
      await cSharpAxios.get(CONTACT_URL + param.id).then((result) => {
        setContact(result.data);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const openDeleteModal = () => {
    if (param.id?.toString()) {
      localStorage.setItem("id", param.id.toString());
      setSelectedModal("modal");
      onOpen();
    }
  };

  const openDrawerForm = () => {
    setSelectedModal("drawer");
    onOpen();
  };

  useEffect(() => {
    getContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Card m={10}>
        <CardHeader>
          <HStack>
            <Heading size="md">Contact detail</Heading>
            <Spacer />
            <IconButton
              icon={<FaEdit />}
              aria-label={"edit"}
              rounded={"3xl"}
              onClick={() => openDrawerForm()}
            />
            <IconButton
              icon={<FaTrashAlt />}
              aria-label={"delete"}
              onClick={() => openDeleteModal()}
              rounded={"3xl"}
            />
          </HStack>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="10">
            <HStack>
              <Text as={"b"}>Name:</Text>
              {loading ? (
                <Skeleton height="15px" w={"100px"} />
              ) : (
                <Text fontSize="sm"> {contact?.name}</Text>
              )}
              <Spacer />
              <Text as={"b"}>Surname:</Text>
              {loading ? (
                <Skeleton height="15px" w={"100px"} />
              ) : (
                <Text fontSize="sm">{contact?.surname}</Text>
              )}
              <Spacer />
            </HStack>
            <HStack>
              <Text as={"b"}>Email:</Text>
              {loading ? (
                <Skeleton height="15px" w={"100px"} />
              ) : (
                <Text fontSize="sm">{contact?.email}</Text>
              )}
              <Spacer />
              <Text as={"b"}>Status:</Text>
              {loading ? (
                <Skeleton height="15px" w={"100px"} />
              ) : (
                <Badge
                  colorScheme={contact?.status == "active" ? "green" : "red"}
                  fontSize="sm"
                >
                  {contact?.status}
                </Badge>
              )}
              <Spacer />
            </HStack>
          </Stack>
        </CardBody>
      </Card>
      {selectedModal == "modal" ? (
        <DeleteModal
          isOpen={isOpen}
          onClose={onClose}
          getContacts={getContact}
        />
      ) : (
        <></>
      )}
      {selectedModal == "drawer" ? (
        <DrawerForm
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          getContacts={getContact}
        />
      ) : (
        <></>
      )}
      <TicketGrid setSelectedModal={setSelectedModal} />
    </>
  );
};
