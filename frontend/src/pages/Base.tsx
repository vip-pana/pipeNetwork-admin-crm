import { Box, HStack, IconButton } from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "../components/base/sidebar/Sidebar";

export const Base = () => {
  const [collapse, setCollapse] = useState(false);

  return (
    <HStack w={"full"} h={"100vh"} p={2}>
      {/* Sidebar */}

      <Sidebar collapse={collapse} />

      {/* Content */}
      <Box as="main" w="full" h="full" shadow={"2xl"} borderRadius="3xl">
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
