import { Route, Routes, Navigate } from "react-router-dom";
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
import { useEffect } from "react";
import popUpContext from "../../context/popUpContext";
import apiCalls from "../../function/apiCalls";


function Main() {

  const { user, setUser } = useContext(userContext);
  const { setPopUp, setGuestMode, setPopUpText } = useContext(popUpContext);


  const VerifyToken = (e) => {
    const token = localStorage.getItem("Token");
    if(token){
    apiCalls("post", "/user/verify",  { aoutherizetion: token })
      .then((res) => {
        // const verifiedUser = JSON.stringify(res)
        if (res) {
          setUser(res);
          console.log(res);
        } else if (res.status === 401) {
          setUser(false);
          setGuestMode(true);
          setPopUp(true);
          setPopUpText(
            "🏄🏽😎 הנך נמצא כרגע על מצב אורח, אנו ממליצים להתחבר לאפליקצייה כדי שתוכל להנות מחוויית גלישה מקסימלית"
          );
        }
      })
      .catch((err) => {
        console.log(`somthing went wrong: ${err}`);
      });
  }else{
    setGuestMode(true);
          setPopUp(true);
          setPopUpText(
            "הנך נמצא על מצב אורח, התחבר ותהנה מחווית גלישה מקסימלית 🏄🏽"
          );
  }
};

  useEffect(() => {
    VerifyToken(); 
  },[]);

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
{user &&
        <Route path="/newEvent" element={<NewEvent />} />
}
      </Routes>
    </main>
  );
}
export default Main;