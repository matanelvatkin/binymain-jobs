import React, { useContext } from "react";
import styles from "./style.module.css";
import { BiAnalyse } from "react-icons/bi";
import Logo from "../Logo";

function HeaderLogin() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Logo />
      </div>
    </div>
  );
}

export default HeaderLogin;
