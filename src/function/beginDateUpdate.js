export default function beginDateUpdate (date ,timeString){
    const dateArray = date.toString().split(' ')
    dateArray[4] = timeString+':00'
    const dateUpdate = new Date(dateArray.join(' '))
    return dateUpdate
}