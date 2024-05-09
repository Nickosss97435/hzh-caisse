import "./logentrees.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableEntrees from "../../components/datatableentrees/DatatableEntrees";

const Order = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
      <Navbar />
        <div className="listContainer">
        {/* <div className="listTitle">Encaissements</div> */}
        <DatatableEntrees />
        </div>
      </div>
    </div>
  );
};

export default Order;
