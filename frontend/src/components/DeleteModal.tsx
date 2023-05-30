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
import cSharpAxios from "../features/cSharpAxios";
import { CONTACT_URL } from "../features/cSharpAxios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const DeleteModal = ({
  isOpen,
  onClose,
  getContacts,
}: {
  isOpen: boolean;
  onClose: () => void;
  getContacts: () => Promise<void>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const param = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setLoading(true);
      await cSharpAxios
        .delete(CONTACT_URL + localStorage.getItem("id"))
        .then(() => setLoading(false));
      onClose();
      if (param.id) {
        navigate(-1);
      } else {
        getContacts();
      }
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
