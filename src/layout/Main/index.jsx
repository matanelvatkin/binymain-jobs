// import { useContext } from "react"
import { Route, Routes, Navigate } from "react-router-dom";
// import ContextFakeData from "../../context/fackData"
import Home from "../../pages/Home";
import NewEvent from "../../pages/NewEvent";
import SearchEvent from "../../pages/SearchEvent";
import ViewEvent from "../../pages/ViewEvent";
import SearchResult from "../../pages/SearchResult";
import Login from "../../pages/Login";
import Registeretion from "../../pages/Registeretion";
import Test from "../../pages/Test";
import ResetPassword from "../../components/ResetPassword";
import ForgetPassword from "../../components/ForgetPassword";
import { useContext } from "react";
import userContext from "../../context/userContext";
import { useState, useEffect } from "react";
import HeaderHome from "../../components/HeaderHome";
import axios from "axios";
import popUpContext from "../../context/popUpContext";

function Main() {
  // const x = useContext(ContextFakeData)
  const { user, setUser } = useContext(userContext);
  const { setPopUp, setGuestMode, setPopUpText } = useContext(popUpContext);

  const token = localStorage.getItem("Token");
  console.log(user);

  const VerifyToken = (e) => {
    // e.preventDefault();
    axios
      .post("http://localhost:5000/api/user/verify", { aoutherizetion: token })
      .then((res) => {
        console.log("sss");
        if (res.status === 200) {
          setUser(true);
          // localStorage.setItem('Token', token)
          console.log("is valid");
        } else if (res.status === 401) {
          console.log("not valid");
          setUser(false);
          setGuestMode(true);
          setPopUp(true);
          setPopUpText(
            "🏄🏽😎 הנך נמצא כרגע על מצב אורח, אנו ממליצים להתחבר לאפליקצייה כדי שתוכל להנות מחוויית גלישה מקסימלית"
          );
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  useEffect(() => {
    VerifyToken();
    console.log(user);
  }, []);

  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registeretion" element={<Registeretion />} />

        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />

        <Route path="/searchEvent" element={<SearchEvent />} />
        <Route path="/searchEvent/result/:query" element={<SearchResult />} />
        <Route path="/viewEvent/:event" element={<ViewEvent />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/newEvent" element={<NewEvent />} />
      </Routes>
    </main>
  );
}
export default Main;
