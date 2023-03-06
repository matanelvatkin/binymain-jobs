import { useState } from "react";
import styles from "./style.module.css";
import { BsArrowRightShort, BsArrowUpShort } from "react-icons/bs";

// creator:matanel vatkin
// need to get array of options (str), placeholder (str), icon (src)

const Select = ({
  choossArray = [],
  placeholder = "location",
  icon = "https://www.clipartmax.com/png/small/151-1517427_icon-contact-flat-web-business-symbol-location-icon-for-resume.png",
  style = {},
  className = "",
  ...props
}) => {
  const [valueText, setValueText] = useState(placeholder);
  const [openPopup, setOpenPopup] = useState(false);
  const lableOnclick = () => {
    setOpenPopup((prev) => !prev);
  };
  const changeTextValue = (e) => {
    setValueText(e.target.innerText);
    setOpenPopup(false);
  };
  return (
    <div>
      <div className={`${styles.select_container} ${className}`}>
        <img className={styles.icon} src={icon} />
        <p className={`${styles.select}`} onClick={lableOnclick}>
          {valueText}
        </p>
        {openPopup ? (
          <BsArrowUpShort
            style={{ width: "40px", marginRight: "10px", marginTop: "10px" }}
          />
        ) : (
          <BsArrowRightShort style={{ width: "40px", marginRight: "10px" ,marginTop:"10px" }} />
        )}
      </div>
      {openPopup ? (
        <div className={`${styles.select_box}`}>
          {choossArray.map((opt) => (
            <p className={`${styles.option}`} onClick={changeTextValue}>
              {opt}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Select;
