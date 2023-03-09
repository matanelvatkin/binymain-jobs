import { useState } from "react"
import ContextFakeData from "../../context/fackData"
import Header from "../Header"
import Main from "../Main"

function Layout() {
  const [fakeData, setFakeData] = useState("bla bla");
  const [header, setHeader] = useState("home");

  return (
    <>
      <headerContext.Provider value={{ header, setHeader }}>
        <Header />
        <fakeDataContext.Provider value={{ fakeData }}>
          <Main />
        </fakeDataContext.Provider>
      </headerContext.Provider>
      {/* <popUp/> */}
    </>
  );
}

export default Layout;
