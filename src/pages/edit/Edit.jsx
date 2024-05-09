import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useParams } from "react-router-dom";
import './etit.scss';

const Edit = ({ inputs, title }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = getCurrentUserId();
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log("User not found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const getCurrentUserId = () => {
    const user = auth.currentUser;
    return user ? user.uid : null;
  };

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setUserData({ ...userData, [id]: value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "users", userId), {
        ...userData,
        timeStamp: serverTimestamp(),
      });
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "users", getCurrentUserId()), {
        ...userData,
        timeStamp: serverTimestamp(),
      });
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="edit">
      <Sidebar />
      <div className="editContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                userData.avatar ||
                "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => e.target.files[0]} // Suppression de la fonction setFile car non utilisée
                  style={{ display: "none" }}
                />
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    autoComplete={input.autocomplete || "off"} // Ajoutez l'attribut autocomplete si disponible
                    placeholder={input.placeholder}
                    value={userData[input.id] || ""}
                    onChange={handleInput}
                  />
                </div>
              ))}
              <button type="submit">Modifier</button> {/* Suppression de la condition de désactivation */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
