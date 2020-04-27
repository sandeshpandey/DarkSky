window.addEventListener("load",()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let temperatureSection = document.querySelector('.degree-section')
    let temperatureSpan = document.querySelector('.temperature span')
    let temp = document.querySelector('.degree')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api =`${proxy}https://api.darksky.net/forecast/05f9235d3641e88e370e6722b829d6e1/${lat},${long}`
            fetch(api).then(response => response.json()).then(data => {
                const {temperature, summary, icon} = data.currently
                //set Dom Elements from the API
                temperatureDegree.textContent = Math.floor(((temperature-32)* 5/9))
                temperatureDescription.textContent = summary
                locationTimezone.textContent = data.timezone
                setIcons(icon, document.querySelector('.icon'))
                
                temperatureSection.addEventListener('click', () =>{
                    if(temperatureSpan.textContent === "C"){
                        temperatureSpan.textContent = "F"
                        temp.textContent = Math.floor(temperature)

                    }else{
                        temperatureSpan.textContent = "C"
                        temp.textContent = Math.floor(((temperature-32)* 5/9))
                    }
                })
            })
        })

    }

    function setIcons (icon, iconId){
        const skycons = new Skycons({"color": "white"});
        let currentIcon = icon.replace(/-/g,'_').toUpperCase()
        skycons.play()
        return skycons.set(iconId, Skycons[currentIcon])
    }
})