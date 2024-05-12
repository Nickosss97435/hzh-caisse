import "./stats.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import UpdateDataCA from "../../components/updatedataca/UpdateDataCA";

const Stats = () => {
  return (
    <div className="stats">
      <Sidebar />
      <div className="statContainer">
        <Navbar />
        <div className="Container">
          <div className="Title">
            Configuration des objectifs
            <div className="columnsContainer">
              <div className="column">
                {/* <h3>Résultats</h3> */}
                <UpdateDataCA type="caJour" />
                <UpdateDataCA type="caSemaine" />
                <UpdateDataCA type="caMois" />
                <UpdateDataCA type="caAnnee" />
              </div>
              <div className="column">
                {/* <h3>Objectifs</h3> */}
                <UpdateDataCA type="Janvier" />
                <UpdateDataCA type="Fevrier" />
                <UpdateDataCA type="Mars" />
                <UpdateDataCA type="Avril" />
                <UpdateDataCA type="Mai" />
                <UpdateDataCA type="Juin" />
                <UpdateDataCA type="Juillet" />
                <UpdateDataCA type="Aout" />
                <UpdateDataCA type="Septembre" />
                <UpdateDataCA type="Octobre" />
                <UpdateDataCA type="Novembre" />
                <UpdateDataCA type="Decembre" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
