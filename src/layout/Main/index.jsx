// import { useContext } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
// import ContextFakeData from "../../context/fackData"
import Home from "../../pages/Home"
import NewEvent from "../../pages/NewEvent"
import SearchEvent from "../../pages/SearchEvent"
import ViewEvent from "../../pages/ViewEvent"


function Main() {
  // const x = useContext(ContextFakeData)
  return (
    <main>
      {/* {x} */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/newEvent" element={<NewEvent/>}/>
        <Route path="/searchEvent" element={<SearchEvent/>}/>
        <Route path="/viewEvent/:event" element={<ViewEvent/>}/>
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    </main>
  )
}

export default Main