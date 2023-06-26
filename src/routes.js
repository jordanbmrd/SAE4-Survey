import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdHome,
  MdLock,
  MdKey,
  MdCreate
} from "react-icons/md";
import MainDashboard from "views/admin/default";
import DataTables from "views/admin/dataTables";
import SignInCentered from "views/auth/signIn";
import RegisterCentered from "views/auth/register";
import Keys from "views/admin/keys";

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
    path: "/data",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    component: DataTables,
  },
  {
    name: "Gestion des clés API",
    layout: "/admin",
    path: "/keys",
    icon: <Icon as={MdKey} width='20px' height='20px' color='inherit' />,
    component: Keys,
  },
  {
    name: "Connexion",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  {
    name: "Créer un compte",
    layout: "/auth",
    path: "/register",
    icon: <Icon as={MdCreate} width='20px' height='20px' color='inherit' />,
    component: RegisterCentered,
  }
];

export default routes;
