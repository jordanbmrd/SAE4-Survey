import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Checkbox,
  Stack,
  Button,
  Flex,
  Spacer,
  Collapse,
  useDisclosure,
  Modal,
  ModalOverlay,
  ScaleFade,
  ModalContent,
  ModalBody,
} from '@chakra-ui/react';
import axios from 'axios';
import { CheckIcon } from '@chakra-ui/icons';

const FoodSelection = ({ groups, constituentId }) => {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [isGroupOpen, setGroupOpen] = useState([]);
  const [isSubgroupOpen, setSubgroupOpen] = useState([]);
  const [isSubSubgroupOpen, setSubSubgroupOpen] = useState([]);
  const [groupData, setGroupData] = useState({});
  const [subgroupData, setSubgroupData] = useState({});
  const [subsubgroupData, setSubsubgroupData] = useState({});
  const [selectedGroupFoods, setSelectedGroupFoods] = useState({});
  const [selectedSubgroupFoods, setSelectedSubgroupFoods] = useState({});
  const [selectedSubsubgroupFoods, setSelectedSubsubgroupFoods] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => console.log("selectedFoods", selectedFoods), [selectedFoods]);

  const handleFoodSelection = (groupCode, subgroupCode, subsubgroupCode, food) => {
    if (selectedFoods.includes(food)) {
      setSelectedFoods(selectedFoods.filter((item) => item !== food));

      setSelectedSubsubgroupFoods(prev => {
        const updatedFoods = [...prev[subsubgroupCode]].filter(item => item !== food);
        return {...prev, [subsubgroupCode]: updatedFoods};
      });

      setSelectedSubgroupFoods(prev => {
        const updatedFoods = [...prev[subgroupCode]].filter(item => item !== food);
        return {...prev, [subgroupCode]: updatedFoods};
      });

      setSelectedGroupFoods(prev => {
        const updatedFoods = [...prev[groupCode]].filter(item => item !== food);
        return {...prev, [groupCode]: updatedFoods};
      });
    } else {
      setSelectedFoods([...selectedFoods, food]);

      setSelectedSubsubgroupFoods(prev => {
        const updatedFoods = prev[subsubgroupCode] ? [...prev[subsubgroupCode], food] : [food];
        return {...prev, [subsubgroupCode]: updatedFoods};
      });

      setSelectedSubgroupFoods(prev => {
        const updatedFoods = prev[subgroupCode] ? [...prev[subgroupCode], food] : [food];
        return {...prev, [subgroupCode]: updatedFoods};
      });

      setSelectedGroupFoods(prev => {
        const updatedFoods = prev[groupCode] ? [...prev[groupCode], food] : [food];
        return {...prev, [groupCode]: updatedFoods};
      });
    }
  };

  const handleClearSelection = () => {
    setSelectedFoods([]);
    setSelectedGroupFoods([]);
    setSelectedSubgroupFoods([]);
    setSelectedSubsubgroupFoods([]);
  };

  const handleSubmission = async () => {
    if (selectedFoods.length >= 10) {
      try {
        const url = `https://api.applicationsondage.deletesystem32.fr/answerSurvey?constituent_id=${constituentId}`;
        const response = await axios.post(url, selectedFoods);
        
        console.log(response);
        if (response.data.success && response.data.success === "Survey answer registered") {
          onOpen();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Veuillez sélectionner au moins 10 aliments.");
    }
  };

  const toggleGroup = (groupCode) => {
    setGroupOpen((prev) => {
      const updatedGroups = [...prev];
      const index = updatedGroups.indexOf(groupCode);
      if (index === -1) {
        updatedGroups.push(groupCode);
      } else {
        updatedGroups.splice(index, 1);
      }
      return updatedGroups;
    });
  };

  const toggleSubgroup = (subgroupCode) => {
    setSubgroupOpen((prev) => {
      const updatedSubgroups = [...prev];
      const index = updatedSubgroups.indexOf(subgroupCode);
      if (index === -1) {
        updatedSubgroups.push(subgroupCode);
      } else {
        updatedSubgroups.splice(index, 1);
      }
      return updatedSubgroups;
    });
  };

  const toggleSubsubgroup = (subsubgroupCode) => {
    setSubSubgroupOpen((prev) => {
      const updatedSubsubgroups = [...prev];
      const index = updatedSubsubgroups.indexOf(subsubgroupCode);
      if (index === -1) {
        updatedSubsubgroups.push(subsubgroupCode);
      } else {
        updatedSubsubgroups.splice(index, 1);
      }
      return updatedSubsubgroups;
    });
  };

  const fetchData = async (route, params) => {
    try {
      const response = await axios.get(`https://api.applicationsondage.deletesystem32.fr/${route}`, {
        params,
      });

      if (route === 'getFoods') {
        setSubsubgroupData((prev) => ({ ...prev, [params.sub_subgroup_code]: response.data }));
      }
      else if (route === 'getSubSubgroups') {
        setSubgroupData((prev) => ({ ...prev, [params.subgroup_code]: response.data }));
      }
      else if (route === 'getSubgroups') {
        setGroupData((prev) => ({ ...prev, [params.group_code]: response.data }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGroupClick = (groupCode) => {
    toggleGroup(groupCode);
    if (!groupData[groupCode]) {
      fetchData('getSubgroups', {
        group_code: groupCode,
      });
    }
  };

  const handleSubgroupClick = (subgroupCode) => {
    toggleSubgroup(subgroupCode);
    if (!subgroupData[subgroupCode]) {
      fetchData('getSubSubgroups', {
        subgroup_code: subgroupCode,
      });
    }
  };

  const handleSubsubgroupClick = (groupCode, subgroupCode, subsubgroupCode) => {
    toggleSubsubgroup(subsubgroupCode);
    if (!subsubgroupData[subsubgroupCode]) {
      fetchData('getFoods', {
        group_code: groupCode,
        subgroup_code: subgroupCode,
        sub_subgroup_code: subsubgroupCode,
      });
    }
  };

  return (
    <Box sx={{ overflowY: 'scroll', height: '70vh' }}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Sélectionnez 10 aliments :
      </Text>
      <Stack spacing={4}>
        {groups.map((group) => (
          <Box
            key={group.group_code}
            borderWidth="1px"
            borderRadius="md"
            p={3}
            _hover={{ borderColor: 'gray.200' }}
          >
            <Flex align="center">
              <Text
                fontSize="lg"
                fontWeight="bold"
                mb={2}
                cursor="pointer"
                onClick={() => handleGroupClick(group.group_code)}
              >
                {group.group_name_fr}
              </Text>
              <Spacer />
              <Box as="i" fontSize="sm" color="gray.500">
                ({(selectedGroupFoods[group.group_code] || []).length})
              </Box>
            </Flex>
            <Collapse in={isGroupOpen.includes(group.group_code)}>
              <Stack pl={4} spacing={2}>
                {(groupData[group.group_code])?.data
                  .map((subgroup) => (
                    <Box
                      key={subgroup.subgroup_code}
                      borderWidth="1px"
                      borderRadius="md"
                      p={2}
                      _hover={{ borderColor: 'gray.200' }}
                    >
                      <Flex align="center">
                        <Text
                          fontSize="md"
                          fontWeight="bold"
                          mb={2}
                          cursor="pointer"
                          onClick={() => handleSubgroupClick(subgroup.subgroup_code)}
                        >
                          {subgroup.subgroup_name_fr}
                        </Text>
                        <Spacer />
                        <Box as="i" fontSize="sm" color="gray.500">
                          ({(selectedSubgroupFoods[subgroup.subgroup_code] || []).length})
                        </Box>
                      </Flex>
                      <Collapse in={isSubgroupOpen.includes(subgroup.subgroup_code)}>
                        <Stack pl={4} spacing={2}>
                          {(subgroupData[subgroup.subgroup_code])?.data
                            .map((subsubgroup) => (
                              <Box
                                key={subsubgroup.sub_subgroup_code}
                                borderWidth="1px"
                                borderRadius="md"
                                p={2}
                                _hover={{ borderColor: 'gray.200' }}
                              >
                                <Flex align="center">
                                  <Text
                                    fontSize="sm"
                                    fontWeight="bold"
                                    mb={2}
                                    cursor="pointer"
                                    onClick={() => handleSubsubgroupClick(group.group_code, subgroup.subgroup_code, subsubgroup.sub_subgroup_code)}
                                  >
                                    {subsubgroup.sub_subgroup_name_fr}
                                  </Text>
                                  <Spacer />
                                  <Box as="i" fontSize="sm" color="gray.500">
                                    ({(selectedSubsubgroupFoods[subsubgroup.sub_subgroup_code] || []).length})
                                  </Box>
                                </Flex>
                                <Collapse in={isSubSubgroupOpen.includes(subsubgroup.sub_subgroup_code)}>
                                  <Stack pl={4} spacing={2}>
                                    {(subsubgroupData[subsubgroup.sub_subgroup_code])?.data?.map(
                                      (food) => (
                                        <Checkbox
                                          key={food.food_code}
                                          isChecked={selectedFoods.includes(food.food_code)}
                                          onChange={() => handleFoodSelection(group.group_code, subgroup.subgroup_code, subsubgroup.sub_subgroup_code, food.food_code)}
                                        >
                                          {food.food_name_fr}
                                        </Checkbox>
                                      )
                                    )}
                                  </Stack>
                                </Collapse>
                              </Box>
                            ))}
                        </Stack>
                      </Collapse>
                    </Box>
                  ))}
              </Stack>
            </Collapse>
          </Box>
        ))}
      </Stack>
      <Flex mt={4}>
        <Button colorScheme="blue" onClick={handleClearSelection}>
          Effacer la sélection
        </Button>
        <Spacer />
        <Button
          colorScheme="green"
          onClick={handleSubmission}
          disabled={selectedFoods.length < 10}
        >
          Soumettre
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ScaleFade initialScale={0.9} in={isOpen}>
          <ModalContent bg="green.500" color="white" mx={3}py={8} textAlign="center">
            <ModalBody>
              <CheckIcon boxSize="48px" m="auto"/>
              <Text fontSize="lg" fontWeight="bold" mt={5}>
                Merci d'avoir répondu au sondage
              </Text>
            </ModalBody>
          </ModalContent>
        </ScaleFade>
      </Modal>
    </Box>
  );  
};

export default FoodSelection;
