import { text } from "../services/language"

// natural language full date
const getNLActualDate = () => {
    const date = new Date()
    let fulldate = date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    })
    let time = date.toTimeString()

    return `${ text['todayIs'] } ${fulldate} : ${time}\n`
}

export { getNLActualDate }