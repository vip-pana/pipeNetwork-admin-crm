import { Link, Box, Text } from "@chakra-ui/react";
import { navItem } from "./Index";
import { NavLink, NavigateFunction } from "react-router-dom";

export const NavItem = ({
  item,
  navigate,
}: {
  item: navItem;
  navigate: NavigateFunction;
}) => {
  const { label, icon, path } = item;
  const isLogout = path == "/";

  return (
    <Box display="flex" alignItems="center" my={6} justifyContent="center">
      <Link
        gap={2}
        display="flex"
        alignItems="center"
        _hover={{ textDecoration: "none", color: "black" }}
        fontWeight="medium"
        color={"gray"}
        w="full"
      >
        {isLogout ? (
          <>
            <Link
              onClick={() => {
                localStorage.removeItem("token");
                navigate(path);
              }}
            >
              <Text>{icon}</Text>
            </Link>
            <Link
              onClick={() => {
                localStorage.removeItem("token");
                navigate(path);
              }}
            >
              <Text>{label}</Text>
            </Link>
          </>
        ) : (
          <>
            <NavLink to={path}>
              <Text>{icon}</Text>
            </NavLink>
            <NavLink to={path}>
              <Text>{label}</Text>
            </NavLink>
          </>
        )}
      </Link>
    </Box>
  );
};
