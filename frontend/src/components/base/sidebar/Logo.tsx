import { Flex, Link, Text } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";

export const Logo = ({
  navigate,
  collapse,
}: {
  navigate: NavigateFunction;
  collapse: boolean;
}) => {
  return (
    <Flex
      w="full"
      alignItems="center"
      flexDirection={collapse ? "row" : "column"}
    >
      <Link
        display="flex"
        alignItems="center"
        fontWeight={"bold"}
        fontSize={18}
        _hover={{ textDecoration: "none" }}
        onClick={() => navigate("/dashboard")}
      >
        <Text fontSize={collapse ? 18 : 30}>⭐</Text>
        {collapse ? <></> : <>PipeNetwork</>}
      </Link>
    </Flex>
  );
};
