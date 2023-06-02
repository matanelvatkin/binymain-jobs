import { useContext, useState, useEffect } from "react";
import headerContext from "../../context/headerContext";
import { locations, translation } from "./translation";
import style from "./style.module.css";
import ClassicButton from "../../components/ClassicButton copy";
import RoundButton from "../../components/RoundButton";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { settingsContext } from "../../layout/Layout";
import Select from "../../components/Select";

export default function SearchEvent({setSearch}) {

  const arrBtnDates = ["allDate","today","tomorrow","thisWeek"]

  const [loading, setLoading] = useState(true);
  
  const [categories, setCategories] = useState([]);
  const [audiences, setAudiences] = useState([]);
  const [location, setLocation] = useState("");
  const [btnDates, setBtnDates] = useState({
    "allDate": true,
    "today": false,
    "tomorrow": false,
    "thisWeek": false,
  });
  
  const settingContext = useContext(settingsContext);
  const { setHeader } = useContext(headerContext);
  
  const navigate = useNavigate();

  setHeader(translation.advencedSearch);
  
  
  function clickAudience(e) {
          setAudiences((prev) =>
          prev.map((v, i) =>
          i == e.target.id ? { ...v, isActive: !v.isActive } : v
          )
          )
        }

  function clickCategory(e) {
  setCategories((prev) =>
    prev.map((v, i) =>
      i == e.target.id
        ? (console.log(e.target), { ...v, isActive: !v.isActive })
        : v
        )
        );
      }

  function clickDateBtn(e) {
  setBtnDates((prev) => {
    let newBtnDates = { ...prev };
    Object.keys(prev).forEach((v) => (newBtnDates[v] = false));
    newBtnDates[e.target.name] = true;
    return newBtnDates;
  });
}

useEffect(() => {
  if (settingContext.categories && settingContext.audiences) {
    setAudiences(settingContext.audiences);
    setCategories(settingContext.categories);
    setLoading(() => false);
  }
}, [settingContext.audiences, settingContext.categories]);


function handleSubmit(){

  let categoriesUpdate= createListIdSettingIsTrue(categories)
  let audiencesUpdate = createListIdSettingIsTrue (audiences)
  
   function createListIdSettingIsTrue (array){
    let arrayUpdate =[]
    array.forEach(v=>{if(v.isActive){arrayUpdate.push(v._id)}})
    return arrayUpdate
   }

  let btnDatesUpdate;
  if(btnDates.allDate){btnDatesUpdate= "allDate"}
  if(btnDates.today){btnDatesUpdate= "today"}
  if(btnDates.tomorrow){btnDatesUpdate= "tomorrow"}
  if(btnDates.thisWeek){btnDatesUpdate= "thisWeek"}

// console.log(categoriesUpdate,"categoriesUpdate");
// console.log(audiencesUpdate,"audiencesUpdate");
// console.log(location,"location");
// console.log(btnDatesUpdate,"btnDatesUpdate");

setSearch(
  {
    categories: categoriesUpdate
    ,audiences: audiencesUpdate
    ,location: location
    ,btnDates: btnDatesUpdate
  }
  )

  navigate("/searchEvent/result")
}


  return (
    <div>
      {/* {console.log(categories)} */}
      {/* {console.log(audiences)} */}
      {/* {console.log(location)} */}
      {/* {console.log(btnDates)} */}


      <div className={style.content}>
        <div className={style.section}>
          <span className={style.title}>{translation.category}</span>
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
          <span className={style.title}>{translation.audience}</span>
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

        <div className={style.section}>
          <span className={style.title}>{translation.location}</span>
          <div className={style.location}>
            {
              <Select
                placeholder={location}
                choossArray={locations}
                func={setLocation}
                icon="https://cdn-icons-png.flaticon.com/512/2838/2838912.png"
              />
            }
          </div>
        </div>

        <div className={style.section}>
          <span className={style.title}>{translation.date}</span>
          <div className={style.dateBtnSelection}>
            {arrBtnDates.map(btnDate=>
            <ClassicButton
              width={100}
              text={translation[btnDate]}
              isActive={btnDates[btnDate]}
              name={btnDate}
              key={btnDate}
              func={clickDateBtn}
              oppositeColor
            /> )}
          </div>
        </div>

        <div className={style.footerBtn}>
          <ClassicButton
            width={300}
            text={translation.search}
            func={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}