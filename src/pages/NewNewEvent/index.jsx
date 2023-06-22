import {useState, useContext, useEffect} from 'react';
import headerContext from "../../context/headerContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { settingsContext } from "../../layout/Layout";
import RoundButton from "../../components/RoundButton";
import { translation, locations } from '../SearchEvent/translation';
import Loader from "../../components/Loader"; 
import style from "./style.module.css"; 

const NewNewEvent = () => {

  // variables for the categories and audiences

  const settingContext = useContext(settingsContext);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [audiences, setAudiences] = useState([]);

  // this useEffect sets the Audiences and the Categories
  
  useEffect(() => {
    if (settingContext.categories && settingContext.audiences) {
      setAudiences(settingContext.audiences);
      setCategories(settingContext.categories);
      setLoading(() => false);
    }
  }, [settingContext.audiences, settingContext.categories]);

  //setting the header
  
  const { setHeader } = useContext(headerContext);
  setHeader("פרסם אירוע");

  //this function 
  function clickCategory(e) {
    setCategories((prev) =>
      prev.map((v, i) =>
        i == e.target.id
          ? (console.log(e.target), { ...v, isActive: !v.isActive })
          : v
      )
    );
  }

  function clickAudience(e) {
    setAudiences((prev) =>
      prev.map((v, i) =>
        i == e.target.id ? { ...v, isActive: !v.isActive } : v
      )
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
    
    //Get the form values
    const eventName = e.target.elements[eventName].value;
  const eventDate = e.target.elements[eventDate].value;
  const place = e.target.elements[place].value;
  const specificPlace = e.target.elements[specificPlace].value;
  const beginningTime = e.target.elements[beginningTime].value;
  const finishTime = e.target.elements[finishTime].value;
  const isFree = e.target.elements[isFree].checked;
  const summary = e.target.elements[summary].value;
  const registrationPageURL = e.target.elements[registrationPageURL].value;
  const cardImageURL = e.target.elements[cardImageURL].files[0];
  const coverImageURL = e.target.elements[coverImageURL].files[0];
  const advertiserName = e.target.elements[advertiserName].value;
  const advertiserTel = e.target.elements[advertiserTel].value;
  const advertiserEmail = e.target.elements[advertiserEmail].value;
  
// Create an object with the form data
const formData = {
  
  
};

// Perform any validation or data processing here

// Submit the form data to the server or perform any desired actions
console.log(formData);

// Reset the form
e.target.reset();

  }

  return <div className={style.content} dir="rtl">
  <br/>
  <div class="fs-5 fw-bold">
        כמה פרטים כדי שנוכל לפרסם את האירוע שלך
      </div>
      <br/>  
   
   <form onSubmit={handleSubmit}>
  
  <div class="mb-3">
    <label class="form-label">שם האירוע</label>
    <input class="form-control" name="eventName"></input>
  </div>
  
  <div class="mb-3">
  <label class="form-label">מתי האירוע מתקיים?</label>
    <input class="form-control" type="date" name="eventDate" placeholder='תאריך האירוע'></input>
  </div>
  <div class="mb-3">
  <label class="form-label">בחר מיקום</label>
  <select class="form-select mb-2" id="location" name="place">
    <option selected>שער בנימין</option>
    {locations.map((v)=> <option value={v}>{v}</option>)}
  </select>         
</div>
  <div class="mb-3">
  <label class="form-label" name="specificPlace">הזן מיקום מדויק או כתובת</label>
    <input class="form-control"></input>
  </div>

  <div class="mb-3">
  <label class="form-label">מתי האירוע יתחיל?</label>
    <input class="form-control" type="time" name="beginningTime"></input>
  </div>

  <div class="mb-3">
  <label class="form-label">מתי האירוע יסתיים?</label>
    <input class="form-control" type="time" name="finishTime"></input>
  </div>

  <div class="form-check form-switch">
  <input class="form-check-input"  style={{ float: 'right' }} type="checkbox"></input>
  <label class="form-check-label" name="isFree">כניסה בתשלום</label>
</div>

<div className={style.section}>
          <span class="form-label">{translation.category}</span>
          <div className={style.categories}>
            {!loading ? (
              categories.map((category, i) => (
                <RoundButton
                  text={translation[category.name]}
                  icon={category.icon}
                  func={clickCategory}
                  id={i}
                  isActive={category.isActive}
                />
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>

        <div className={style.section}>
          <span class="form-label">{translation.audience}</span>
          <div className={style.audiences}>
            {!loading ? (
              audiences.map((audience, i) => (
                <RoundButton
                  text={translation[audience.name]}
                  icon={audience.icon}
                  id={i}
                  func={clickAudience}
                  isActive={audience.isActive}
                />
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
<br/>
<div class="form-group">
    <label class="form-label">קצת פרטים על האירוע...</label>
    <textarea class="form-control" rows="3" name="summary"></textarea>
  </div>
<br/>
  <div class="mb-3">
  <label class="form-label">לינק להרשמה / לפרטים נוספים</label>
    <input class="form-control" name="regisrationPageURL"></input>
  </div>


<div class="mb-3">
  <label class="form-label">תמונה ראשית</label>
  <input class="form-control" type="file" name="cardImageURL"></input>
  <div class="form-text">יש להעלות תמונה מרובעת ביחס 1:1</div>
</div>
<div class="mb-3">
  <label class="form-label">תמונת נושא</label>
  <input class="form-control" type="file" name="coverImageURL"></input>
  <div class="form-text">יש להעלות תמונה לרוחב ביחס 16:9</div>
</div>

<div class="mb-3">
    <label class="form-label">שם המפרסם</label>
    <input class="form-control" name="advertiserName"></input>
  </div>
  <div class="mb-3">
    <label class="form-label">טלפון</label>
    <input class="form-control" name="advertiserTel"></input>
  </div>
  <div class="mb-3">
    <label class="form-label">מייל</label>
    <input class="form-control" name="advertiserEmail"></input>
  </div>

<div class="d-grid gap-2">
  <button type="submit" class="btn btn-primary">שמור</button>
  </div>
  
</form>
  </div>;
};

export default NewNewEvent;