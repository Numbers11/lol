
var chalk = require('chalk')
var argv = require('yargs').argv
var fs = require('fs')
var async = require('async')
var ansi = require('ansi')
  , cursor = ansi(process.stdout)
var i = 0
var total
//console.log('LoL Account Listchecker')

argv.m = argv.m || 'web'
argv.t = argv.t || 10000
argv.p = argv.p || 5
var CheckAcc = require('./lolcheck' + argv.m + '.js')	


if (!argv.i || !argv.o || !argv.s) {
	console.log('Usage: -i <inputfile> -o <outputfile> -s <server> [optional: -m <web/chat>]')
	process.exit(1)
}
if (!fs.existsSync(argv.i) || fs.existsSync(argv.o)) {
	console.log(chalk.red('Error: ') + 'Inputfile doesn\'t exist or outputfile exists')
	console.log()
	console.log('Usage: -i <inputfile> -o <outputfile> -s <server> [optional: -m <web/chat> -t <timeout in ms> -p <parallel requests>]')
	process.exit(1)
}



var accs = fs.readFileSync(argv.i).toString().split("\n")
for(var x in accs) {
    accs[x] = accs[x].replace("\r", "").split("|")
}

total = accs.length
console.log('> Loaded ' + chalk.bold.blue(total) + ' accounts to check on ' + chalk.bold.blue(argv.s))
console.log()
console.time("start");


var q = async.queue(function (item, callback) {
	CheckAcc(item[0], item[1], argv.s, function(res, reason) {
		i++
		if (res) {
			fs.appendFile(argv.o, item.join('|') + '\n', function (err) {
				if (err) throw err
			})
		} else if (reason == "timeout") {
			i--
			//console.log('Too many recent attempts, waiting ...')
			q.push([item], function (err) {
    //console.log('finished processing readded item --' + item[0] + ' - ' + err)
			})
			if (!q.paused) {
				//console.log('paused')
				q.pause()
				setTimeout(function() {
					//console.log('unpaused')
					q.resume()
				}, argv.t)
			}
		}
		DrawProgress()
		callback()
	})
}, argv.p)

q.drain = function() {
	console.log()
    console.log('... done')
	//fs.close(file)
	console.timeEnd("start")
}
q.push(accs)


function DrawProgress() {
	var percent = i / total
	percent = Math.min(Math.max(percent, 0), 1)
	percent = percent * 100
	cursor.horizontalAbsolute(0).eraseLine().write('> ' + i + '/' + total + 
		' (' + percent.toFixed(0) + '%) | Current Status: ' + (q.paused ? chalk.red('Paused') : chalk.green('Running')))	
}