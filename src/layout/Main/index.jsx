// import { useContext } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
// import ContextFakeData from "../../context/fackData"
import Home from "../../pages/Home"
import NewEvent from "../../pages/NewEvent"
import SearchEvent from "../../pages/SearchEvent"
import ViewEvent from "../../pages/ViewEvent"
import SearchResult from "../../pages/SearchResult"
import Login from "../../pages/Login"
import Registeretion from "../../pages/Registeretion"
import Test from "../../pages/Test"
import ResetPassword from "../../components/ResetPassword"
import ForgetPassword from "../../components/ForgetPassword"


function Main() {
  // const x = useContext(ContextFakeData)
  return (
    <main>
      {/* {x} */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/test" element={<Test/>}/>
        <Route path="/registeretion" element={<Registeretion/>}/>
        <Route path="/newEvent" element={<NewEvent/>}/>
        <Route path="/searchEvent" element={<SearchEvent/>}/>
        <Route path="/searchEvent/result/:query" element={<SearchResult/>}/>
        <Route path="/viewEvent/:event" element={<ViewEvent/>}/>
        <Route path="/forgetPassword" element={<ForgetPassword/>}/>
        <Route path="/resetPassword" element={<ResetPassword/>}/>

        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    </main>
  )
}

export default Main