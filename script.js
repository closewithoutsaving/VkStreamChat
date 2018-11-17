var request = require('request');

var msgId;
let rab = -1;

let access_token = 
  '3e6957a74aaf470304e1da4cd7d4531b1b360419d3fbb6e9a5b27b6125a7d68075b807c13215af7b2897f';

let firstRequestComment = 
  'https://api.vk.com/method/video.getComments?owner_id=515875530&video_id=456239019&count=1&access_token=' + 
  access_token + '&v=5.87';

function getFirstComment() {
  request.post(
    firstRequestComment,
    { json: { key: 'value' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
          msgId = body.response.items[0].id;
          msgId = msgId + 1;

          let comment = body.response.items[0].text;

          var m = new SpeechSynthesisUtterance(comment);
          window.speechSynthesis.speak(m);
        }
    }
  );
}

getFirstComment();

function getComments() {
  let requestComments = 
  'https://api.vk.com/method/video.getComments?owner_id=515875530&video_id=456239018&count=1&start_comment_id=' + msgId + '&access_token=' + access_token + '&v=5.87';

  request.post(
    requestComments,
    { json: { key: 'value' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
          msgId = body.response.items[0].id;
          console.log('msgId ' + msgId);
          console.log('rab ' + rab);
          
          msgId = msgId + 1;

          if (msgId == rab) {
            return;
          }

          rab = msgId;

          let comment = body.response.items[0].text;

          var m = new SpeechSynthesisUtterance(comment);
          window.speechSynthesis.speak(m);
        }
    }
  );
}

setInterval(getComments, 2000);