import "./logsorties.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableSorties from "../../components/datatablesorties/DatatableSorties";

const LogSorties = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableSorties />
      </div>
    </div>
  )
}

export default LogSorties;