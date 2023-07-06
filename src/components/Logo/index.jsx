import { BiAnalyse } from "react-icons/bi";
import styles from "./style.module.css";
export default function Logo() {
  return (
    <div>
      <div>
        <div className={styles.titleBox}>
          <div className={styles.upperTitleBox}>
            <span className={styles.title}> HereEvent </span>
            <BiAnalyse className={styles.logo} />
          </div>
          <span className={styles.secondTitle}>כיף לצאת בבנימין</span>{" "}
        </div>
      </div>
    </div>
  );
}
