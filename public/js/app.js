const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'
weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const url = '/weather?address='+location
    fetch(url).then((response) => {
        response.json().then(({location, forecast, rainChance, temp, minTemp, maxTemp, error = undefined} = {}) => {
            if(error){
                messageOne.textContent = ''
                messageTwo.textContent = error
            } else{
                messageOne.textContent = location
                messageTwo.textContent= forecast+' Temperature is '+temp+' degree and the chances of rain is '+rainChance+'. The minimum temperature for the day is '+minTemp+' degree and the maximum temperature is '+maxTemp+' degree.'
            }
        })
    })
    
})