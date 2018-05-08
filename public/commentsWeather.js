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

///////////////////////////////

class Weather {
    constructor(data, $serchData) {
        this.cityName = $serchData.toUpperCase();
        this.currentTemp = data.query.results.channel.item.condition.temp
        this.weatherDiscription = data.query.results.channel.item.condition.text
        this.weatherComments = [];
    }
}
class Comment {
    constructor(comment) {
        this.comment = comment;
    }
}
export { Weather }
export { Comment }