
const addWeatherText = (e) => {
    e.preventDefault();
    const location = search.value;
    const locationmsg = document.querySelector('#locationPara');
    const foreCastmsgToday = document.querySelector('#foreCastPara');
    const foreCastmsgTom = document.querySelector('#foreCastPara2');
    locationmsg.textContent = 'Loading....';
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            locationmsg.textContent = data.error
        } else {
            locationmsg.textContent = data.location;
            foreCastmsgToday.textContent = data.foreCast[0];
            foreCastmsgTom.textContent = data.foreCast[1];
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

