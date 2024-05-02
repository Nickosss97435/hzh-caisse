import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenu</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Ventes totales réalisées aujourd'hui</p>
        <p className="amount">420€</p>
        <p className="desc">
        Traitement des transactions précédentes. Les derniers paiements peuvent ne pas être inclus.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Cible</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">12.4k €</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">La semaine dernière</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">12.4k €</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Le mois dernier</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">12.4k €</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
