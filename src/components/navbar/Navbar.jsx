import "./navbar.scss";
import React, { useEffect, useState } from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Logo from "../../assets/img/svg/logo.svg";

const Navbar = () => {
  const { darkMode, dispatch } = useContext(DarkModeContext);
  const [userData, setUserData] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    const getCurrentUserId = () => {
      return user ? user.uid : null;
    };

    const fetchUserData = async () => {
      try {
        const userId = getCurrentUserId();
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setUserData({ id: userDoc.id, ...userDoc.data() });
        } else {
          console.log("User not found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      <div className="wrapper">
        <div className="search">
          <img src={Logo} alt="Logo" className={`logo mx-4 ${darkMode ? 'logo-dark' : ''}`} />
        </div>
        Bonjour, {userData.username}
        <div className="items">
          <div className="item">
            <Link className="text-danger" style={{ textDecoration: "none" }}>
              <DarkModeOutlinedIcon
                className="icon"
                onClick={() => dispatch({ type: "TOGGLE" })}
              />
            </Link>
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <Link to="/profiles" style={{ textDecoration: "none" }}>
              <img src={userData.avatar} alt="" className="avatar" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
