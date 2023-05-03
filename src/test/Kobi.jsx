import { useEffect, useState } from "react";
import Input from "../components/Input";
import NewEvent from "../pages/NewEvent";
import $ from "jquery";

export default function Kobi() {
  const [fileData, setFileData] = useState();

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // Handle File Data from the state Before Sending
    const data = new FormData();

    data.append("file", fileData);

    fetch("http://localhost:5000/api/event/createvent", {
      method: "POST",
      body: data,
    })
      .then((result) => {
        console.log("File Sent Successful");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="App">
      <h1>React App File Uploading</h1>
      <form onSubmit={onSubmitHandler}>
        <input type="file" onChange={fileChangeHandler} />
        <br />
        <br />
        <button type="submit">Submit File to Backend</button>
      </form>
    </div>
  );
}
