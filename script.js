const API_KEY = "4916070f27cf59f46a3ff173ee63e5a4";

const searchBtn = document.getElementById("searchBtn");

const cityInput = document.getElementById("cityInput");


// Search Button Event

searchBtn.addEventListener("click", () => {

    let city = cityInput.value.trim();


    if(city === ""){
        alert("Please enter city name");
        return;
    }


    getWeather(city);

});





// Fetch Weather Data

async function getWeather(city){


    try{


        searchBtn.innerText = "Loading...";


        const url = 
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;



        const response = await fetch(url);



        if(!response.ok){

            throw new Error("City not found");

        }



        const data = await response.json();



        displayWeather(data);


        getForecast(city);



    }


    catch(error){


        alert(error.message);


    }


    finally{

        searchBtn.innerText = "🔍 Search";

    }


}







// Display Current Weather


function displayWeather(data){



    document.getElementById("cityName").innerText =
    data.name;



    document.getElementById("temperature").innerText =
    Math.round(data.main.temp) + " °C";



    document.getElementById("condition").innerText =
    data.weather[0].description;



    document.getElementById("humidity").innerText =
    data.main.humidity;



    document.getElementById("wind").innerText =
    data.wind.speed;



    document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;



    showPacking(data);



}








// Packing Suggestion Logic


function showPacking(data){


    let list = document.getElementById("packingList");


    list.innerHTML = "";



    let temp = data.main.temp;

    let condition = data.weather[0].main;

    let humidity = data.main.humidity;



    let suggestions=[];



    if(
        condition==="Rain" ||
        condition==="Drizzle" ||
        condition==="Thunderstorm"
    ){

        suggestions.push("☔ Pack an umbrella");

    }



    if(temp < 10){

        suggestions.push("🧥 Heavy coat");

        suggestions.push("🧤 Gloves");

    }



    if(temp > 30){

        suggestions.push("🩳 Light clothing");

        suggestions.push("🧴 Sunscreen");

    }



    if(humidity > 70){

        suggestions.push("👕 Breathable fabrics recommended");

    }



    if(condition==="Snow"){

        suggestions.push("🥾 Waterproof boots");

    }




    if(suggestions.length===0){

        suggestions.push("😎 Weather looks comfortable");

    }




    suggestions.forEach(item=>{


        let li=document.createElement("li");

        li.innerText=item;

        list.appendChild(li);


    });



}







// Forecast API


async function getForecast(city){


    const url =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;



    const response = await fetch(url);


    const data = await response.json();



    displayForecast(data);



}







// Display 3 Day Forecast


function displayForecast(data){


    const container =
    document.getElementById("forecastContainer");


    container.innerHTML="";



    let forecastList=data.list;



    for(let i=0;i<3;i++){


        let item=forecastList[i*8];



        let card=document.createElement("div");


        card.className="forecast-card";



        card.innerHTML=`

            <h3>
            Day ${i+1}
            </h3>


            <img src="
            https://openweathermap.org/img/wn/${item.weather[0].icon}.png">


            <h3>
            ${Math.round(item.main.temp)} °C
            </h3>


            <p>
            ${item.weather[0].description}
            </p>


            `;



        container.appendChild(card);


    }


}
