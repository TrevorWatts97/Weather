const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`

    fetch(geoApiUrl)
    .then(res => res.json())
    .then(data => {
        var location = `${data.locality}, ${data.principalSubdivision}`

        //This get the weather for the users location
        $.getJSON("https://api.weatherapi.com/v1/forecast.json?key=40ed3d1f1ead4a81b6d124237223006&q=Columbia&days=7&aqi=no&alerts=yes"+ location +"&aqi=no", 
        function(data){
            //Current Weather
            var currentTime = new Date().getHours();
            console.log(data);
            var icon = "https:" + data.current.condition.icon;
            var temp = "" + Math.round(data.current.temp_f) + "<span>&#176;</span>";
            var weather = data.current.condition.text;
            $(".icon").attr("src", icon);
            $(".location").append(location);
            $(".weather").append(weather);
            $(".temp").append(temp);

            //Sunset and sunrise (Optional use)
            var sunriseIcon ="https://cdn.iconscout.com/icon/free/png-256/sunset-36-161352.png";
            var sunriseTime = data.forecast.forecastday[0].astro.sunrise;
            var sunsetTime = data.forecast.forecastday[0].astro.sunrise.sunset;


            //Todays temperature range
            var maxTemp = Math.round(data.forecast.forecastday[0].day.maxtemp_f);
            var minTemp = Math.round(data.forecast.forecastday[0].day.mintemp_f);
            $(".tempRange").append(`${minTemp}&#176; ~ ${maxTemp}&#176;`);

            //One hour
            var time = currentTime + 1;
            var timing = getTime(time);
            var day = getDay(time);
            icon = "https:" + day.hour[time].condition.icon;
            temp = "" + Math.round(day.hour[time].temp_f) + "&#176;";
            weather = day.hour[time].condition.text;
            $(".oneHourIcon").attr("src", icon);
            $(".oneHourTime").append(timing);
            $(".oneHourWeather").append(weather);
            $(".oneHourTemp").append(temp);

            //two hours
            time = currentTime + 2;
            timing = getTime(time);
            day = getDay(time);
            icon = "https:" + day.hour[time].condition.icon;
            temp = "" + Math.round(day.hour[time].temp_f) + "&#176;";
            weather = day.hour[time].condition.text;
            $(".twoHourIcon").attr("src", icon);
            $(".twoHourTime").append(timing);
            $(".twoHourWeather").append(weather);
            $(".twoHourTemp").append(temp);

            //three hours
            time = currentTime + 3;
            timing = getTime(time);
            day = getDay(time);
            icon = "https:" + day.hour[time].condition.icon;
            temp = "" + Math.round(day.hour[time].temp_f) + "&#176;";
            weather = day.hour[time].condition.text;
            $(".threeHourIcon").attr("src", icon);
            $(".threeHourTime").append(timing);
            $(".threeHourWeather").append(weather);
            $(".threeHourTemp").append(temp);

            //four hours
            time = currentTime + 4;
            timing = getTime(time);
            day = getDay(time);
            icon = "https:" + day.hour[time].condition.icon;
            temp = "" + Math.round(day.hour[time].temp_f) + "&#176;";
            weather = day.hour[time].condition.text;
            $(".fourHourIcon").attr("src", icon);
            $(".fourHourTime").append(timing);
            $(".fourHourWeather").append(weather);
            $(".fourHourTemp").append(temp);

            //five hours
            time = currentTime + 5;
            if(time > 23){time-=24}
            timing = getTime(time);
            day = getDay(time);
            icon = "https:" + day.hour[time].condition.icon;
            temp = "" + Math.round(day.hour[time].temp_f) + "&#176;";
            weather = day.hour[time].condition.text;
            $(".fiveHourIcon").attr("src", icon);
            $(".fiveHourTime").append(timing);
            $(".fiveHourWeather").append(weather);
            $(".fiveHourTemp").append(temp);

            function getTime(time){
                if (time > 0 && time <= 12) {
                    timeValue= "" + time;
                } else if (time > 12) {
                    timeValue= "" + (time - 12);
                } else if (time == 0) {
                    timeValue= "12";
                }
                timeValue += (time >= 12) ? " pm" : " am";
                return timeValue;
            }

            function getDay(time){
                if(time < 24){
                    return data.forecast.forecastday[0];
                } else {
                    return data.forecast.forecastday[1];
                }
            }
        });
    })
}

const error = () => {
    $(".weather").append('Unable to retrieve your location');
}

navigator.geolocation.getCurrentPosition(success, error);