import "./sidebar.scss";
import * as React from 'react';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//import SavingsIcon from '@mui/icons-material/Savings';
import DehazeRoundedIcon from '@mui/icons-material/DehazeRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PermDataSettingRoundedIcon from '@mui/icons-material/PermDataSettingRounded';
import AllInboxOutlinedIcon from '@mui/icons-material/AllInboxOutlined';
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import OuvertureModal from '../ouverture/OuvertureModal';
//import FermetureModal from "../fermeture/FermetureModal";
import SortiesModal from "../sorties/SortiesModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(false); // État pour contrôler l'ouverture/fermeture de la barre latérale
  const [ouvertureModalVisible, setOuvertureModalVisible] = useState(false);
  // const [fermetureModalVisible, setFermetureModalVisible] = useState(false);
  const [sortiesModalVisible, setSortiesModalVisible] = useState(false);

  const handleOpenOuvertureModal = () => {
    setOuvertureModalVisible(true);
  };

  const handleCloseOuvertureModal = () => {
    setOuvertureModalVisible(false);
  };

  // const handleOpenFermetureModal = () => {
  //   setFermetureModalVisible(true);
  // };

  // const handleCloseFermetureModal = () => {
  //   setFermetureModalVisible(false);
  // };

  const handleOpenSortiesModal = () => {
    setSortiesModalVisible(true);
  };

  const handleCloseSortiesModal = () => {
    setSortiesModalVisible(false);
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      toast.success("Au revoir et à bientôt!");
      window.location.href = "/login";
    }).catch((error) => {
      console.error("Erreur lors de la déconnexion :", error);
    });
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  

  return (
    <>
    <span type="button" className={`btn-toggle ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}>
    <DehazeRoundedIcon className="btn-toggle " />
  </span>
  <div className={`sidebar ${isOpen ? 'open' : ''}`}>
    {/* Contenu de la barre latérale */}
  </div>
  <div className={`sidebar ${isOpen ? 'open' : ''}`}>
    <span type="button" className="btn ms-5" onClick={toggleSidebar}>
      <CloseRoundedIcon className="toggle ms-5 ps-2" />
    </span>
      <hr />
      <div className="center">
        <ul>
          <p className="title">PRINCIPAL</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTES</p>
          <li>
            <span type="button" onClick={handleOpenOuvertureModal}>
              <StoreIcon className="icon" />
              <span>Ouverture</span>
            </span>
          </li>
          {ouvertureModalVisible && <OuvertureModal onClose={handleCloseOuvertureModal} />}
          <li>
            <span type="button" onClick={handleOpenSortiesModal}>
              <LocalShippingIcon className="icon" />
              <span>Sorties</span>
            </span>
          </li>
          {sortiesModalVisible && <SortiesModal onClose={handleCloseSortiesModal} />}
          <Link to="/order" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Ordres</span>
            </li>
          </Link>
          
          <p className="title">SERVICE</p>
          <Link to="/logentrees" style={{ textDecoration: "none" }}>
            <li>
              <PointOfSaleIcon className="icon" />
              <span>Encaissements</span>
            </li>
          </Link>
          <Link to="/logsorties" style={{ textDecoration: "none" }}>
            <li>
              <ShoppingCartIcon className="icon" />
              <span>Décaissement</span>
            </li>
          </Link>
          <Link to="/log" style={{ textDecoration: "none" }}>
            <li>
              <PsychologyOutlinedIcon className="icon" />
              <span>Journal</span>
            </li>
          </Link>
          <p className="title">UTILISATEUR</p>
          <Link to="/profiles" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profil</span>
            </li>
          </Link>
          <Link to="/stats" style={{ textDecoration: "none" }}>
            <li>
              <PermDataSettingRoundedIcon className="icon" />
              <span>Configuration</span>
            </li>
          </Link>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Utilisateurs</span>
            </li>
          </Link>
          <Link to="/pdf-email" style={{ textDecoration: "none" }}>
            <li>
              <AllInboxOutlinedIcon className="icon" />
              <span>PDF</span>
            </li>
          </Link>
          <li onClick={handleSignOut}>
            <ExitToAppIcon className="icon" />
            <span>Se déconnecter</span>
            <ToastContainer />
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
