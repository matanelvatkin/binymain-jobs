import { useState } from "react"
import ForgetPassword from "../../components/ForgetPassword"
import GuestPopup from "../../components/GuestPopup"
import fakeDataContext from "../../context/fakeDataContext"
import headerContext from "../../context/headerContext"
import userContext from "../../context/userContext"
import popUpContext from "../../context/popUpContext"

import Header from "../Header"
import Main from "../Main"

function Layout() {
  const [user, setUser] = useState(false);
  const [popUp,setPopUp] = useState(false);

  const [fakeData, setFakeData] = useState("bla bla");
  const [header, setHeader] = useState("home");
  const [search, setSearch] = useState("")

  return (
    <>
      <userContext.Provider value={{user, setUser}}>
        <popUpContext.Provider value={{setPopUp}}>
        <headerContext.Provider value={{ header, setHeader, search, setSearch }}>
          <Header />
          <fakeDataContext.Provider value={{ fakeData }}>
            <Main />
          {popUp &&
            <GuestPopup text={'כדי שתוכל לפרסם אירוע, נהיה חייבים להכיר😊'} guestMode={false}/> 
          }
          
          </fakeDataContext.Provider>
        </headerContext.Provider>
        </popUpContext.Provider>
      </userContext.Provider>
    </>
  );
}

export default Layout;
