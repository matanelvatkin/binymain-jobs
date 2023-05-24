import { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import Input from "../Input";

// creator:matanel vatkin
// need to get array of options (str), placeholder (str), icon (src)

const SelectInput = ({
  choossArray = [],
  placeholder = "location",
  icon,
  errorMessage,
  style = {},
  className = "",
  values,
  setValues = () => {},
  ...props
}) => {
  const [isPlaceChosen, setIsPlaceChosen] = useState(false);
  const [valueText, setValueText] = useState();
  const [openPopup, setOpenPopup] = useState(false);
  const inputRef=useRef()
  useEffect(() => {
    setValues({ ...values, [props.name]: valueText });
    if (typeof props.func === "function") props.func(valueText);
  }, [valueText]);
  const lableOnclick = (e) => {
    if(e.target.value==='') setValueText()
    setOpenPopup((prev) => e.target.value||true);
  };
  const changeTextValue = (e) => {
    setValueText(e.target.innerText);
    setOpenPopup(false);
    // setIsPlaceChosen(true);
    // setValue(valueText);
  };
  useEffect(()=>{
    if(valueText) inputRef.current.value=valueText
  },[valueText])
  return (
    <div className={styles.select_container}>
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          lableOnclick(e);
        }}
        onFocus={()=>setOpenPopup(true)}
        refInput={inputRef}
        
        />
      {openPopup ? (
          <div className={`${styles.select_box}`}>
          {choossArray.filter(opt=>{
              if(typeof openPopup === 'string') return opt.startsWith(openPopup.toLowerCase())
              else return true
            }).map((opt) => (
                <p
                key={opt}
                className={`${styles.option}`}
                onClick={changeTextValue}
                >
              {opt}
            </p>
          ))}
        </div>
      ) : null}
      {!isPlaceChosen ? (
        <span className={styles.errorMessage}> {errorMessage}</span>
      ) : (
          <span className={styles.isPlaceChosen}> {errorMessage}</span>
          )}
    </div>
  );
};

export default SelectInput;
