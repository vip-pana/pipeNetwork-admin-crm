import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import cSharpAxios from "../api/cSharpAxios";
import { useState } from "react";

export const DeleteModal = ({
  isOpen,
  onClose,
  getContacts,
}: {
  isOpen: boolean;
  onClose: () => void;
  getContacts: () => Promise<void>;
}) => {
  const REMOVE_CONTACT = "Contacts/";
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await cSharpAxios
        .delete(REMOVE_CONTACT + localStorage.getItem("id"))
        .then(() => setLoading(false));
      onClose();
      getContacts();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sei sicuro?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>L'eliminazione è permanente.</Text>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="red"
            isLoading={loading}
            onClick={() => handleDelete()}
          >
            Elimina
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
