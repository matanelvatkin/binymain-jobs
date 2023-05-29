import React, { useState, useRef } from "react";
import Input from "../components/Input";

const Kobi = () => {
  const [validationStatus, setValidationStatus] = useState([]);
  const [shouldMoveCursor, setShouldMoveCursor] = useState(false);
  const [validateInput, setValidateInput] = useState(false);
  const inputRefs = useRef([]);

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    // Perform validation logic and update the validationStatus state
    // based on your validation criteria
    const newValidationStatus = [...validationStatus];
    newValidationStatus[index] = validateInput(value);
    setValidationStatus(newValidationStatus);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Set the flag to move cursor
    setShouldMoveCursor(true);

    // Perform form submission logic
    // ...
  };

  const moveCursorToFirstInvalid = () => {
    const firstInvalidIndex = validationStatus.findIndex(
      (status) => status !== "valid"
    );

    if (firstInvalidIndex !== -1) {
      // Move cursor to the first invalid input
      inputRefs.current[firstInvalidIndex].focus();
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Input
        label="One"
        ref={(el) => (inputRefs.current[0] = el)}
        onChange={(event) => handleInputChange(0, event)}
        className={
          shouldMoveCursor && validationStatus[0] !== "valid" ? "invalid" : ""
        }
      />
      <Input
        label="Two"
        ref={(el) => (inputRefs.current[1] = el)}
        onChange={(event) => handleInputChange(1, event)}
        className={
          shouldMoveCursor && validationStatus[1] !== "valid" ? "invalid" : ""
        }
      />
      <Input
        label="Two"
        ref={(el) => (inputRefs.current[1] = el)}
        onChange={(event) => handleInputChange(1, event)}
        className={
          shouldMoveCursor && validationStatus[1] !== "valid" ? "invalid" : ""
        }
      />
      <Input
        label="Two"
        ref={(el) => (inputRefs.current[1] = el)}
        onChange={(event) => handleInputChange(1, event)}
        className={
          shouldMoveCursor && validationStatus[1] !== "valid" ? "invalid" : ""
        }
      />
      <Input
        label="Two"
        ref={(el) => (inputRefs.current[1] = el)}
        onChange={(event) => handleInputChange(1, event)}
        className={
          shouldMoveCursor && validationStatus[1] !== "valid" ? "invalid" : ""
        }
      />
      <Input
        label="Two"
        ref={(el) => (inputRefs.current[1] = el)}
        onChange={(event) => handleInputChange(1, event)}
        className={
          shouldMoveCursor && validationStatus[1] !== "valid" ? "invalid" : ""
        }
      />
      <Input
        label="Two"
        ref={(el) => (inputRefs.current[1] = el)}
        onChange={(event) => handleInputChange(1, event)}
        className={
          shouldMoveCursor && validationStatus[1] !== "valid" ? "invalid" : ""
        }
      />
      <Input
        label="Two"
        ref={(el) => (inputRefs.current[1] = el)}
        onChange={(event) => handleInputChange(1, event)}
        className={
          shouldMoveCursor && validationStatus[1] !== "valid" ? "invalid" : ""
        }
      />
      <Input
        label="Two"
        ref={(el) => (inputRefs.current[1] = el)}
        onChange={(event) => handleInputChange(1, event)}
        className={
          shouldMoveCursor && validationStatus[1] !== "valid" ? "invalid" : ""
        }
      />
      <Input
        label="Two"
        ref={(el) => (inputRefs.current[1] = el)}
        onChange={(event) => handleInputChange(1, event)}
        className={
          shouldMoveCursor && validationStatus[1] !== "valid" ? "invalid" : ""
        }
      />
      <Input
        label="Two"
        ref={(el) => (inputRefs.current[1] = el)}
        onChange={(event) => handleInputChange(1, event)}
        className={
          shouldMoveCursor && validationStatus[1] !== "valid" ? "invalid" : ""
        }
      />
      {/* Add more input fields as needed */}
      <button type="submit">Submit</button>
      {shouldMoveCursor && moveCursorToFirstInvalid()}
    </form>
  );
};

export default Kobi;
