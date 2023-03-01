import styles from "./style.module.css";
import { useState } from "react";

// creator: Kobi Krumbein
// color: _______________
// icon: ________________

const Input = ({ text, style = {}, className = "", ...props }) => {
  const [inputText, setInputText] = useState("");
  const handleChange = (e) => {
    setInputText(e.target.value);
  };
  return (
    <div className={`${styles.Name} ${className}`} style={style} {...props}>
      <form>
        <label>
          <div>{text} </div>
          <input type="text" value={inputText} onChange={handleChange} />
        </label>
      </form>
      {/* <h5>
        {text}: {inputText}
      </h5> */}
    </div>
  );
};

export default Input;
