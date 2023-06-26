import React, { useState, useEffect } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import axios from "axios";

const columnsDataColumns = [
  {
    Header: "Nom",
    accessor: "nom",
  },
  {
    Header: "Nombre",
    accessor: "amount",
  },
];

export default function Settings() {
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [isLoadingGroup, setIsLoadingGroup] = useState(false);
  const [isLoadingSubgroup, setIsLoadingSubgroup] = useState(false);
  const [isLoadingSubsubgroup, setIsLoadingSubsubgroup] = useState(false);
  const [groupData, setGroupData] = useState({});
  const [subgroupData, setSubgroupData] = useState({});
  const [subsubgroupData, setSubsubgroupData] = useState({});

  useEffect(() => console.log(transformData(groupData), columnsDataColumns), [groupData, subgroupData, subsubgroupData]);

  const handleSearch = async () => {
    const apiKey = "c18920b110484119b76b039e1506ffc1";
    const resultLength = 10;
    const urls = [
      `https://api.applicationsondage.deletesystem32.fr/getMostConsumedGroupsByAgeGroup?age_min=${ageMin}&age_max=${ageMax}&result_length=${resultLength}&api_key=${apiKey}`,
      `https://api.applicationsondage.deletesystem32.fr/getMostConsumedSubgroupsByAgeGroup?age_min=${ageMin}&age_max=${ageMax}&result_length=${resultLength}&api_key=${apiKey}`,
      `https://api.applicationsondage.deletesystem32.fr/getMostConsumedSubSubgroupsByAgeGroup?age_min=${ageMin}&age_max=${ageMax}&result_length=${resultLength}&api_key=${apiKey}`,
    ];

    setIsLoadingGroup(true);
    setIsLoadingSubgroup(true);
    setIsLoadingSubsubgroup(true);

    axios.get(urls[0]).then(response => {
      setGroupData(response.data.data);
      setIsLoadingGroup(false);
    }).catch(error => console.error(error));

    axios.get(urls[1]).then(response => {
      setSubgroupData(response.data.data);
      setIsLoadingSubgroup(false);
    }).catch(error => console.error(error));

    axios.get(urls[2]).then(response => {
      setSubsubgroupData(response.data.data);
      setIsLoadingSubsubgroup(false);
    }).catch(error => console.error(error));
  };

  const transformData = (data) => {
    return Object.entries(data).map(([nom, amount]) => ({ nom, amount }));
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} display="flex" flexDirection="column" gap={5}>
      <Box display="flex" gap={2}>
        <Input width={200} placeholder="Âge minimum" value={ageMin} onChange={(e) => setAgeMin(e.target.value)} />
        <Input width={200} placeholder="Âge maximum" value={ageMax} onChange={(e) => setAgeMax(e.target.value)} />
        <Button onClick={handleSearch}>Rechercher</Button>
      </Box>
      <>
        {isLoadingGroup ? (
          <Box>Chargement des groupes les plus consommés...</Box>
        ) : (
          <ColumnsTable
            columnsData={columnsDataColumns}
            tableName={"Groupes d'aliments les plus consommés"}
            tableData={transformData(groupData)}
          />
        )}
        {isLoadingSubgroup ? (
          <Box>Chargement des sous-groupes les plus consommés...</Box>
        ) : (
          <ColumnsTable
            columnsData={columnsDataColumns}
            tableName={"Sous-groupes d'aliments les plus consommés"}
            tableData={transformData(subgroupData)}
          />
        )}
        {isLoadingSubsubgroup ? (
          <Box>Chargement des sous-sous-groupes les plus consommés...</Box>
        ) : (
          <ColumnsTable
            columnsData={columnsDataColumns}
            tableName={"Sous-sous-groupes d'aliments les plus consommés"}
            tableData={transformData(subsubgroupData)}
          />
        )}
      </>
    </Box>
  );
}
