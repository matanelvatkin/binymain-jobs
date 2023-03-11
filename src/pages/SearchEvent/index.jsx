import { useContext, useState, useEffect } from 'react'
import headerContext from '../../context/headerContext'
import translation from './translation'
import style from './style.module.css'
import ClassicButton from '../../components/ClassicButton copy'
import RoundButton from '../../components/RoundButton'
import DateInput from '../../components/DateInput'
import { useNavigate } from 'react-router-dom'

export default function SearchEvent() {

    //mokdata for illustration
    //api call needed

    const [categories, setCategories] = useState([
        {
            name: 'fun',
            icon: 'https://s3-alpha-sig.figma.com/img/4c48/56f6/93038ef985ad0c9f082357568bfaaf83?Expires=1679270400&Signature=fh5-RzlWWUkpgsZft0-Y9X4vORux9U3LvFFLMgXDQ6znN68e3A4ut8rh0519rRRkmMmFXsdWaR4z1Dvnm30~yJGWEVfR8tWbOyZ7IIJ660QTIo1rGDulb6R690xLV8DsZ9TEsBaih3WdTFx9KrBqabRrdt~yxSAtNnlHGUVjE9uLwnqGOElR8TCPAd2nZ60Rgo5cYXnVVcRRFnZhpCBX~PiXqD~jdQEMD1rKdVzQmOz~UyGZKm47aD05Ync6dSH9ODa5fue75k1LNtHqqsxgfdyKHDovnii82l1HLOaGUgCnXZkhp654l0TfmpBAWGhyCeXNiTW9sTbvP85~XNs8Rg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            isActive: false
        }
    ])

    const [audiences, setAudiences] = useState([
        {
            name: 'women',
            icon: 'https://s3-alpha-sig.figma.com/img/5212/9f43/6c8041243a448203f1fd6bb0b39310d2?Expires=1679270400&Signature=d05lWZrnMVDrzvIXU30djv3GDOSjqGt5PrzakylO7dTgkw3DkNDBZAnjM89XKdgf2Ip6Ze~hxyjhuQ2MDXjR2CEXs48s6nGkmM1U8yXYK6K21nyXvna3AMv1D5UrpKBtr5CGjbXLmTFeS4SqU2fgV80AJf8s7ELK0JNh5dBi8716Iobhpt-mcE9cRRpOtLFUGB5YHUkGVsgvyDFmBMia7x2BLFHp0qPOwQHtRlVeaIZ7QIcQbgHGBlNWrVC4p60iA4xApPwh54qTsLDRaJYtQMQxWbIkn2O820fzldS8FgQ2-Jk15AVV3TzRVvYf6at~hvUU~4BkWfC5YG5uLfwzYA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            isActive: false
        }
    ])

    const [location, setLocation] = useState()

    const [date, setDate] = useState(new Date())
    const [btnDates, setBtnDates] = useState({
        today: true,
        tomorrow: false,
        thisWeek: false
    })

    useEffect(()=>{
        if(date.toLocaleDateString() === new Date().toLocaleDateString())
            setBtnDates(prev => {
                let newBtnDates = {...prev}
                Object.keys(prev).forEach(v => newBtnDates[v] = false)
                newBtnDates.today = true
                return newBtnDates
            })
        else if(date.toLocaleDateString() === new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toLocaleDateString())
            setBtnDates(prev => {
                let newBtnDates = {...prev}
                Object.keys(prev).forEach(v => newBtnDates[v] = false)
                newBtnDates.tomorrow = true
                return newBtnDates
            })
    },[date])

    const { setHeader } = useContext(headerContext)
    setHeader(translation.advencedSearch)

    function clickCategory(e) {
        console.log(e.target);
        setCategories(prev =>  prev.map((v,i) => i == e.target.id ? ({...v, isActive: !v.isActive}) : v))
    }

    function clickAudience(e) {
        setAudiences(prev =>  prev.map((v,i) => i == e.target.id ? ({...v, isActive: !v.isActive}) : v))
    }
    
    function handleThisWeekBtn() {
        setBtnDates(prev => {
            let newBtnDates = {...prev}
            Object.keys(prev).forEach(v => newBtnDates[v] = false)
            newBtnDates.thisWeek = true
            return newBtnDates
        })
    }

    function handleTodayTomorrwBtn(e) {
        if(e.target.name === 'today') {
            setDate(() => new Date())
            return
        }

        setDate(() => new Date(new Date().getTime() + (24 * 60 * 60 * 1000)))
    }

    function handleSelectDate(date) {
        setDate(() => date)
        if(btnDates.thisWeek)
            setBtnDates(prev => ({...prev, thisWeek: false}))
    }

    function handleSubmit() {
        let dbFilter = {}
        let activeCategories = categories.filter(category => category.isActive)
        let activeAudiences = audiences.filter(audience => audience.isActive)

        if(activeCategories.length) {
            dbFilter.category = {$in: []}
            activeCategories.forEach(category => dbFilter.category.$in.push({$elemMatch: {name: category.name}}))
        }

        if(activeAudiences.length) {
            dbFilter.targetAudience = {$in: []}
            activeAudiences.forEach(audience => dbFilter.targetAudience.$in.push({$elemMatch: {name: audience.name}}))
        }

        if(btnDates.thisWeek) {

        } else {
            dbFilter.date = date
        }
    }

    function useBackBtn() {
        useNavigate(-1)
    }

  return (
    <div>
        <div className={style.content}>
            <div className={'categories'}>
                <span className={style.title}>{translation.category}</span>
                {
                    categories.map((category, i) => <RoundButton text={translation[category.name]} icon={category.icon} func={clickCategory} id={i} isActive={category.isActive} />)
                }
            </div>

            <div className={'audience'}>
                <span className={style.title}>{translation.audience}</span>
                {
                    audiences.map((audience, i) => <RoundButton text={translation[audience.name]} icon={audience.icon} id={i} func={clickAudience} isActive={audience.isActive} />)
                }
            </div>

            <div className={'location'}>
                <span className={style.title}>{translation.location}</span>
            </div>

            <div className={'date'}>
                <span className={style.title}>{translation.date}</span>
                <div className={style.dateBtnSelection}>
                    <ClassicButton width={100} text={translation.today} isActive={btnDates.today} name='today' func={handleTodayTomorrwBtn} oppositeColor />
                    <ClassicButton width={100} text={translation.tomorrow} isActive={btnDates.tomorrow} name='tomorrow' func={handleTodayTomorrwBtn} oppositeColor />
                    <ClassicButton width={100} text={translation.thisWeek} isActive={btnDates.thisWeek} func={handleThisWeekBtn} oppositeColor />
                </div>
                <DateInput func={handleSelectDate} val={date}/>
            </div>
            
            <div className={style.footerBtn}>
                <ClassicButton width={185} text={translation.search} func={handleSubmit} />
                <ClassicButton width={130} text={translation.back} id={style.back} func={useBackBtn} />
            </div>
        </div>
    </div>
  )
}
