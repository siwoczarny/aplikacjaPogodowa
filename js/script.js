function showDiv() {
    if (document.getElementById("main").classList = "main")
        document.getElementById("main").classList.toggle("active");
    else
        document.getElementById("main").classList.toggle("active");
};

var apiId = 'a85d2123b5271bca849dc751e64a2b42';
var units = 'metric';
var searchMethod = 'q';

// Funkcja wysylajaca zapytanie o dane pogodowe za pomoca naszego api na podany "url,
function searchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${city}&APPID=${apiId}&units=${units}&lang=pl`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
};

// Funkcja do obrabiania danych zmieniając tło
function init(dataSet) {
    switch (dataSet.weather[0].main) {
        case 'Clouds':
            document.body.style.backgroundImage = "url('images/clouds.jpg')";
            break;

        case 'Clear':
            document.body.style.backgroundImage = "url('images/clear.jpg')";
            break;

        case 'Rain':
            document.body.style.backgroundImage = "url('images/rain.jpg')";
            break;
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = "url('images/mist.jpg')";
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
            break;

        case 'Snow':
            document.body.style.backgroundImage = "url('images/snow.jpg')";
            break;

        default:
            break;
    }

    let weatherType = document.getElementById('weatherType');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let pressureElement = document.getElementById('pressure');

    let weatherIcon = document.getElementById('weatherIcon');
    weatherIcon.src = 'https://openweathermap.org/img/wn/' + dataSet.weather[0].icon + '.png';
    
    let resultsDescription = dataSet.weather[0].description;
    weatherType.innerHTML = resultsDescription.charAt(0).toUpperCase() + resultsDescription.slice(1);

    cityName.innerHTML = dataSet.name;
    temperatureElement.innerHTML = Math.floor(dataSet.main.temp) + '&#176C';
    windSpeedElement.innerHTML = "<img src='icons/wind.png'/>" + Math.floor(dataSet.wind.speed) + ' m/s';
    humidityElement.innerHTML = "<img src='icons/humidity.png'/>" + Math.floor(dataSet.main.humidity) + ' %';
    pressureElement.innerHTML = "<img src='icons/pressure.png'/>" + Math.floor(dataSet.main.pressure) + ' hPa';
    
    console.log(dataSet.weather[0].main);                                     // stan pogody
    console.log(dataSet.main.temp + " " + String.fromCharCode(176) + "C");  // temperatura w stopniach C
    console.log(dataSet);
};

// Reakcja na klikniecie przycisku i pobranie danych(miasta) z inputu oraz uruchomienie funkcji pogodowej z wybranym miastem
document.getElementById('searchBtn').addEventListener('click', () => {
    let city = document.getElementById('city').value;
    searchWeather(city);
    showDiv();
})

//Wyszukanie po kliknięciu enter
document.getElementById('city').addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        let city = document.getElementById('city').value;
        searchWeather(city);
        showDiv();
    }
})