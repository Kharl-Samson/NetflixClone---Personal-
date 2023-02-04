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

  return (
    <div className="App">
      <Navbar/>
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
  )
}

export default App
