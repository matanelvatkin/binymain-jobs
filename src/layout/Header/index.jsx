import { useContext } from "react"
import HeaderHome from "../../components/HeaderHome"
import SecondHeader from "../../components/SecondHeader"
import headerContext from "../../context/headerContext"
import styles from "./style.module.css"


function Header() {
const {header} = useContext(headerContext)
  return (
    <header className={styles.header}>
      {header==="home"?<HeaderHome/>
      :header===""?null
      :<SecondHeader text={header}/>}
    </header>
  )
}

export default Header