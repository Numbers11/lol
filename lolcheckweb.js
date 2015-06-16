module.exports = CheckAcc

//console.log('web module loaded')
//taken from https://github.com/thelaw44/lolrtmpsclient
var servers = {
    "na":  "https://lq.na2.lol.riotgames.com",
    "euw": "https://lq.euw1.lol.riotgames.com",
    "eun": "https://lq.eun1.lol.riotgames.com",
    "kr":  "https://lq.kr.lol.riotgames.com",
    "br":  "https://lq.br.lol.riotgames.com",
    "tr":  "https://lq.tr.lol.riotgames.com",
    "ru":  "https://lq.ru.lol.riotgames.com",
    "lan": "https://lq.la1.lol.riotgames.com",
    "las": "https://lq.la2.lol.riotgames.com",
    "oce": "https://lq.oc1.lol.riotgames.com",
    "pbe": "https://lq.pbe1.lol.riotgames.com",
    "sg":  "https://lq.lol.garenanow.com",
    "tw":  "https://loginqueuetw.lol.garenanow.com",
    "th":  "https://lqth.lol.garenanow.com",
   	"ph":  "https://lqph.lol.garenanow.com",
    "vn":  "https://lqvn.lol.garenanow.com",
}
var request = require('request')
function CheckAcc(username, pass, server, cb) {	
	request({
	    url: servers[server] + '/login-queue/rest/queues/lol/authenticate', 
	    method: 'POST',
	    headers: {
    		'User-Agent': 'Mozilla/5.0 (Windows; U; en-US) AppleWebKit/533.19.4 (KHTML, like Gecko) AdobeAIR/3.7',
			'Referer': 'app:/LolClient.swf/[[DYNAMIC]]/9',
			'Accept': 'text/xml, application/xml, application/xhtml+xml, text/html;q=0.9, text/plain;q=0.8, text/css, image/png, image/jpeg, image/gif;q=0.8, application/x-shockwave-flash, video/mp4;q=0.9, flv-application/octet-stream;q=0.8, video/x-flv;q=0.7, audio/mp4, application/futuresplash, */*;q=0.5',
	        'Content-Type': 'application/x-www-form-urlencoded'
	    },
	    body: 'payload=user=' + username + ',password=' + pass //Set the body as a string
	}, function(error, response, body){
	    if(error) {
      		cb(false, "error")
//			  console.log(error)
	    } else {
//		console.log(body)
		//console.log(username + ' - ' + pass + ' + ' + response.statusCode + ' + ' + (body.indexOf("attempt_rate_too_fast") != -1))
	        //console.log(response.statusCode, body)
			if (response.statusCode == 200) {
      			cb(true, "ok")
			} else if (body.indexOf("attempt_rate_too_fast") != -1) {
      			cb(false, "timeout")
			} else {
				cb(false, "wrong")
			}
	    }
	})
}