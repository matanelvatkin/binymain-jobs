import { useState } from "react"
import fakeDataContext from "../../context/fakeDataContext"
import headerContext from "../../context/headerContext"
import Header from "../Header"
import Main from "../Main"

function Layout() {

const [fakeData ,setFakeData]=useState("bla bla")
const [header, setHeader] = useState("")

  return (
    <>
    <headerContext.Provider value={{header,setHeader}}>
      <Header/>
    <fakeDataContext.Provider value={{fakeData}}>
      <Main/>
    </fakeDataContext.Provider>
    </headerContext.Provider>
    {/* <popUp/> */}
    </>
  )
}

export default Layout