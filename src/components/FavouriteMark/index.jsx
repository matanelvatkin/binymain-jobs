import {HiHeart, HiOutlineHeart} from 'react-icons/hi' 
import style from "./style.module.css";
import { useState, useContext } from 'react';
import apiCalls from '../../function/apiCalls';
import userContext from '../../context/userContext';



export default function FavouriteMark(){

    const {user} = useContext(userContext);


    const [clicked, setClickes]= useState(false);

function addFavourite(){
    setClickes(true);
    console.log("context", user._id)
    // apiCalls("put", "addFavou", eventDataId );
}

function removeFavourite(){
    setClickes(false);
    // apiCalls("put", "removeFavou", eventDataId );
}

    return(
        <div>
        {!clicked?
        <span className={style.heart} onClick={addFavourite}><HiOutlineHeart/></span>:
        <span className={style.heartClicked} onClick={removeFavourite}><HiHeart/></span>
        }
        </div>
    )
}