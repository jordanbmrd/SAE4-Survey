import React, { useState, useEffect } from 'react';
import { Box, Text, FormControl, FormLabel, Input, Button, Stack, Flex } from '@chakra-ui/react';

const formFields = [
  [
    { id: "firstName", label: "Prénom", type: "text", placeholder: "Jordan", required: true },
    { id: "lastName", label: "Nom", type: "text", placeholder: "Lepro", required: true },
    { id: "birthDate", label: "Date de naissance", type: "date", required: true },
  ],
  [
    { id: "address", label: "Adresse", type: "text", placeholder: "1 rue de la SAE", required: true },
    { id: "phoneNumber", label: "Numéro de téléphone", type: "tel", placeholder: "01 23 45 67 89", required: true },
    { id: "postalCode", label: "Code Postal", type: "number", placeholder: "XXXXX", required: true },
    { id: "city", label: "Ville", type: "text", placeholder: "Paris", required: true },
  ],
];

const SurveyLayout = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    let initialData = {};
    formFields.forEach(page => {
      page.forEach(field => {
        initialData[field.id] = '';
      });
    });
    setFormData(initialData);
  }, []);

  const handleChange = (id, value) => {
    setFormData(prev => ({...prev, [id]: value}));
  }

  const canProceed = () => {
    return formFields[pageIndex].every(field => !field.required || !!formData[field.id]);
  }

  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'} bg={'gray.100'}>
        <Box width={'50%'} p={10} pl={20} borderRadius={20} bg='#fff'>
            <Text fontSize={15} color="lightgray">Agglomération de Villefranche-sur-Saône</Text>
            <Text fontSize={35} fontWeight='bold' mb={5}>Sondage</Text>
            <Stack spacing={3}>
              {formFields[pageIndex].map((field) => (
                <FormControl key={field.id} id={field.id}>
                  <FormLabel>{field.label}</FormLabel>
                  <Input 
                    type={field.type} 
                    placeholder={field.placeholder} 
                    value={formData[field.id]} 
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    isRequired={field.required}
                  />
                </FormControl>
              ))}
              <Flex justifyContent="space-between">
                {pageIndex > 0 && (
                  <Button 
                    mt={5} 
                    colorScheme="teal" 
                    width="fit-content" 
                    onClick={() => setPageIndex(prev => prev - 1)}
                  >
                    Précédent
                  </Button>
                )}
                <Button 
                  mt={5} 
                  colorScheme="teal" 
                  width="fit-content" 
                  isDisabled={!canProceed()}
                  onClick={() => {
                    if (pageIndex < formFields.length - 1) {
                      setPageIndex(prev => prev + 1);
                    } else {
                      // Process form data here
                      console.log(formData);
                    }
                  }}
                >
                  {pageIndex < formFields.length - 1 ? "Continuer" : "Soumettre"}
                </Button>
              </Flex>
            </Stack>
        </Box>
    </Box>
  );
}

export default SurveyLayout;
