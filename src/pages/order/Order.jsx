import "./order.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableOrder from "../../components/datatableorder/DatatableOrder";

const Order = () => {
  return (
    <div className="order">
      <Sidebar/>
      <div className="orderContainer">
        <Navbar/>
        <DatatableOrder />
      </div>
    </div>
  )
}

export default Order;