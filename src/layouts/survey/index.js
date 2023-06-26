import React, { useState, useEffect } from 'react';
import { Box, Checkbox, Text, FormControl, FormLabel, Input, Button, Stack, Flex } from '@chakra-ui/react';
import FoodSelection from '../../components/survey/FoodSelection';
import axios from 'axios';

const groups = {
  "success": "Food groups fetched",
  "data": [
    {
      "group_code": 1,
      "group_name_fr": "entrées et plats composés"
    },
    {
      "group_code": 2,
      "group_name_fr": "fruits, légumes, légumineuses et oléagineux"
    },
    {
      "group_code": 3,
      "group_name_fr": "pâtes diverses, produits céréaliers"
    },
    {
      "group_code": 4,
      "group_name_fr": "viandes, œufs, poissons et assimilés"
    },
    {
      "group_code": 5,
      "group_name_fr": "produits laitiers et assimilés"
    },
    {
      "group_code": 6,
      "group_name_fr": "eaux et autres boissons"
    },
    {
      "group_code": 7,
      "group_name_fr": "produits sucrés"
    },
    {
      "group_code": 8,
      "group_name_fr": "glaces et sorbets"
    },
    {
      "group_code": 9,
      "group_name_fr": "matières grasses"
    },
    {
      "group_code": 10,
      "group_name_fr": "aides culinaires et ingrédients divers"
    },
    {
      "group_code": 11,
      "group_name_fr": "foods infantiles"
    }
  ]
}

const formFields = [
  [
    { id: "first_name", label: "Prénom", type: "text", placeholder: "Jordan", required: true },
    { id: "last_name", label: "Nom", type: "text", placeholder: "Lepro", required: true },
    { id: "birth", label: "Date de naissance", type: "date", required: true },
  ],
  [
    { id: "address", label: "Adresse", type: "text", placeholder: "1 rue de la SAE", required: true },
    { id: "phone", label: "Numéro de téléphone", type: "tel", placeholder: "01 23 45 67 89", required: true },
    { id: "postal_code", label: "Code Postal", type: "number", placeholder: "XXXXX", required: true },
    { id: "city", label: "Ville", type: "text", placeholder: "Paris", required: true },
  ],
];

const SurveyLayout = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [constituentId, setConstituentId] = useState(-1);
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('constituent_id')) {
      setConstituentId(localStorage.getItem('constituent_id'));
    }

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
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'} bg={'lightblue.300'}>
        <Box width={'50%'} p={10} pl={20} borderRadius={20} bg='#fff'>
            <Text fontSize={15} color="lightgray">Agglomération de Villefranche-sur-Saône</Text>
            <Text fontSize={35} fontWeight='bold' mb={5}>Sondage</Text>
            { constituentId === -1 && !localStorage.getItem('constituent_id') ? <Stack spacing={3}>
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
              {
                pageIndex >= formFields.length - 1 &&
                <Checkbox colorScheme="green" isChecked={isAccepted} onChange={(e) => setIsAccepted(e.target.checked)}>
                  J'accepte que mes données soient stockées dans le but d'établir un score santé. 
                  Vos données ne seront ni partagées, ni vendues.
                </Checkbox>
              }
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
                      try {
                        const registerConstituent = async () => {
                          const url = `https://api.applicationsondage.deletesystem32.fr/registerConstituent`;
                          console.log({...formData, birth: formData.birth.replaceAll('-', '/')});
                          const response = await axios.post(url, {...formData, birth: formData.birth.replaceAll('-', '/')});

                          console.log(response.data.id);
                          setConstituentId(response.data.id);
                          localStorage.setItem('constituent_id', response.data.id);
                        }
                        registerConstituent();
                      } catch (error) {
                        console.error(error);
                      }
                    }
                  }}
                >
                  {pageIndex < formFields.length - 1 ? "Continuer" : "Soumettre"}
                </Button>
              </Flex>
            </Stack>
            : <FoodSelection groups={groups.data} constituentId={constituentId} /> }
        </Box>
    </Box>
  );
}

export default SurveyLayout;
