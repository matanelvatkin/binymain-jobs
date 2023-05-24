import { useEffect, useState } from "react";

import Input from "../components/Input";
import apiCalls from "../function/apiCalls";
import { Link } from "react-router-dom";
import ClassicButton from "../components/ClassicButton copy";

export default function Kobi() {
  const [value, setValue] = useState("");
  const [isValidLink, setIsValidLink] = useState(false);
  const onChange = (e) => {
    setValue(e.target.value);
    console.log(value);
  };

  async function checkLink(url) {
    try {
      const response = await apiCalls("GET", "linkcheck", null, url);
      console.log(response);
      if (response === 200) {
        // Check if the status code is 200 (OK)
        setIsValidLink(true);
      } else {
        setIsValidLink(false);
      }
    } catch (error) {
      console.error("Failed to check link:", error);
      setIsValidLink(false);
      return false;
    }
  }
  checkLink(value);
  function SubmitButton() {
    console.log(isValidLink);
    if (isValidLink) {
      return (
        <div>
          <ClassicButton width={"200px"} text={"link"} type={"submit"} />
        </div>
      );
    } else {
      return (
        <div>
          <ClassicButton
            width={"200px"}
            text={"link"}
            type={"submit"}
            disabled={true}
          />
        </div>
      );
    }
  }
  return (
    <div>
      <Input type="text" label="Submit" onChange={onChange} />
      <Link to={value}>
        <SubmitButton />
      </Link>
    </div>
  );
}
