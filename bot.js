const twit = require("twit");
const config = require("./config.js");

const Twitter = new twit(config);

const retweet = function() {
    const params = {
      q: '#weather, #cats',
      result_type: 'recent',
      lang: 'en'    
    }

  Twitter.get('search/tweets', params, function(err, data) {
      if (!err) {
          //TODO write statuses to a file and randomly select
          const retwtId = ranDom(data.statuses).id_str;
          Twitter.post('statuses/retweet/:id', {
              id: retwtId
          }, function(err, response) {
              if (response) {
                  console.log('Retweeted!!!');
              }
              if (err) {
                  console.log(' RETWEETING ERROR... Duplication maybe...');
              }
          });
      }
      // if unable to Search a tweet
      else {
        console.log(' SEARCH ERROR', err);
      }
  });
}

setInterval(retweet, 10000);

const favoriteTweet = function(){
    const params = {
        q: '#cats, #weather',
        result_type: 'recent',
        lang: 'en'
    }

    Twitter.get('search/tweets', params, function(err,data){
      console.log("data: ", data);
      const tweet = data.statuses;
      const randomTweet = ranDom(tweet);
  
      if(typeof randomTweet != 'undefined'){
        Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
          if(err){
            console.log('CANNOT BE FAVORITE... Error', err);
          }
          else{
            console.log('FAVORITED... Success!!!');
          }
        });
      }
    });
  }

  favoriteTweet();
  setInterval(favoriteTweet, 10000);
  
  function ranDom (arr) {
    const index = Math.floor(Math.random()*arr.length);
    return arr[index];
  };