import "./Styles/Global.css";
import Navbar from "./Components/Navbar"
import HomePage from "./Components/HomePage";
import MyList from "./Components/MyList";
import TrendingNow from "./Components/TrendingNow";
import Popular from "./Components/Popular";
import TvShows from "./Components/TvShows";
import TopRated from "./Components/TopRated";
import Susepenseful from "./Components/Susepenseful";
import Movies from "./Components/Movies";
import Footer from "./Components/Footer";
import Documentary from "./Components/Documentary";
import ActionMovies from "./Components/ActionMovies";
import Fantasy from "./Components/Fantasy";

function App() {
  function close_srch(){
    document.getElementById("Search_container").style.backgroundColor = "transparent"
    document.getElementById("Search_container").style.border = "1px solid transparent"
    document.getElementById("search_input").style.width = "0px"
    document.getElementById("close_icon").style.width = "0px"
    document.getElementById("close_search").style.display = "none"
  }
  return (
    <div className="App">
      <Navbar/>
      <div onClick={close_srch}>
        <HomePage/>
        <MyList/>
        <TrendingNow/>
        <Susepenseful/>
        <TopRated/>
        <TvShows/>
        <Movies/>
        <Popular/>
        <Documentary/>
        <ActionMovies/>
        <Fantasy/>
        <Footer/>
      </div>
    </div>
  )
}

export default App
