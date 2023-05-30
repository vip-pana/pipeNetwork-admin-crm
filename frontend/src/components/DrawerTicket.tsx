import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  FormLabel,
  Box,
  Select,
  DrawerFooter,
  Button,
  Stack,
  Textarea,
  Input,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { ticket } from "../features/Interface";

export const DrawerTicket = ({
  isOpen,
  onClose,
  ticket,
}: {
  isOpen: boolean;
  onClose: () => void;
  ticket: ticket | undefined;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    console.log("things");
    setLoading(false);
  };

  const formatDate = (d: string | undefined) => {
    if (d?.toString) {
      const date = new Date(d).toLocaleDateString();

      return date;
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"xl"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Ticket Detail</DrawerHeader>

        <DrawerBody>
          <Stack spacing="24px">
            <HStack spacing={20}>
              <FormLabel htmlFor="name">Date:</FormLabel>
              <Text>{formatDate(ticket?.date)}</Text>

              <FormLabel htmlFor="name">Heading:</FormLabel>
              <Input defaultValue={ticket?.heading} isDisabled />
            </HStack>
            <Box>
              <FormLabel htmlFor="name">Content:</FormLabel>
              <Textarea defaultValue={ticket?.content} isDisabled h={200} />
            </Box>
            <Box>
              <FormLabel htmlFor="owner">Status:</FormLabel>
              <Select id="owner">
                <option value="succeded">Succeded</option>
                <option value="failed">Failed</option>
                <option value="pending">Pending</option>
              </Select>
            </Box>
            <Box>
              <FormLabel htmlFor="name">Response</FormLabel>
              <Textarea h={200} />
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
