  import {error} from "./translation";
  
export function timeValidation (beginningTimeObj, finishTimeObj)
{

    let validationError = "";
    
    //this function updates the validation error string
    function updateValidationError  (newError) 
    { 
      validationError+= (' '+newError) 
    }  
    
    //set the minimum and the maximum time
    const minTimeObj = new Date("2000-01-01T" + "06:00");
    const maxTimeObj = new Date("2000-01-01T" + "23:59");  
    const midNight = new Date("2000-01-01T" + "00:00");

    const durationMs = finishTimeObj - beginningTimeObj; // Get the difference in milliseconds

    const minimumDurationMs = 60 * 60 * 1000; // 1 hour in milliseconds
    const maximumDurationMs = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

    //check the validation checkes, and set the propper values in the validationValues Array.
     
      if (beginningTimeObj < minTimeObj)
      {
        updateValidationError(error.error1);
        return validationError;
      }
      if (finishTimeObj >= midNight && finishTimeObj<=minTimeObj)
      {
        updateValidationError(error.error2);
        return validationError;
      }
      if(durationMs <0)
      {
        updateValidationError(error.error5);
        return validationError;
      } 
      if(durationMs<minimumDurationMs)
      {
        updateValidationError(error.error3);
        return validationError;
      }
      if(durationMs>maximumDurationMs)
      {
        updateValidationError(error.error4);
        return validationError;
      }   
      
      return validationError;
}