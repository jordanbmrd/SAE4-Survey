import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdHome,
  MdLock,
} from "react-icons/md";
import MainDashboard from "views/admin/default";
import DataTables from "views/admin/dataTables";
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Aperçu des données",
    layout: "/admin",
    path: "/dashboard",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Données Sondage",
    layout: "/admin",
    path: "/data-tables",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    component: DataTables,
  },
  {
    name: "Connexion",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  }
];

export default routes;
