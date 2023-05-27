import { List, ListItem } from "@chakra-ui/react";
import { NavItem } from "./NavItem";
import { NavigateFunction } from "react-router-dom";

export interface navItem {
  label: string;
  icon: string;
  path: string;
}

const items = [
  {
    label: "Dashboard",
    icon: "🧑‍💻",
    path: "/dashboard",
  },
  {
    label: "Contacts",
    icon: "👥",
    path: "/contacts",
  },
  {
    label: "Leads",
    icon: "🧑🏻",
    path: "/leads",
  },
  {
    label: "Settings",
    icon: "⚙️",
    path: "/settings",
  },
  {
    label: "Logout",
    icon: "🚪",
    path: "/",
  },
];

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
