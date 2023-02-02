import "./Styles/Global.css";
import Navbar from "./Components/Navbar"
import HomePage from "./Components/HomePage";
import MyList from "./Components/MyList";
import TrendingNow from "./Components/TrendingNow";

function App() {
  
  return (
    <div className="App">
      <Navbar/>
      <HomePage/>
      <MyList/>
      <TrendingNow/>
    </div>
  )
}

export default App
