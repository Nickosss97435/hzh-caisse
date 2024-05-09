import "./log.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableLog from "../../components/datatablelog/DatatableLog";

const Log = () => {
  return (
    <div className="home">
      <Navbar/>
      <Sidebar/>
      <div className="homeContainer">
        
        <DatatableLog />
      </div>
    </div>
  )
}

export default Log;