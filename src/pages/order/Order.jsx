import "./order.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableOrder from "../../components/datatableorder/DatatableOrder";

const Order = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
      <Navbar />
        <div className="listContainer">
        {/* <div className="listTitle">Transactions</div> */}
        <DatatableOrder />
        </div>
      </div>
    </div>
  );
};

export default Order;
