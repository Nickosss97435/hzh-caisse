import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, { useEffect, useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, auth, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const navigate = useNavigate();

  const [ setLoading] = useState(false); // Utilisé pour afficher une indication de chargement, mais pas utilisé dans le code actuel
  const [ setName] = useState(""); // Utilisé pour afficher le nom de l'image, mais pas utilisé dans le code actuel

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      setName(name); // Utilisation de 'name'

      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPerc(progress);
        },
        (error) => {
          console.log(error);
          setLoading(false);
          toast.error("Erreur lors du téléchargement de l'image.");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
            setLoading(false);
          });
        }
      );
    };
    if (file) {
      setLoading(true);
      uploadFile();
    }
  }, [file]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = res.user;
  
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        agence: data.agence,
        email: data.email,
        username: data.username,
        name: data.name, // Utilisation de 'name'
        user: data.user,
        phone: data.phone,
        avatar: data.img,
        role: data.role,
        timeStamp: serverTimestamp(),
      });
  
      toast.success("Le nouveau compte a été créé avec succès.");
      setLoading(false);
      setData({}); // Réinitialiser les données du formulaire
      setFile(null); // Réinitialiser l'état de l'image
      if (!auth.currentUser) {
        navigate('/users');
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Erreur lors de la création du compte.");
    }
  };
  

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <ToastContainer />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                    value={data[input.id] || ''} // Ajout de la valeur de l'input
                  />
                </div>
              ))}
              <button disabled={per !== null && per < 100} type="submit">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
