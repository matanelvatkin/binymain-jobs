import { useState } from "react"
import ForgetPassword from "../../components/ForgetPassword"
import fakeDataContext from "../../context/fakeDataContext"
import headerContext from "../../context/headerContext"
import userContext from "../../context/userContext"

import Header from "../Header"
import Main from "../Main"

function Layout() {
  const [user, setUser] = useState(true);
  const [fakeData, setFakeData] = useState("bla bla");
  const [header, setHeader] = useState("home");
  const [search, setSearch] = useState("")

  return (
    <>
      <userContext.Provider value={{user, setUser}}>
        <headerContext.Provider value={{ header, setHeader, search, setSearch }}>
          <Header />
          <fakeDataContext.Provider value={{ fakeData }}>
            <Main />
          </fakeDataContext.Provider>
        </headerContext.Provider>
      </userContext.Provider>
      {/* <popUp/> */}
    </>
  );
}

export default Layout;
