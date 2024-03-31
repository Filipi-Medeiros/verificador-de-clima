//Variáveis e seleção de elementos
const apikey = "28fc4223e26a40dbdae2c799d4c71464";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");
const mensagem = document.querySelector(".erro");
const loading = document.querySelector(".loading");

//Funções
const getWeatherData = async(city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
}

const showWeatherData = async (city) => {
   const data = await getWeatherData(city);

   cityElement.innerText = data.name;
   tempElement.innerText = parseInt(data.main.temp);
   descElement.innerText = data.weather[0].description;
   weatherIconElement.setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
   countryElement.setAttribute("src",`https://flagsapi.com/${data.sys.country}/shiny/64.png`);
   humidityElement.innerText = `${data.main.humidity}%`;
   windElement.innerText = `${data.wind.speed}km/h`
   weatherContainer.classList.remove("hide");
}

//Eventos
searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    
    const city = cityInput.value;
    const data = await getWeatherData(city);

    if(data.name === undefined){
        mensagem.classList.remove("hide")
        
        weatherContainer.classList.add("hide");
        
    }else{
        mensagem.classList.add("hide");
        
        loading.classList.remove("hide");
    
        setTimeout(() => {
            loading.classList.add("hide");
        
            showWeatherData(city);
        
        },800);
    }
});

cityInput.addEventListener("keyup", async (e) => {
    if(e.code === "Enter"){
        
        const city = e.target.value;
        const data = await getWeatherData(city);

        if(data.name === undefined){
            mensagem.classList.remove("hide")
        
            weatherContainer.classList.add("hide");
        
        }else{
            mensagem.classList.add("hide");
        
            loading.classList.remove("hide");
    
            setTimeout(() => {
                loading.classList.add("hide");
        
                showWeatherData(city);
        
            },800);
        }
    }
});