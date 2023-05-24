import { useEffect, useState } from "react";

import apiCalls from "../function/apiCalls";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import Crop from "../components/Crop/Crop";
import ClassicButton from "../components/ClassicButton copy";
import Input from "../components/Input";

export default function Kobi() {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
    console.log(value);
  };
  function SubmitButton() {
    if (value) {
      return (
        <div>
          {/* <button type="button">Button</button> */}
          <ClassicButton width={"200px"} text={"שמור"} type={"submit"} />
        </div>
      );
    } else {
      return (
        <div>
          {/* <button type="button" disabled>
            Button
          </button> */}
          <ClassicButton
            width={"200px"}
            text={"שמור"}
            type={"submit"}
            disabled={`disabled`}
          />
        </div>
      );
    }
  }
  return (
    <div>
      <Input type="text" label="Submit" onChange={onChange} />
      <SubmitButton />
    </div>
  );
}
