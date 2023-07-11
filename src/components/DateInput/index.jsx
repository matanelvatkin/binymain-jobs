import style from "./style.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

// creator: Hadar Naiman
export default function DateInput({ values, setValues = () => {},includeDates,maxDate, minDate,classNameStyle,
datepickerStyle,startDate, ...props }) {
  const [datepicker, setdatepicker] = useState(false);
  const [selectDate, setSelectDate] = useState(startDate?startDate:
    // !sessionStorage.getItem("date")
    // ?
    new Date()
    // : sessionStorage.getItem("date")
  );
  useEffect(() => {
    setValues({ ...values, date: selectDate })
    {console.log(values.date)};
  }, [selectDate]);

  function dateSelectHandle(date) {
    setSelectDate(() => date);
    sessionStorage.setItem("date", date);
    setdatepicker(!datepicker);
    if (typeof props.func === "function") props.func(date);
  }

  function dateFormat(dateString) {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear().toString();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  const buttonText = "בחר תאריך ביומן";

  return (
    <div className={style.container}>
      <button
        className={classNameStyle? style.customized: style.button}
        onClick={() => setdatepicker(!datepicker)}
        type="button"
      >
        {!classNameStyle&&
        <span className={style.arrIcon}>
          <IoIosArrowBack />
        </span>}
        <span className={style.buttonText}>
          {selectDate ? dateFormat(selectDate) : buttonText}
        </span>
        {!classNameStyle&&
        <span className={style.calIcon}>
          <FaRegCalendarAlt />
        </span>}
      </button>
      {datepicker && (
        <div className={datepickerStyle? style.datepicker: style.calander}>
          <DatePicker
            inline
            dateFormat="dd/MM/yyyy"
            selected={props.val ? props.val : selectDate}
            onSelect={(date) => dateSelectHandle(date)}
            includeDates={includeDates}
            minDate={minDate?minDate: new Date()}
            maxDate={maxDate}
          />
        </div>
      )}
    </div>
  );
}
