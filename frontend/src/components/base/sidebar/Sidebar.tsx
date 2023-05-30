import { Box, Flex } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { Navigation } from "./navigation/Index";
import { AvatarBox } from "./avatarBox";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const Sidebar = ({ collapse }: { collapse: boolean }) => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <>
      <Flex
        as={"aside"}
        w={"full"}
        h={"full"}
        position={"relative"}
        maxW={!collapse ? 200 : 57}
        alignItems={"center"}
        p={4}
        flexDirection={"column"}
        justifyContent={"space-between"}
        borderRadius={"3xl"}
        boxShadow={"2xl"}
      >
        <Box w="full">
          <Logo navigate={navigate} collapse={collapse} />
          <Navigation navigate={navigate} collapse={collapse} />
          <AvatarBox collapse={collapse} />
        </Box>
      </Flex>
    </>
  );
};
