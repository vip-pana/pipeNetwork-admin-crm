import {
  Avatar,
  Flex,
  IconButton,
  Text,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import { CgSun, CgMoon } from "react-icons/cg";

export const AvatarBox = ({ collapse }: { collapse: boolean }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      shadow={!collapse ? "xl" : "none"}
      borderColor="gray.100"
      borderRadius="full"
      w="full"
      p={2}
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      flexDirection={collapse ? "column-reverse" : "row"}
    >
      <Avatar
        name="vip-Pana"
        src="https://avatars.githubusercontent.com/u/96469762?s=400&u=4940800dac641e5cd40712e685ae6d8faa233378&v=4"
      />
      {!collapse && (
        <Flex
          w="full"
          flexDirection="column"
          gap={4}
          justifyContent="center"
          alignItems="flex-start"
        >
          <Link
            href={"https://vip-pana.github.io/"}
            isExternal
            _hover={{
              textDecoration: "none",
            }}
          >
            <Text fontSize="sm" fontWeight="bold" pb="0" lineHeight={0}>
              VipP4na
            </Text>
          </Link>
        </Flex>
      )}
      <IconButton
        aria-label="Settings"
        icon={colorMode === "light" ? <CgSun /> : <CgMoon />}
        borderRadius="full"
        color="gray.400"
        variant="ghost"
        onClick={() => toggleColorMode()}
        fontSize={20}
      />
    </Flex>
  );
};
