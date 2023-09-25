import "./HomePage.css"
import HomeNavBar from "./HomeNavBar"
import Sidebar from "./Sidebar"
import Playbar from "./Footer"

export default function HomePage() {
  return (
    <div className="home_page">
      <div className="home_page_top">
        <section className="home_page_left">
          <Sidebar />
        </section>
        {/* <Divider /> */}
        <section className="home_page_right">
          {/* <Home searching={searching} />*/}
          <HomeNavBar />
        </section>
      </div>
      <Playbar />
    </div>
  )
}