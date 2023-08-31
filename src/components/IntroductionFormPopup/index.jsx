import { useState , useContext } from "react";
import ClassicButton from "../ClassicButton copy";
import Input from "../Input";
import styles from "./style.module.css";
import apiCalls from "../../function/apiCalls";
import { setToken } from "../../function/token";
import userContext from "../../context/userContext";

export default function IntroductionFormPopup({setIsPopup}){

  const {setUser} = useContext(userContext)
  const [isEmail,setIsEmail] = useState(false)
  
  async function createUser (e){
    e.preventDefault();
    try {
      const body = {
      fullName:(e.target[0].value),
      phon:    (e.target[1].value),
      city:    (e.target[2].value),
      email:   (e.target[3].value),
      approval:(e.target[4].checked)
      }
      if(body.email){
        const res = await apiCalls("post", "user/creatUser",body)
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem("Token", res.token);
        setIsPopup(false)
      }
      else{
        console.log("no email");
      }
    } catch (error) {
      console.log(error);
    }

  }
return(
  <>
    <div className={styles.container} onClick={()=>(setIsPopup(false))}>
      <form onSubmit={createUser}>
        <div className={styles.popup} onClick={(event)=>{event.stopPropagation()}}>
          <div className={styles.title}><b>איזה כיף שבאת!</b>
            <br /> <span className={styles.secondTitle}>נשמח להכיר ולעדכן על אירועים שלא בא לך לפספס!</span></div>
          <Input id="fullName" type="text"  name="fullName" placeholder="השם שלך" noLabelAndError={true}/>
          <Input id="phone"    type="tel"   name="phone" placeholder="הטלפון שלך" noLabelAndError={true}/>
          <Input id="city"     type="text"  name="city" placeholder="היישוב שלך"  noLabelAndError={true}/>
          <Input id="email"    type="email" name="email" placeholder="המייל שלך"  noLabelAndError={true} onChange={(e)=>(setIsEmail(e.target.value!==""&&e.target.checkValidity()))}/>
          <label className={styles.containerCheckbox}>
            <input name="checkbox" type="checkbox" defaultChecked="true"/>
            <div className={styles.labelCheckbox}> יאלה, שלחו לי אירועים שיכולים לעניין אותי!</div>
          </label>
          <ClassicButton width="100%" text="הבא" type="submit" disabled={!(isEmail)}/>
        </div>      
      </form>
    </div>
  </>
)


}