//NOT FULLY FUNCTIONAL YET, NO RESPONSE FOR FLOOD PROTECT

module.exports = CheckAcc
//console.log('chat module loaded')
var xmpp = require('node-xmpp')
function CheckAcc(username, pass, server, cb) {	
	var client = new xmpp.Client({
	    jid: username + '@pvp.net',
	    password: 'AIR_' + pass,
	    host: 'chat.'+ server + '1.lol.riotgames.com',
	    port: '5223',
	    legacySSL: true	    
	})

	client.on('online', function() {
		//console.log('online')   v---- get friends list
/*	var roster = new xmpp.Element('iq', {
	    id: 'roster_0',
	    type: 'get'
	  }).c('query', {
	    xmlns: 'jabber:iq:roster'
	  })
	  client.send(roster)*/
		client.end()
	  	cb(true)	  	
	});
	
	client.on('stanza', function(stanza) {
	    console.log('Incoming stanza: ', stanza.toString())
	});
	
	client.on('error', function(e) {
	   // console.log('Error! ',  e)
		client.end()
		cb(false)
	})	
}