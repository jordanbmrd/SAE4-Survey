import React, { useState, useEffect } from "react";
import { Box, Button, Input, Text, Select } from "@chakra-ui/react";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [APIKey2, setAPIKey2] = useState("");
    const [APIKey3, setAPIKey3] = useState("");
    const [active, setActive] = useState("active");
    const [APIKeyToUpdate, setAPIKeyToUpdate] = useState("");
    const [APIKeyToDelete, setAPIKeyToDelete] = useState("");

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

    const createAPIKey = () => {
      if (APIKey && adminID) {
        const url = `https://api.applicationsondage.deletesystem32.fr/createAPIKey?api_key=${APIKey}&super_admin_id=${adminID}`;
        axios.get(url).then(response => {
          toast.success("La clé a bien été créée : " + response.data.api_key);
          setAPIKey("");
          setAdminID("");
          handleSearch();
        })
        .catch(err => {
          toast.error("Erreur durant la création");
          console.log(err);
        });
      }
    }

    const updateAPIKey = () => {
      if (APIKey2 && APIKeyToUpdate) {
        const url = `https://api.applicationsondage.deletesystem32.fr/updateAPIKey?api_key=${APIKey2}`;
        axios.put(url, {
          api_key_owner_id: 1,
          api_key: APIKeyToUpdate,
          api_key_active: active === 'active' ? true : false,
        }).then(() => {
          toast.success("La clé a bien été mise à jour");
          setAPIKey2("");
          setAPIKeyToUpdate("");
          handleSearch();
        }).catch(err => {
          toast.error("Erreur durant la mise à jour");
          console.log(err);
        });
      }
    }

    const deleteAPIKey = () => {
      if (APIKey3 && APIKeyToDelete) {
        const url = `https://api.applicationsondage.deletesystem32.fr/deleteAPIKey?api_key=${APIKey3}&delete_api_key=${APIKeyToDelete}`;
        console.log({
          api_key_owner_id: 1,
          api_key: APIKeyToDelete,
        });
        axios.delete(url).then(() => {
          toast.success("La clé a bien été supprimée");
          setAPIKey3("");
          setAPIKeyToDelete("");
          handleSearch();
        }).catch(err => {
          toast.error("Erreur durant la suppression");
          console.log(err);
        });
      }
    }

    useEffect(() => handleSearch(), []);

    return (
        <>
          <Box pt={{ base: "130px", md: "80px", xl: "80px" }} display="flex" flexDirection="column" gap={5}>
              <Box display="flex" gap={2}>
                <Text width={200}>Créer une nouvelle clé API</Text>
                <Input width={200} placeholder="Authorisation" value={APIKey} onChange={(e) => setAPIKey(e.target.value)} />
                <Input width={200} placeholder="Admin ID" value={adminID} onChange={(e) => setAdminID(e.target.value)} />
                <Button onClick={createAPIKey}>Rechercher</Button>
              </Box>
              <Box display="flex" gap={2}>
                <Text width={200}>Mettre à jour la clé API</Text>
                <Input width={200} placeholder="Authorisation" value={APIKey2} onChange={(e) => setAPIKey2(e.target.value)} />
                <Input width={200} placeholder="Clé API" value={APIKeyToUpdate} onChange={(e) => setAPIKeyToUpdate(e.target.value)} />
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
                <Button onClick={updateAPIKey}>Mettre à jour</Button>
              </Box>
              <Box display="flex" gap={2}>
                <Text width={200}>Supprimer la clé API</Text>
                <Input width={200} placeholder="Authorisation" value={APIKey3} onChange={(e) => setAPIKey3(e.target.value)} />
                <Input width={200} placeholder="Clé API" value={APIKeyToDelete} onChange={(e) => setAPIKeyToDelete(e.target.value)} />
                <Button onClick={deleteAPIKey}>Supprimer</Button>
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
          <ToastContainer />
        </>
    );
}