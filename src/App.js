import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import MainTest from "./test/MainTest";
import './app.css';
import ReactGA from 'react-ga4';
  
const TRACKING_ID = "G-0KR78SJP2Q"; 
ReactGA.initialize(TRACKING_ID);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
        {/* <MainTest /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
