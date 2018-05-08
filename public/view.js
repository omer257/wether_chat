
import { $display } from './main.js'
import { weatherData } from './main.js'

class View {
    constructor() {}
    renderView() {
        $display.empty();
        weatherData.getFromLocalStorage();
        for (var i = 0; i < weatherData.weatherResult.length; i++) {
            var template = Handlebars.compile($('#template').html())
            var newHTML = template(weatherData.weatherResult[i]);
            $('.display').append(newHTML);
        }
    }
}
export { View }