import React from "react";
import DateInput from "../DateInput";
import Input from "../Input";
import styles from "./style.module.css";

export default function NoRepeatEvent({
  values,
  lable: label,
  setValues = () => {},
  timeString,
  ...props
}) {
  return <DateInput values={values} setValues={setValues} label={label} timeString={timeString} />;
}
