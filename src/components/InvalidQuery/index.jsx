import { useNavigate } from "react-router-dom"
import ClassicButton from '../ClassicButton copy'

export default function InvalidQuery() {

    const navigate = useNavigate()

    function handleClick() {
        navigate('/')
    }

  return (
    <div>
        <img src="https://banner2.cleanpng.com/20180822/rg/kisspng-portable-network-graphics-computer-icons-error-ima-soylent-red-error-7-icon-free-soylent-red-error-5b7d3124044210.2536301815349312360175.jpg" alt="" />
        <span>שגיאה ! משהו השתבש קוד (400)</span>
        <ClassicButton text={'חזור לדף הבית'} func={handleClick} />
    </div>
  )
}
