console.log('Client side javascript is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => console.log(data))
})

fetch('http://localhost:3000/weather?address=!').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.foreCast)
        }
    })
})

const addWeatherText = (e) => {
    e.preventDefault()
    const location = search.value
    const locationmsg = document.querySelector('#locationPara')
    const foreCastmsg = document.querySelector('#foreCastPara')
    locationmsg.textContent = 'Loading....'
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            locationmsg.textContent = data.error
        } else {
            locationmsg.textContent = data.location
            foreCastmsg.textContent = data.foreCast
        }
    })
})
}


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', addWeatherText)
    

document.addEventListener('keypress', (e) => {
    if(e.keyCode === 13) {
        addWeatherText(event)
    }
})

