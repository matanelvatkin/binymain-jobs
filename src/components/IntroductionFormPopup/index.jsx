import { useState , useContext, useEffect } from "react";
import ClassicButton from "../ClassicButton copy";
import Input from "../Input";
import styles from "./style.module.css";
import apiCalls from "../../function/apiCalls";
import { setToken } from "../../function/token";
import userContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import getGoogleOAuthURL from "../../function/getGoogleOAuthURL";

export default function IntroductionFormPopup({setIsPopup,event}){

  const {setUser} = useContext(userContext)
  const [isEmail,setIsEmail] = useState(false)
  const [step , setStep] = useState(1)
  const navigate = useNavigate();

  useEffect(()=>{
    if (localStorage.lastEvent&&localStorage.Token) {
      localStorage.lastEvent=null
      setStep(2)
    }
  }
  ,[])

  
  async function createUser (e){
    e.preventDefault();
    if(step==2){
      try {
        const firstForm = {
      fullName:(e.target[0].value),
      email:   (e.target[1].value),
    }
      if(firstForm.email){
        const res = await apiCalls("post", "user/creatUser",firstForm)
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem("Token", res.token);
        setStep(3)
      }
      else{
        console.log("no email");
      }
    } catch (error) {
      console.log(error);
    }
  }
  else{
    try {
  const fullForm = {
    fullName:(e.target[0].value),
    email:   (e.target[1].value),
    phon:    (e.target[2].value),
    city:    (e.target[3].value),
    approval:(e.target[4].checked)
  }
    if(fullForm.email){
      const res = await apiCalls("put", "user/updateDetails",fullForm)
      setUser(res);
      setStep(3)
    }
    else{
      console.log("error");
    }
  } catch (error) {
    console.log(error);
  }
    setIsPopup(false)
  }
    
  }
return(
  <>
    <div className={styles.container} onClick={()=>(setIsPopup(false))}>
        <div className={styles.popup} onClick={(event)=>{event.stopPropagation()}}>
          <div className={styles.title}><b>{step==1?"איזה כיף שבאת!":step==2?"נעים מאוד!":"שניה לפני שנמשיך,"}</b>
            <br /> <span className={styles.secondTitle}>{step==1?"נשמח להכיר ולעדכן על התנדבויות ומשרות שלא בא לך לפספס!":step==2?"הרשמה קצרה וממשיכים":"השלימו את הפרופיל ותקבלו הצעות מותאמות אישית"}</span></div>
            {(step===1)?<>
            <a href={getGoogleOAuthURL()}>
              <Input type="button" noLabelAndError={true} value="אני רוצה להמשיך באמצעות G" onClick={()=>localStorage.lastEvent=event}/> 
            </a>
              <Input type="button" onClick={()=>setStep(2)} noLabelAndError={true} value="אני רוצה להירשם באמצעות מייל"/> 
                <div>
                  {" "}
                  יש לך כבר חשבון?
                  <span onClick={()=>navigate("/login")} className={styles.clickHere}>
                    לחץ כאן
                  </span>
                </div>
            </>:
      <form onSubmit={createUser}>
        {step>1?<>
          <div className={step==3?styles.hidden:null}>
            <Input id="fullName" type="text"  name="fullName" placeholder="השם שלך" noLabelAndError={true}/>
            <Input id="email"    type="email" name="email" placeholder="המייל שלך"  noLabelAndError={true} onChange={(e)=>(setIsEmail(e.target.value!==""&&e.target.checkValidity()))}/>
          </div>
          <div className={step==2?styles.hidden:null}>
            <Input id="phone"    type="tel"   name="phone" placeholder="הטלפון שלך" noLabelAndError={true}/>
            <Input id="city"     type="text"  name="city" placeholder="היישוב שלך"  noLabelAndError={true}/>
            <label className={styles.containerCheckbox}>
              <input name="checkbox" type="checkbox" defaultChecked="true"/>
              <div className={styles.labelCheckbox}> יאלה, שלחו לי משרות והתנדבויות שיכולות לעניין אותי!</div>
            </label>
          </div>
        </>:null}
          <ClassicButton width="100%" text={step==2?"יצירת חשבון":"מדהים, המשכנו!"} type="submit" disabled={!(isEmail)}/>
      </form>}
        </div>      
    </div>
  </>
)


}