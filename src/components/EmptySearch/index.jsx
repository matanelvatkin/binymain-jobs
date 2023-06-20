import translaiton from "./translaiton"
import style from "./style.module.css"
import ClassicButton from "../ClassicButton copy"
import { useNavigate } from "react-router-dom"

export default function EmptySearch() {

    const navigate = useNavigate()

    function handleClick() {
        navigate('/searchEvent')
    }

  return (
    <div className= {style.container} dir="rtl">
        <img src={"/Group33596.png"} alt="" className= {style.img}/>
        <span className= {style.weCouldentFindWhatYouSearched} > {translaiton.weCouldentFindWhatYouSearched}</span>
        <span className= {style.tryAgain} > {translaiton.tryAgain}</span>
        {/* <ClassicButton text={translaiton.tryAgain} width={260} func={handleClick} /> */}
    </div>
  )
}
