import React from 'react';
import { Box, Text } from '@chakra-ui/react'

const SurveyLayout = () => {
  return (
    <Box display={'center'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
        <Box width={'50%'} height={'85%'} p={10} pl={20} borderRadius={20} bg='#fff'>
            <Text
              fontSize={30}
              fontWeight='bold'
              mx='auto'>
                Sondage
            </Text>
        </Box>
    </Box>
  );
}

export default SurveyLayout;