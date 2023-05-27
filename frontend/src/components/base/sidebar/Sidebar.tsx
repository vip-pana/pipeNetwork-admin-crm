import { Box } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { Navigation } from "./navigation/Index";
import { AvatarBox } from "./avatarBox";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const Sidebar = ({ collapse }: { collapse: boolean }) => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <>
      <Box w="full">
        <Logo navigate={navigate} collapse={collapse} />
        <Navigation navigate={navigate} collapse={collapse} />
        <AvatarBox collapse={collapse} />
      </Box>
    </>
  );
};
