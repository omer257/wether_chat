import { weatherData } from './main.js'
var dataId = 'Weather';

class Data {
    constructor() {
        this.weatherResult = this.getFromLocalStorage();
    }
    renderWeatherData(data, $serchData) {
        let cityName = $serchData.toUpperCase();
        let currentTemp = data.query.results.channel.item.condition.temp
        let weatherDiscription = data.query.results.channel.item.condition.text
        return dataObj = {
            cityName: cityName,
            currentTemp: currentTemp,
            weatherDiscription: weatherDiscription
        }
    }
    removePost($clickedPost, index) {
        this.weatherResult.splice(index, 1);
        $clickedPost.remove();
    };
    createComment(text, weatherIndex) {
        let comment = { text: text };
        this.weatherResult[weatherIndex].weatherComments.push(comment);
    };
    saveToLocalStorage() {
        localStorage.setItem(dataId, JSON.stringify(weatherData.weatherResult));
    }
    getFromLocalStorage() {
        return JSON.parse(localStorage.getItem(dataId) || '[]');
    }
}
class Api {
    constructor(url) {
        this.url = url
    }
    fetch($serchData) {
        var city = $serchData;
        var searchtext = "select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='" +
            city + "') and u='c'"
        return $.ajax({
            method: "GET",
            url: this.url + searchtext + "&format=json"
        })
    }
}
export { Api }
export { Data }
