import React, { useContext } from "react";
import styles from "./style.module.css";
import { BiAnalyse } from "react-icons/bi";
import Logo from "../Logo";

function HeaderLogin() {
  return (
    <div className={styles.main}>
      <img src={"/Frame 33508.svg"} alt="" className={styles.logo} />
    </div>
  );
}

export default HeaderLogin;
