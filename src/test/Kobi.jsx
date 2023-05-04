import { useEffect, useState } from "react";
import Input from "../components/Input";
import NewEvent from "../pages/NewEvent";
import $ from "jquery";
import apiCalls from "../function/apiCalls";

export default function Kobi() {
  const [myImage, setMyImage] = useState("");
  apiCalls("post", "event").then((event) => {
    setMyImage(event[159].cardImageURL);
    console.log({ myImage });
  });
  const testImage = "http://localhost:5000/upload/Kobi_pic-03052023170005.jpeg";
  console.log(testImage.toString());
  useEffect(() => {
    setMyImage(testImage);
    console.log("22", testImage.toString());
  }, []);
  return (
    <div>
      <img src={testImage} alt="Event pic" />
    </div>
  );
}
