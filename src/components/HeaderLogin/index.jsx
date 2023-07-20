import React, { useContext } from "react";
import styles from "./style.module.css";
import { BiAnalyse } from "react-icons/bi";
import Logo from "../Logo";
import FidBeck from "../FidBeck"

function HeaderLogin() {
  return (
    <div className={styles.main}>
      <img src={"/Frame 33509.svg"} alt="" className={styles.logo} />
      <FidBeck/>
    </div>
  );
}

export default HeaderLogin;
