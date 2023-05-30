import { List, ListItem } from "@chakra-ui/react";
import { NavItem } from "./NavItem";
import { NavigateFunction } from "react-router-dom";
import { items } from "../../../../features/navItems";

export const Navigation = ({
  navigate,
  collapse,
}: {
  navigate: NavigateFunction;
  collapse: boolean;
}) => {
  return (
    <List w="full">
      {items.map((item, index) => (
        <ListItem key={index}>
          <NavItem item={item} navigate={navigate} collapse={collapse} />
        </ListItem>
      ))}
    </List>
  );
};
