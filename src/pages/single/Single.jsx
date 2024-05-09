import "./single.scss";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";


const Single = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = getCurrentUserId(); // Obtenez l'ID de l'utilisateur connecté
      if (userId) {
        try {
          const userDoc = await getDoc(doc(db, "users", userId));
          if (userDoc.exists()) {
            setUserData({ id: userDoc.id, ...userDoc.data() });
          } else {
            console.log("User not found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();

    return () => {
      // Clean-up function if needed
    };
  }, []);

  const getCurrentUserId = () => {
    const user = auth.currentUser; // Obtenez l'utilisateur actuellement connecté
    return user ? user.uid : null; // Renvoie l'ID de l'utilisateur ou null s'il n'est pas connecté
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single"> 
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
          <Link to="/users/new" style={{ textDecoration: "none" }}>
            <div className="editButton">Edit</div>
          </Link>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={userData.avatar}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{userData.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{userData.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Téléphone:</span>
                  <span className="itemValue">{userData.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Agence:</span>
                  <span className="itemValue">
                  {userData.agence}
                  </span>
                </div>
                {/* <div className="detailItem">
                  <span className="itemKey">Role:</span>
                  <span className="itemValue">{userData.role}</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
