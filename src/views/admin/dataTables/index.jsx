import { Box, SimpleGrid } from "@chakra-ui/react";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import {
  columnsDataColumns,
} from "views/admin/dataTables/variables/columnsData";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import React from "react";

export default function Settings() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} display="flex" flexDirection="column" gap={5}>
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableName={"Groupes d'aliments les plus consommés"}
          tableData={tableDataColumns}
        />
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableName={"Sous-groupes d'aliments les plus consommés"}
          tableData={tableDataColumns}
        />
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableName={"Sous-sous-groupes d'aliments les plus consommés"}
          tableData={tableDataColumns}
        />
    </Box>
  );
}
