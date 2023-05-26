import { Avatar, Flex, IconButton, Text } from "@chakra-ui/react";
import { MdOutlineMoreHoriz } from "react-icons/md";

export const AvatarBox = () => (
  <Flex
    borderWidth="1"
    borderColor="gray.100"
    borderRadius="full"
    w="full"
    p={2}
    alignItems="center"
    justifyContent="space-between"
    gap={2}
    flexDirection="row"
  >
    <Avatar
      name="vip-Pana"
      src="https://avatars.githubusercontent.com/u/96469762?s=400&u=4940800dac641e5cd40712e685ae6d8faa233378&v=4"
    />
    <Flex
      w="full"
      flexDirection="column"
      gap={4}
      justifyContent="center"
      alignItems="flex-start"
    >
      <Text fontSize="sm" fontWeight="bold" pb="0" lineHeight={0}>
        VipP4na
      </Text>
    </Flex>
    <IconButton
      aria-label="Settings"
      icon={<MdOutlineMoreHoriz />}
      borderRadius="full"
      color="gray.400"
      variant="ghost"
      fontSize={20}
    />
  </Flex>
);
