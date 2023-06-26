import { Box, Flex, Stack } from "@chakra-ui/react";
import Links from "components/sidebar/components/Links";
import React from "react";

function SidebarContent(props) {
  const { routes } = props;
  return (
    <Flex direction='column' height='100%' pt='25px' px="16px" borderRadius='30px'>
      <img src='logo.png' alt="Villefranche sur Saône" />
      <Stack direction='column' mb='auto' mt='8px'>
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
          <Links routes={routes} />
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContent;
