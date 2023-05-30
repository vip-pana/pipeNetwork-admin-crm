import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Text,
  IconButton,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import cSharpAxios, { TICKET_URL } from "../features/cSharpAxios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ticket } from "../features/Interface";
import { FaSearch } from "react-icons/fa";
import { DrawerTicket } from "./DrawerTicket";

export const TicketGrid = ({
  setSelectedModal,
}: {
  setSelectedModal: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [tickets, setTickets] = useState<ticket[]>();
  const param = useParams();
  const [ticket, setTicket] = useState<ticket>();

  const getTickets = async () => {
    try {
      await cSharpAxios
        .get(TICKET_URL + "contact/" + param.id)
        .then((result) => {
          setTickets(result.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (d: string) => {
    return new Date(d).toLocaleDateString();
  };

  const openDrawerTicket = (ticket: ticket) => {
    setSelectedModal("ticket");
    setTicket(ticket);
    onOpen();
  };

  return (
    <>
      <Card m={10}>
        <CardHeader>
          <HStack>
            <Heading size="md">Ticket related</Heading>
          </HStack>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Heading</Th>
                  <Th>Date</Th>
                  <Th> Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tickets?.map((ticket, index) => (
                  <Tr key={index}>
                    <Td>
                      <Text as={"b"}>{ticket.heading}</Text>
                    </Td>
                    <Td>{formatDate(ticket.date)}</Td>
                    <Td>{ticket.status}</Td>
                    <Td>
                      <IconButton
                        shadow={"md"}
                        borderRadius={"3xl"}
                        size={"md"}
                        icon={<FaSearch />}
                        aria-label={"detail"}
                        onClick={() => openDrawerTicket(ticket)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
      <DrawerTicket isOpen={isOpen} onClose={onClose} ticket={ticket} />
    </>
  );
};
