import { useState } from "react"
import ContextFakeData from "../../context/fakeData"
import Header from "../Header"
import Main from "../Main"

function Layout() {

const [setFakeData,fakeData]=useState("bla bla")

  return (
    <>
      <Header/>
    <ContextFakeData.Provider value={{fakeData}}>
      <Main/>
    </ContextFakeData.Provider>
    {/* <popUp/> */}
    </>
  )
}

export default Layout