import { Box, Flex, HStack, IconButton } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/base/sidebar/Sidebar";
import { MdMenu } from "react-icons/md";
import { useState } from "react";

export const Base = () => {
  const [collapse, setCollapse] = useState(false);

  return (
    <HStack w={"full"} h={"100vh"} p={2}>
      {/* Sidebar */}
      <Flex
        as={"aside"}
        w={"full"}
        h={"full"}
        maxW={!collapse ? 250 : 57}
        alignItems={"center"}
        p={4}
        flexDirection={"column"}
        justifyContent={"space-between"}
        borderRadius={"3xl"}
        boxShadow={"2xl"}
      >
        <Sidebar collapse={collapse} />
      </Flex>
      {/* Content */}
      <Box
        as="main"
        w="full"
        h="full"
        shadow={"2xl"}
        position="relative"
        borderRadius="3xl"
      >
        <IconButton
          aria-label="Menu Colapse"
          icon={<MdMenu />}
          top={6}
          left={6}
          onClick={() => {
            setCollapse(!collapse);
          }}
        />
        <Outlet />
      </Box>
    </HStack>
  );
};
