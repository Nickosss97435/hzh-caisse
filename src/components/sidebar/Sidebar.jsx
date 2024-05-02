import "./sidebar.scss";
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
import ShopIcon from '@mui/icons-material/Shop';
//import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import SavingsIcon from '@mui/icons-material/Savings';
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import OuvertureModal from '../ouverture/OuvertureModal';
import FermetureModal from "../fermeture/FermetureModal";
import SortiesModal from "../sorties/SortiesModal"; // Import SortiesModal
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Logo from '../../assets/img/svg/logo.svg';


const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [ouvertureModalVisible, setOuvertureModalVisible] = useState(false); // État pour OuvertureModal
  const [fermetureModalVisible, setFermetureModalVisible] = useState(false); // État pour FermetureModal
  const [sortiesModalVisible, setSortiesModalVisible] = useState(false); // État pour SortiesModal

  const handleOpenOuvertureModal = () => {
    setOuvertureModalVisible(true);
  };

  const handleCloseOuvertureModal = () => {
    setOuvertureModalVisible(false);
  };

  const handleOpenFermetureModal = () => {
    setFermetureModalVisible(true);
  };

  const handleCloseFermetureModal = () => {
    setFermetureModalVisible(false);
  };

  const handleOpenSortiesModal = () => {
    setSortiesModalVisible(true);
  };

  const handleCloseSortiesModal = () => {
    setSortiesModalVisible(false);
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      window.location.href = "/login"; // Redirection vers la page de connexion
    }).catch((error) => {
      console.error("Erreur lors de la déconnexion :", error);
    });
  };

  return (
    <div className="sidebar">
      {/* <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={Logo} alt="Logo" className="logo  mx-4 mt-4 w-50 h-50 " />
        </Link>
      </div> */}
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

          <li>
            <span type="button" onClick={handleOpenFermetureModal}>
              <SavingsIcon className="icon" />
              <span>Fermeture</span>
            </span>
          </li>
          {fermetureModalVisible && <FermetureModal onClose={handleCloseFermetureModal} />}

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
          <Link to="/rapport_1" style={{ textDecoration: "none" }}>
            <li>
              <AutoStoriesIcon className="icon" />
              <span>Rapport</span>
            </li>
            </Link>
          <p className="title">UTILISATEUR</p>
          <Link to="/profiles" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profil</span>
            </li>
          </Link>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Utilisateurs</span>
            </li>
          </Link>
          <li onClick={handleSignOut}>
            <ExitToAppIcon className="icon" />
            <span>Se déconnecter</span>
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
  );
};

export default Sidebar;
