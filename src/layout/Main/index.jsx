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
import { useContext } from "react"
import userContext from "../../context/userContext"
import { useState, useEffect } from "react"
import HeaderHome from "../../components/HeaderHome"


function Main() {
  // const x = useContext(ContextFakeData)
  const { user } = useContext(userContext);


  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      setIsValid(true);
    }
  }, []);


  return (
    <main>
        <Routes>
          <Route path="/" element={<Home setIsValid={setIsValid} isValid={isValid} />} />
          <Route path="/login" element={<Login setIsValid={setIsValid} isValid={isValid} />} />
          <Route path="/registeretion" element={<Registeretion />} />
         
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          
          <Route path="/searchEvent" element={<SearchEvent />} />
          <Route path="/searchEvent/result/:query" element={<SearchResult />} />
          <Route path="/viewEvent/:event" element={<ViewEvent />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<Navigate to="/" />} />
          <>{(user || isValid)?
            <Route path="/newEvent" element={<NewEvent />} />:
            null
}
          </>

        </Routes>
       
    </main>
  );
}
export default Main;