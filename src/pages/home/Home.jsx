import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import WidgetCA from "../../components/widgetca/WidgetCA";
import Featured from "../../components/featured/Featured";
import BarChart from "../../components/barchart/BarChart";
import DoughnutChart from "../../components/doughnutchart/DoughnutCart";
//import LineChart from "../../components/linechart/LineChart";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
      <Navbar />
        <div className="listContainer">
        <div className="listTitle">Tableau de bord</div>
        <div className="widgets" >
          <WidgetCA type="jour" />
          <WidgetCA type="semaine" />
          <WidgetCA type="mois" />
          <WidgetCA type="annee" />
        </div>
        <div className="charts">
          <Featured />
          <BarChart title="12 mois (CA €)"/>
          {/* <Chart title="6 derniers mois (revenus)" aspect={2 / 1} /> */}
        </div>
        <div className="charts"> 
        {/* <ProfilesCard /> */}
        <DoughnutChart />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
