import "./ouverture.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

const Ouverture = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <h1>Ouverture</h1>
      </div>
    </div>
  )
}

export default Ouverture