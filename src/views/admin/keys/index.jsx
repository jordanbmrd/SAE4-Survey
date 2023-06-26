import React, { useState, useEffect } from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import { columnsDataColumns } from "views/admin/dataTables/variables/columnsData";
import axios from "axios";

export default function Keys() {
    const [isLoadingKeys, setIsLoadingKeys] = useState(false);
    const [data, setData] = useState({});

    const handleSearch = async () => {
        const apiKey = "c18920b110484119b76b039e1506ffc1";
        const resultLength = 10;
        const url = `https://api.applicationsondage.deletesystem32.fr/getAll?api_key=${apiKey}`;

        setIsLoadingKeys(true);

        axios.get(url).then(response => {
            setData(response.data.data);
            setIsLoadingKeys(false);
        }).catch(error => console.error(error));
    };

    const transformData = (data) => {
        return Object.entries(data).map(([nom, amount]) => ({ nom, amount }));
    };

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }} display="flex" flexDirection="column" gap={5}>
        <Box display="flex" gap={2}>
            <Input width={200} placeholder="Clé API" value={ageMin} onChange={(e) => setAgeMin(e.target.value)} />
            <Button onClick={handleSearch}>Rechercher</Button>
        </Box>
        <>
            {isLoadingKeys ? (
            <Box>Chargement des groupes les plus consommés...</Box>
            ) : (
            <ColumnsTable
                columnsData={columnsDataColumns}
                tableName={"Groupes d'aliments les plus consommés"}
                tableData={transformData(groupData)}
            />
            )}
        </>
        </Box>
    );
}