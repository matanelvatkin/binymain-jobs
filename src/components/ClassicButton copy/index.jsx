import React from 'react'
import styles from "./style.module.css";


// creator: Yisrael Olonoff
// when using my button component you decide the context by
// using my props: type={}, width={}, func={}, {props}.
// to add text in your button use the text prop, example: 
// <Button type={'submit'} width={'200px'} text={'Click'}></Button>


function ClassicButton({ text, type, width, func, ...props }) {
    return (
        <>
            <button
                type={type}
                style={{ width: width }}
                onClick={func} 
                className={styles.button} 
                {...props}
                >
                {text} 
            </button>
        </>
    )
}

export default ClassicButton