import { Route, Routes } from "react-router-dom";
import Hadar from "./Hadar";
import Kobi from "./Kobi";
import Matanel from "./Matanel";
import Naama from "./Naama";
import Sapir from "./Sapir";
import Shahar from "./Shahar";
import Yair from "./Yair";
import Yisrael from "./Yisrael";

export default function MainTest(){
    return (
      <Routes>
        <Route path="/yair" element={<Yair/>} />
        <Route path="/naama" element={<Naama/>} />
        <Route path="/hadar" element={<Hadar />} />
        <Route path="/matanel" element={<Matanel />} />
        <Route path="/shahar" element={<Shahar/>} />
        <Route path="/sapir" element={<Sapir/>} />
        <Route path="/yisrael" element={<Yisrael/>} />
        <Route path="/kobi" element={<Kobi/>} />

      </Routes>
    );
  };
  