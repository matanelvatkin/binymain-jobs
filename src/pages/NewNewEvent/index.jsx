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

  const settingContext = useContext(settingsContext);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [audiences, setAudiences] = useState([]);

  useEffect(() => {
    if (settingContext.categories && settingContext.audiences) {
      setAudiences(settingContext.audiences);
      setCategories(settingContext.categories);
      setLoading(() => false);
    }
  }, [settingContext.audiences, settingContext.categories]);

  const { setHeader } = useContext(headerContext);
  setHeader("פרסם אירוע");

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

  function applyFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
  
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
  
        form.classList.add('was-validated');
      }, false);
    });
  }
  useEffect(() => {
    applyFormValidation();
  }, []);  
  
  return <div className={style.content} dir="rtl">
  <br/>
  <div class="fs-5 fw-bold">
        כמה פרטים כדי שנוכל לפרסם את האירוע שלך
      </div>
      <br/>  
   
   <form class="needs-validation" novalidate>
  
  <div class="mb-3">
    <label class="form-label">שם האירוע</label>
    <input class="form-control"></input>
  </div>
  
  <div class="mb-3">
  <label for="exampleInputEmail1" class="form-label">מתי האירוע מתקיים?</label>
    <input class="form-control" type="date" id="exampleInputEmail1" placeholder='תאריך האירוע'></input>
  </div>
  <div class="mb-3">
  <label for="exampleInputEmail1" class="form-label">בחר מיקום</label>
  <select class="form-select mb-2" aria-label="Default select example" id="location">
    <option selected>שער בנימין</option>
    {locations.map((v)=> <option value={v}>{v}</option>)}
  </select>
</div>
  <div class="mb-3">
  <label class="form-label">הזן מיקום מדויק או כתובת</label>
    <input class="form-control"></input>
  </div>

  <div class="mb-3">
  <label class="form-label">מתי האירוע יתחיל?</label>
    <input class="form-control" type="time" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='מיקום מדויק או כתובת'></input>
  </div>

  <div class="mb-3">
  <label class="form-label">מתי האירוע יסתיים?</label>
    <input class="form-control" type="time" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='מיקום מדויק או כתובת'></input>
  </div>

  <div class="form-check form-switch">
  <input class="form-check-input"  style={{ float: 'right' }} type="checkbox"></input>
  <label class="form-check-label">כניסה בתשלום</label>
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
    <label for="exampleFormControlTextarea1">קצת פרטים על האירוע...</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
<br/>
  <div class="mb-3">
  <label class="form-label">לינק להרשמה / לפרטים נוספים</label>
    <input class="form-control"></input>
  </div>


<div class="mb-3">
  <label for="formFile" class="form-label">תמונה ראשית</label>
  <input class="form-control" type="file" id="formFile"></input>
  <div class="form-text">יש להעלות תמונה מרובעת ביחס 1:1</div>
</div>
<div class="mb-3">
  <label for="formFileMultiple" class="form-label">תמונת נושא</label>
  <input class="form-control" type="file" id="formFile"></input>
  <div class="form-text">יש להעלות תמונה לרוחב ביחס 16:9</div>
</div>

<div class="mb-3">
    <label class="form-label">שם המפרסם</label>
    <input class="form-control" aria-describedby="emailHelp"></input>
  </div>
  <div class="mb-3">
    <label class="form-label">טלפון</label>
    <input class="form-control" aria-describedby="emailHelp"></input>
  </div>
  <div class="mb-3">
    <label class="form-label">מייל</label>
    <input class="form-control" aria-describedby="emailHelp"></input>
  </div>

<div class="d-grid gap-2">
  <button type="submit" class="btn btn-primary">שמור</button>
  </div>
  
</form>


  </div>;
};

export default NewNewEvent;