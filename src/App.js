import { BrowserRouter } from "react-router-dom";
import Main from "./layout/Main";
import MainTest from "./test/MainTest";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
