import { Flex, HStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/base/sidebar/Sidebar";

export const Base = () => {
  return (
    <HStack w={"full"} h={"100vh"} p={2}>
      {/* Sidebar */}
      <Flex
        as={"aside"}
        w={"full"}
        h={"full"}
        maxW={250}
        bg={"dark.100"}
        alignItems={"center"}
        p={4}
        flexDirection={"column"}
        justifyContent={"space-between"}
        borderRadius={"3xl"}
        boxShadow={"dark-lg"}
      >
        <Sidebar />
      </Flex>
      <Outlet />
    </HStack>
  );
};
