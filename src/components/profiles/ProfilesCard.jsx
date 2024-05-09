import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import './profiles.scss';

const ProfilesCard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = getCurrentUserId(); 
      if (userId) {
        try {
          const userDoc = await getDoc(doc(db, "users", userId));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log("User not found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();

    return () => {
      // Clean-up function if needed
    };
  }, []);

  const getCurrentUserId = () => {
    const user = auth.currentUser;
    return user ? user.uid : null;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data found.</div>;
  }

  return (
    <div className="single">
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            <Link to={`/users/edit/${userData.userId}`} style={{ textDecoration: "none" }}>
              <div className="editButton">Edit</div>
            </Link>
            <h1 className="title">Information</h1>
            <div className="item">
              {userData.avatar && <img src={userData.avatar} alt="" className="itemImg" />}
              <div className="details">
                <h1 className="itemTitle">{userData.username}</h1>
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
                  <span className="itemValue">{userData.agence}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Role:</span>
                  <span className="itemValue">{userData.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilesCard;
