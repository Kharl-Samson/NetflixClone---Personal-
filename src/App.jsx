import "./Styles/Global.css";
import Navbar from "./Components/Navbar"
import HomePage from "./Components/HomePage";
import MyList from "./Components/MyList";
import TrendingNow from "./Components/TrendingNow";
import Popular from "./Components/Popular";
import TvShows from "./Components/TvShows";
import TopRated from "./Components/TopRated";

function App() {
  
  return (
    <div className="App">
      <Navbar/>
      <HomePage/>
      <MyList/>
      <TrendingNow/>
      <TopRated/>
      <TvShows/>
      <Popular/>
    </div>
  )
}

export default App
