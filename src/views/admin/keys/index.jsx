import React, { useState, useEffect } from "react";
import { Box, Button, Input, Text, Select } from "@chakra-ui/react";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import axios from "axios";

const columnsDataColumns = [
    {
      Header: "ID",
      accessor: "api_id",
    },
    {
      Header: "Admin ID",
      accessor: "api_key_owner_id",
    },
    {
      Header: "Clé API",
      accessor: "api_key",
    },
    {
      Header: "Active",
      accessor: "active",
    },
    {
      Header: "Date de création",
      accessor: "created_at",
    },
  ];

export default function Keys() {
    const [isLoadingKeys, setIsLoadingKeys] = useState(false);
    const [data, setData] = useState([]);

    const [adminID, setAdminID] = useState("");
    const [APIKey, setAPIKey] = useState("");
    const [active, setActive] = useState("");

    useEffect(() => console.log(data, columnsDataColumns), [data]);

    const handleSearch = async () => {
        const apiKey = "c18920b110484119b76b039e1506ffc1";
        const url = `https://api.applicationsondage.deletesystem32.fr/getAll?api_key=${apiKey}`;

        setIsLoadingKeys(true);

        axios.get(url).then(response => {
            setData(response.data.data);
            console.log(response);
            setIsLoadingKeys(false);
        }).catch(error => console.error(error));
    };

    useEffect(() => handleSearch(), []);

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }} display="flex" flexDirection="column" gap={5}>
            <Box display="flex" gap={2}>
              <Text width={200}>Créer une nouvelle clé API</Text>
              <Input width={200} placeholder="Admin ID" value={adminID} onChange={(e) => setAdminID(e.target.value)} />
              <Input width={200} placeholder="Clé API" value={APIKey} onChange={(e) => setAPIKey(e.target.value)} />
              <Button onClick={handleSearch}>Rechercher</Button>
            </Box>
            <Box display="flex" gap={2}>
              <Text width={200}>Mettre à jour la clé API</Text>
              <Input width={200} placeholder="Clé API" value={APIKey} onChange={(e) => setAPIKey(e.target.value)} />
              <Select
                  width={200}
                  isRequired={true}
                  variant='auth'
                  fontSize='sm'
                  value={active}
                  onChange={e => setActive(e.target.value)}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Select>
              <Button onClick={handleSearch}>Rechercher</Button>
            </Box>
            <>
                {isLoadingKeys ? (
                <Box>Chargement des groupes les plus consommés...</Box>
                ) : (
                <ColumnsTable
                    columnsData={columnsDataColumns}
                    tableName={"Liste des clés API existantes"}
                    tableData={data}
                />
                )}
            </>
        </Box>
    );
}