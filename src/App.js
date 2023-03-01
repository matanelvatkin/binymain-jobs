import { BrowserRouter } from "react-router-dom";
import MainTest from "./test/MainTest";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainTest />
      </BrowserRouter>
    </div>
  );
}

export default App;
