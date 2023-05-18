export default function beginDateUpdate (date ,timeString){
    if(timeString){        
    const dateArray = date.toString().split(' ')
    // console.log(dateArray,"no undefiled");
    dateArray[4] = timeString+':00'
    const dateUpdate = new Date(dateArray.join(' '))
    return dateUpdate}
    return date
}