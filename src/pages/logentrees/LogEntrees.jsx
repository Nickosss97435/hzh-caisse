import "./logentrees.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableEntrees from "../../components/datatableentrees/DatatableEntrees";

const LogEntrees = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableEntrees />
      </div>
    </div>
  )
}

export default LogEntrees;