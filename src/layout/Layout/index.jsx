import { createContext, useEffect, useState } from "react";
import fakeDataContext from "../../context/fakeDataContext";
import headerContext from "../../context/headerContext";
import apiCalls from "../../function/apiCalls";
import Header from "../Header";
import Main from "../Main";

export const settingsContext = createContext();

function Layout() {
  const [fakeData, setFakeData] = useState("bla bla");
  const [header, setHeader] = useState("home");
  const [search, setSearch] = useState("");

  const [categories, setCategories] = useState([])
  const [audiences, setAudiences] = useState([])

  async function fetchData() {
    let apiCategories, apiAudiences;
    try {
      apiCategories = await apiCalls("get", "/setting/categories");
      apiAudiences = await apiCalls("get", "/setting/audiences");
    } catch (e) {
      console.log();
    }

    setAudiences(apiAudiences[0].settingData.map((v) => ({
      ...v,
      isActive: false,
    })))
    setCategories(apiCategories[0].settingData.map((v) => ({
      ...v,
      isActive: false,
    })))
  }
  useEffect(()=>{
    fetchData()
  },[])

  return (
    <>
      <headerContext.Provider value={{ header, setHeader, search, setSearch }}>
        <settingsContext.Provider value={{ categories, audiences }}>
          <Header />
          <fakeDataContext.Provider value={{ fakeData }}>
            <Main />
          </fakeDataContext.Provider>
        </settingsContext.Provider>
      </headerContext.Provider>
      {/* <popUp/> */}
    </>
  );
}

export default Layout;
