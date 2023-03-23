import { useContext, useState, useEffect } from 'react'
import headerContext from '../../context/headerContext'
import translation from './translation'
import style from './style.module.css'
import ClassicButton from '../../components/ClassicButton copy'
import RoundButton from '../../components/RoundButton'
import DateInput from '../../components/DateInput'
import { useNavigate } from 'react-router-dom'
import apiCalls from '../../function/apiCalls'
import Loader from '../../components/Loader'

export default function SearchEvent() {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)

    const [categories, setCategories] = useState([])

    const [audiences, setAudiences] = useState([])
     
    async function fetchData(){
        let apiCategories = await apiCalls('get', 2000, '/setting/categories')
        let apiAudiences = await apiCalls('get', 2000, '/setting/audiences')
        
        setCategories(()=> apiCategories[0].settingData.map(v => ({...v, isActive: false})))
        setAudiences(()=> apiAudiences[0].settingData.map(v => ({...v, isActive: false})))
    }

    useEffect(()=>{fetchData()},[])

    useEffect(()=>{
        if(audiences && categories)
            setLoading(() => false)
    },[audiences, categories])

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
        let dbQuery = {$and: []}
        let activeCategories = categories.filter(category => category.isActive)
        let activeAudiences = audiences.filter(audience => audience.isActive)

        if(activeCategories.length >= 2) {
            dbQuery.$and.push({category: {$in: []}}) 
            activeCategories.forEach(category => dbQuery.$and[0].category.$in.push({$elemMatch: {name: category.name}}))
        } else if(activeCategories.length) {
            dbQuery.$and.push({category: {$elemMatch: {name: activeCategories[0].name}}})
        }
    
        if(activeAudiences.length >= 2) {
            dbQuery.$and.push({targetAudience: {$in: []}})
            let audeinceQueryIndex = dbQuery.$and.findIndex(v => Object.keys(v)[0] == 'targetAudience')
            activeAudiences.forEach(audience => dbQuery.$and[audeinceQueryIndex].$in.push({$elemMatch: {name: audience.name}}))
        } else if(activeAudiences.length) {
            dbQuery.$and.push({targetAudience: {$elemMatch: {name: activeAudiences[0].name}}})
        }
    
        let hoursDiffrence = 23 - date.getHours()
        let minutesDiffrence = 59 - date.getMinutes()
        let secondsDiffrence = 59 - date.getSeconds()

        if(btnDates.thisWeek) {
            let today = new Date().getDay()
            if(today === 7) {
                let endDayOfWeek = new Date(date.getTime() + (6 * 24 * 60**2 * 1000) + (hoursDiffrence * 60**2 * 1000) + (minutesDiffrence * 60 * 1000) + (secondsDiffrence * 1000))
                dbQuery.$and.push({date: {$gt: date, $lt: endDayOfWeek}})
            }else if(today === 6) {
                let endOfDay = new Date(date.getTime() + (hoursDiffrence * 60**2 * 1000) + (minutesDiffrence * 60 * 1000) + secondsDiffrence * 1000 ) 
                dbQuery.$and.push({date: {$gt: date, $lt: endOfDay}})
            } else {
                let endDayOfWeek = new Date(date.getTime() + ((6 - today) * 24 * 60**2 * 1000) + (hoursDiffrence * 60**2 * 1000) + (minutesDiffrence * 60 * 1000) + (secondsDiffrence * 1000))
                dbQuery.$and.push({date: {$gt: date, $lt: endDayOfWeek}})
            }

        } else {
            let endOfDay = new Date(date.getTime() + (hoursDiffrence * 60**2 * 1000) + (minutesDiffrence * 60 * 1000) + secondsDiffrence * 1000 ) 
            dbQuery.$and.push({date: {$gt: date, $lt: endOfDay}})
        }

        let query = JSON.stringify(dbQuery)
        const encodedQueryString = encodeURIComponent(query);

        navigate(`/searchEvent/result/${encodedQueryString}`)
    }

    function useBackBtn() {
        navigate(-1)
    }

  return (
    <div>
        <div className={style.content}>
            <div className={style.section}>
                <span className={style.title}>{translation.category}</span>
                <div className={style.categories}>
                    {
                        !loading ?
                        categories.map((category, i) => <RoundButton text={translation[category.name]} icon={category.icon} func={clickCategory} id={i} isActive={category.isActive} />) :
                        <Loader />
                    }
                </div>
            </div>

            <div className={style.section}>
                <span className={style.title}>{translation.audience}</span>
                <div className={style.audiences}>
                    {
                        !loading ? 
                        audiences.map((audience, i) => <RoundButton text={translation[audience.name]} icon={audience.icon} id={i} func={clickAudience} isActive={audience.isActive} />) :
                        <Loader />cd
                    }
                </div>
            </div>

            <div className={style.section}>
                <span className={style.title}>{translation.location}</span>
            </div>

            <div className={style.section}>
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
