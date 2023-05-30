import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  FormLabel,
  Box,
  Input,
  Select,
  DrawerFooter,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import cSharpAxios, { CONTACT_URL } from "../features/cSharpAxios";
import { useParams } from "react-router-dom";
import { contact } from "../features/Interface";
export const DrawerForm = ({
  isOpen,
  onClose,
  getContacts,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  getContacts: () => Promise<void>;
}) => {
  const param = useParams();

  const getContact = async () => {
    try {
      setLoading(true);
      await cSharpAxios.get(CONTACT_URL + param.id).then((result) => {
        setContact(result.data);
        setName(result.data.name);
        setSurname(result.data.surname);
        setEmail(result.data.email);
        setStatus(result.data.status);
        setLoading(false);
        setMethod("put");
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [contact, setContact] = useState<contact>();
  const [method, setMethod] = useState<string>("post");

  const [name, setName] = useState<string>();
  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const [email, setEmail] = useState<string>();
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const [surname, setSurname] = useState<string>();
  const handleSurnameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value);
  };
  const [status, setStatus] = useState<string>("active");
  const handleStatusInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.currentTarget.value);
  };

  const handleSubmit = async () => {
    if (method === "post") {
      try {
        setLoading(true);
        await cSharpAxios
          .post(CONTACT_URL, JSON.stringify({ name, email, surname, status }), {
            headers: { "Content-Type": "application/json" },
          })
          .then(() => setLoading(false));
        onClose();
        getContacts();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        await cSharpAxios
          .put(
            CONTACT_URL + param.id,
            JSON.stringify({ id: param.id, name, email, surname, status }),
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then(() => setLoading(false));
        onClose();
        getContacts();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (param.id) {
      getContact();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          Create a new account
        </DrawerHeader>

        <DrawerBody>
          <Stack spacing="24px">
            <Box>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                onChange={handleNameInput}
                placeholder="Please enter user name"
                defaultValue={contact?.name}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="surname">Surname</FormLabel>
              <Input
                id="surname"
                onChange={handleSurnameInput}
                placeholder="Please enter user surname"
                defaultValue={contact?.surname}
              />
            </Box>

            <Box>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="email"
                onChange={handleEmailInput}
                id="email"
                placeholder="Please enter email"
                defaultValue={contact?.email}
              />
            </Box>

            <Box>
              <FormLabel htmlFor="owner">Status</FormLabel>
              <Select
                id="owner"
                onChange={handleStatusInput}
                defaultValue={contact?.status}
              >
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </Select>
            </Box>
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button isLoading={loading} colorScheme="blue" onClick={handleSubmit}>
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
