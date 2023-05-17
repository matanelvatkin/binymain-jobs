import React from "react";
import styles from "./style.module.css";
import SelectIcon from "../../components/SelectIcon";
import { useState } from "react";
import { GiLightBackpack } from "react-icons/gi";
import RoundButton from "../../components/RoundButton";
import Kobi from "../../test/Kobi";

function Test() {
  return (
    <div className={styles.main}>
      <Kobi />
    </div>
  );
}

export default Test;
