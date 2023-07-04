import {FiRotateCw} from 'react-icons/fi'

export default function DateDisplay({returnType, values}){

    let personalType="ימים, "
    if(values.personalRepeatType!=="days"){
        personalType="שבועות"
    }

    let finishDate = new Date(values.repeatDateEnd.date);
    const startDate= new Date (values.date);

    finishDate<new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate())?finishDate=finishDate:
    finishDate=new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate())



    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      };
      const formattedDate = finishDate.toLocaleDateString('he-IL', options);

let end= values.repeatTimesEnd+ " פעמים"
if(values.repeatSettingsEnd=="endDate"){
    end="עד " + formattedDate
}

let stringDays="";
const filteredArray = values.daysObjects.filter((obj) => Object.keys(obj).length !== 0);
if(filteredArray.length>0){
    stringDays="ב";
    for(const i of filteredArray){
        stringDays+=i.nameDay+", ";
    }
}
const text= ` כל ${values.repeatTimes} ${personalType} ${stringDays} ${end} `
    
return(

    <div>
        <FiRotateCw/>
        {returnType!="בהתאמה אישית"? returnType: text}
    </div>
)
}
