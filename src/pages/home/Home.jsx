import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
//import Widget from "../../components/widget/Widget";
//import Featured from "../../components/featured/Featured";
//import Chart from "../../components/chart/Chart";
//import Table from "../../components/table/Table";
import DatatableLog from "../../components/datatablelog/DatatableLog";
import Profiles from "../profiles/Profiles";
import ProfilesCard from "../../components/profiles/ProfilesCard";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        {/* <div className="widgets">
          <Widget type="user" />
          <Widget type="product" />
          <Widget type="order" />
          <Widget type="earning" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="6 derniers mois (revenus)" aspect={2 / 1} />
        </div> */}
        <div className="listContainer">
          <div className="listTitle">Tableau de bord</div>
          <ProfilesCard/>
          <DatatableLog />
          {/* <DatatableLog /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
