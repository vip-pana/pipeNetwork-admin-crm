import { Flex, Link, Text } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";

// export const Logo = ({ collapse }) => (
export const Logo = ({ navigate }: { navigate: NavigateFunction }) => (
  <Flex w="full" alignItems="center" flexDirection="row" gap={4}>
    <Link
      display="flex"
      alignItems="center"
      gap={2}
      fontWeight={"bold"}
      fontSize={18}
      _hover={{ textDecoration: "none" }}
      onClick={() => navigate("/dashboard")}
    >
      <Text fontSize={30}>⭐</Text>
      PipeNetwork
    </Link>
  </Flex>
);
