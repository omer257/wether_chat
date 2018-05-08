
// var addComment = function(myPost, comm){
//     // $('.comments').empty();
//     var comments = [];
//     var comment = {
//         text: comm
//     }
//     comments.push(comment)
//     for (let i=0; i<comments.length; i++){
//         myPost.append(comments[i].text+'<br>')
//     }
// }

// export {addComment}

/////////////////////////////////

import { Data } from './data.js'
import { Api } from './data.js'
import { View } from './view.js'
import { Weather } from './commentsWeather.js'
import { Comment } from './commentsWeather.js'
let $display = $('.display');
export { $display }
let weatherApi = new Api("https://query.yahooapis.com/v1/public/yql?q=")
let weatherData = new Data()
let view = new View();

weatherData.getFromLocalStorage();
view.renderView();

$('form').submit(function(ev) {
    ev.preventDefault();

});

$(".userInput").on('keyup', function(event) {
    if (event.keyCode == 13) {
        $(".searchWeather").trigger('click');
    } else {
        event.preventDefault();
        return false;
    }
});

$('.searchWeather').on('click', function() {
    var $serchData = $('.userInput').val();
    weatherApi.fetch($serchData).then(function(data) {
        let cityWeather = new Weather(data, $serchData)
        weatherData.weatherResult.push(cityWeather)
        weatherData.saveToLocalStorage();
        view.renderView();
    }).catch(function() {
        $('body').css('background-image', 'url(https://images.unsplash.com/photo-1506631610770-2e3eeae401b4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c5dc54d8183138e4763a3e4a19b5dd6c&auto=format&fit=crop&w=1502&q=80)');
        alert('enter a vald city name')
    })
    $('.userInput').val("");

    weatherData.saveToLocalStorage();
    view.renderView();
});

export { weatherData }

$('.display').on('click', '.commentBtn', function() {
    var text = $(this).siblings('.commentInput').val();
    var weatherIndex = $(this).closest('.weatherDisplay').index();
    weatherData.createComment(text, weatherIndex);
    weatherData.saveToLocalStorage();
    view.renderView();
});

$('.display').on('click', '.removeResult', function() {
    var $clickedPost = $(this).closest('.weatherDisplay');
    var index = $clickedPost.index();

    weatherData.removePost($clickedPost, index);
    weatherData.saveToLocalStorage()
    view.renderView();
});
view.renderView();