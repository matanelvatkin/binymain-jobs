import ReactSelect from "react-select";
import { useState, useEffect } from "react";
import styles from "../components/SelectIcon/style.module.css";
import { hebTranslation } from "../components/SelectIcon/translition";
import { settingsContext } from "../layout/Layout";
import Select from "react-select";
import MultiSelect from "../components/MultiSelect/MultiSelect";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
export default function Kobi() {
  return <MultiSelect options={options} />;
}
