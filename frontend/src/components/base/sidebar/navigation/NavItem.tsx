import { Link, Box, Text, Button, useColorMode } from "@chakra-ui/react";
import { navItem } from "./Index";
import { NavigateFunction } from "react-router-dom";

export const NavItem = ({
  item,
  navigate,
  collapse,
}: {
  item: navItem;
  navigate: NavigateFunction;
  collapse: boolean;
}) => {
  const { label, icon, path } = item;
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const navigateToPath = () => {
    if (path === "/") {
      localStorage.removeItem("token");
    }
    navigate(path);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      my={collapse ? 4 : 6}
      justifyContent="center"
    >
      {collapse ? (
        <Button rounded={"3xl"} variant={"ghost"}>
          <Link
            gap={2}
            display="flex"
            alignItems="center"
            fontWeight="medium"
            w="full"
            justifyContent={collapse ? "center" : ""}
            onClick={() => {
              navigateToPath();
            }}
          >
            <Text>{icon}</Text>
            {!collapse && <Text>{label} </Text>}
          </Link>
        </Button>
      ) : (
        <Link
          gap={2}
          display="flex"
          alignItems="center"
          _hover={
            isDark
              ? { textDecoration: "none", color: "white" }
              : { textDecoration: "none", color: "black" }
          }
          fontWeight="medium"
          color={"gray"}
          w="full"
          justifyContent={collapse ? "center" : ""}
          onClick={() => {
            navigateToPath();
          }}
        >
          <Text>{icon}</Text>
          {!collapse && <Text>{label}</Text>}
        </Link>
      )}
    </Box>
  );
};
