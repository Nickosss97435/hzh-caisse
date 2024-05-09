import "./widgetca.scss";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";


const WidgetCA = ({ type, title, isFirst }) => {
  const [data, setData] = useState({
    title: "",
    isMoney: false,
    montant: 0,
    ObjectifCA: 0,
    link: "",
    icon: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "/caisses/3/stats/objectifs"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        console.log(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultatsDoc = await getDoc(doc(db, "caisses/3/stats/resultats"));
        const resultatsData = resultatsDoc.data();
        const objectifsDoc = await getDoc(doc(db, "caisses/3/stats/objectifs"));
        const objectifsData = objectifsDoc.data();

    let newData = {};
    switch (type) {
      case "jour":
        newData = {
          title: "Objectif CA/JOUR",
          isMoney: true,
          montant: resultatsData.caJour,
          ObjectifCA: objectifsData.caJour,
          link: "Afficher le CA net",
          query: "users",
          icon: (
            <MonetizationOnOutlinedIcon
              className="icon"
              style={{
                backgroundColor: "rgba(0, 128, 0, 0.2)",
                color: "green",
              }}
            />
          ),
        };
        break;
      case "semaine":
        newData = {
          title: "Objectif CA/SEMAINE",
          isMoney: true,
          montant: resultatsData.caSemaine,
          ObjectifCA: objectifsData.caSemaine,
          link: "Afficher le CA net",
          icon: (
            <MonetizationOnOutlinedIcon
              className="icon"
              style={{
                backgroundColor: "rgba(218, 165, 32, 0.2)",
                color: "goldenrod",
              }}
            />
          ),
        };
        break;
      case "mois":
        newData = {
          title: "Objectif CA/MOIS",
          isMoney: true,
          montant: resultatsData.caMois,
          ObjectifCA: objectifsData.caMois,
          link: "Afficher le CA net",
          icon: (
            <MonetizationOnOutlinedIcon
              className="icon"
              style={{
                backgroundColor: "rgba(255, 0, 0, 0.2)",
                color: "crimson",
              }}
            />
          ),
        };
        break;
      case "annee":
        newData = {
          title: "Objectif CA/ANNEE",
          isMoney: true,
          montant: resultatsData.caAnnee,
          ObjectifCA: objectifsData.caAnnee,
          query: "products",
          link: "Afficher le CA net",
          icon: (
            <MonetizationOnOutlinedIcon
              className="icon"
              style={{
                backgroundColor: "rgba(128, 0, 128, 0.2)",
                color: "purple",
              }}
            />
          ),
        };
        break;
      default:
        break;
     }
        setData(newData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [type]);

  const diff = (data.montant / data.ObjectifCA) * 100 || 0;

  // Styles personnalisés pour la CircularProgressbar
  const customStyles = {
    root: {},
    path: {
      stroke: "#02aa02", // Couleur de la barre de progression
    },
    trail: {
      stroke: "#d6d6d6", // Couleur de la piste de progression
    },
    text: {
      fill: "#02aa02", // Couleur du texte de progression
      fontSize: "24px", // Taille du texte de progression
    },
  };

  return (
    <div className="widget">
      {isFirst && <h2 className="title">Les Objectifs</h2>}
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          <span style={{ fontWeight: "bold", color: "#02aa02" }}>{data.ObjectifCA.toLocaleString()} {data.isMoney && "€"}</span>
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <CircularProgressbar
          value={diff}
          text={`${diff.toFixed(2)} %`}
          strokeWidth={5}
          styles={customStyles}
        />
        <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
          {/* {diff < 0 ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/> }
          {diff} % */}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default WidgetCA;
