import "./navbar.scss";
import React, { useEffect, useState } from "react";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Logo from '../../assets/img/svg/logo.svg'



const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [userData, setUserData] = useState(null);
  const user = auth.currentUser;

  const userId = user ? user.uid : null;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getDoc(doc(db, "users", getCurrentUserId()));
        if (user.exists()) {
          setUserData({ id: user.id, ...user.data() });
        } else {
          console.log("User not found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    // Cleanup function
    return () => {
      // Any cleanup code if needed
    };
  }, []);

  const getCurrentUserId = () => {
    /// rest à implémenter la logique pour obtenir l'ID utilisateur actuel.
     // Si l'authentification Firebase, possible d'obtenir l'ID de l'utilisateur actuel comme ceci :
     // renvoie firebase.auth().currentUser.uid ;
     // À des fins de démonstration, renvoi d'un ID utilisateur factice.
    return user ? user.uid : null;; // Replace this with actual code to get the current user ID
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="navbar">
      <div className="wrapper">

        <div className="search">
          <img src={Logo} alt="Logo" className="logo  mx-4  " />
          {/* <input type="text" placeholder="Recherche..." />
          <SearchOutlinedIcon /> */}
        </div>
          Bonjour, {userData.name}
        <div className="items">

          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            Français
          </div>

          <div className="item">
          <Link className="text-danger" style={{ textDecoration: "none" }}>
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
            </Link>
          </div>

          {/* <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div> */}

          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          {/* <div className="item">
            <ListOutlinedIcon className="icon" />
          </div> */}
          <div className="item">
          <Link to="/profiles" style={{ textDecoration: "none" }}>
            <img
              src={userData.avatar}
              alt=""
              className="avatar"
            />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
