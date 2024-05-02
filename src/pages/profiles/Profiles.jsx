import "./profiles.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import ProfilesCard from "../../components/profiles/ProfilesCard"

const Profiles = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <ProfilesCard />
      </div>
    </div>
  )
}

export default Profiles;
