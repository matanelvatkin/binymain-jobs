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
    <div>
        <img src={"../../../public/Group33596.png"} alt="" />
        <span>{translaiton.weCouldentFindWhatYouSearched}</span>
        <ClassicButton text={translaiton.tryAgain} width={260} func={handleClick} />
    </div>
  )
}
