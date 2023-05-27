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
import { useState } from "react";
import cSharpAxios from "../api/cSharpAxios";
export const AddDrawer = ({
  isOpen,
  onClose,
  getContacts,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  getContacts: () => Promise<void>;
}) => {
  const ADD_CONTACT = "Contacts";
  const [loading, setLoading] = useState<boolean>(false);

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
    try {
      setLoading(true);
      await cSharpAxios
        .post(ADD_CONTACT, JSON.stringify({ name, email, surname, status }), {
          headers: { "Content-Type": "application/json" },
        })
        .then(() => setLoading(false));
      onClose();
      getContacts();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
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
              />
            </Box>
            <Box>
              <FormLabel htmlFor="surname">Surname</FormLabel>
              <Input
                id="surname"
                onChange={handleSurnameInput}
                placeholder="Please enter user surname"
              />
            </Box>

            <Box>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="email"
                onChange={handleEmailInput}
                id="email"
                placeholder="Please enter email"
              />
            </Box>

            <Box>
              <FormLabel htmlFor="owner">Status</FormLabel>
              <Select
                id="owner"
                onChange={handleStatusInput}
                defaultValue="active"
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
