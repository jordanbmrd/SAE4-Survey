import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Spinner
} from "@chakra-ui/react";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useState, useEffect } from "react";
import {
  MdBarChart,
} from "react-icons/md";
import { GiHealthDecrease, GiHealthIncrease, GiHealthNormal } from "react-icons/gi";
import DailyVisitors from "views/admin/default/components/DailyVisitors";
import ModernLineCard from "views/admin/default/components/ModernLineCard";
import ModernBarChart from "views/admin/default/components/ModernBarChart";
import axios from 'axios';
import {
  barChartData,
  barChartOptions,
} from "variables/charts";

export default function UserReports() {
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [isLoadingGroup, setIsLoadingGroup] = useState(false);
  const [isLoadingSubgroup, setIsLoadingSubgroup] = useState(false);
  const [isLoadingSubsubgroup, setIsLoadingSubsubgroup] = useState(false);
  const [groupData, setGroupData] = useState({});
  const [subgroupData, setSubgroupData] = useState({});
  const [subsubgroupData, setSubsubgroupData] = useState({});

  useEffect(() => console.log(isLoadingGroup && !groupData.keys?.length && !groupData.values?.length ? "" : barChartOptions(groupData.keys)), [groupData]);

  const handleSearch = async () => {
    const apiKey = "c18920b110484119b76b039e1506ffc1";
    const resultLength = 10;
    const ageMin = 20;
    const ageMax = 23;
    const urls = [
      `https://api.applicationsondage.deletesystem32.fr/getMostConsumedGroupsByAgeGroup?age_min=${ageMin}&age_max=${ageMax}&result_length=${resultLength}&api_key=${apiKey}`,
      `https://api.applicationsondage.deletesystem32.fr/getMostConsumedSubgroupsByAgeGroup?age_min=${ageMin}&age_max=${ageMax}&result_length=${resultLength}&api_key=${apiKey}`,
      `https://api.applicationsondage.deletesystem32.fr/getMostConsumedSubSubgroupsByAgeGroup?age_min=${ageMin}&age_max=${ageMax}&result_length=${resultLength}&api_key=${apiKey}`,
    ];

    setIsLoadingGroup(true);
    setIsLoadingSubgroup(true);
    setIsLoadingSubsubgroup(true);

    axios.get(urls[0]).then(response => {
      setGroupData({
        keys: Object.keys(response.data.data),
        values: Object.values(response.data.data).map(String)
      });

      setIsLoadingGroup(false);
    }).catch(error => console.error(error));

    axios.get(urls[1]).then(response => {
      setSubgroupData({
        keys: Object.keys(response.data.data),
        values: Object.values(response.data.data).map(String)
      });

      setIsLoadingSubgroup(false);
    }).catch(error => console.error(error));

    axios.get(urls[2]).then(response => {
      setSubsubgroupData({
        keys: Object.keys(response.data.data),
        values: Object.values(response.data.data).map(String)
      });

      setIsLoadingSubsubgroup(false);
    }).catch(error => console.error(error));
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }
            />
          }
          name='Réponses'
          value='124'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={GiHealthNormal} color={brandColor} />
              }
            />
          }
          name='Score santé moyen'
          value='67'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={GiHealthDecrease} color={brandColor} />
              }
            />
          }
          name='Score santé (min)'
          value='21'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={GiHealthIncrease} color={brandColor} />
              }
            />
          }
          name='Score santé (max)'
          value='98'
        />
        <MiniStatistics growth='+23%' name='Visiteurs (/mois)' value='54' />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <ModernLineCard />
        <DailyVisitors />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        {isLoadingGroup && groupData.keys?.length > 0 && groupData.values?.length > 0 ? <Spinner /> : <ModernBarChart options={barChartOptions(groupData.keys)} data={barChartData(groupData.values)} tableName="Groupes d'aliments les plus consommés" /> }
        {isLoadingSubgroup && subgroupData.keys?.length > 0 && subgroupData.values?.length > 0 ? <Spinner /> : <ModernBarChart options={barChartOptions(subgroupData.keys)} data={barChartData(subgroupData.values)} tableName="Sous-groupes d'aliments les plus consommés" /> }
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        {isLoadingSubsubgroup && subsubgroupData.keys?.length > 0 && subsubgroupData.values?.length > 0 ? <Spinner /> : <ModernBarChart options={barChartOptions(subsubgroupData.keys)} data={barChartData(subsubgroupData.values)} tableName="Sous-sous-groupes d'aliments les plus consommés" /> }
      </SimpleGrid>
    </Box>
  );
}
