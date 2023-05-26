import { Box } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { Navigation } from "./navigation/Index";
import { AvatarBox } from "./avatarBox";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <>
      <Box w="full">
        <Logo navigate={navigate} />
        <Navigation navigate={navigate} />
        <AvatarBox />
      </Box>
    </>
  );
};
