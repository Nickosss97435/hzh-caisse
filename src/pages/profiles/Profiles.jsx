import "./profiles.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ProfilesCard from "../../components/profiles/ProfilesCard";

//import LineChart from "../../components/linechart/LineChart";

const Profiles = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
      <Navbar />
        <div className="listContainer">
        {/* <div className="listTitle">Tableau de bord</div> */}
        <div className="widgets" >
          <ProfilesCard />
        </div>
        <div className="charts">
        </div>
        <div className="charts">
        </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
