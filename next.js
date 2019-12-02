const get = require('request-promise-native');
const moment = require('moment');

const origin = process.argv[2];
const destinations = process.argv.slice(3);

return Promise.all(destinations.map((dst) => get(`https://www3.septa.org/hackathon/NextToArrive/${encodeURIComponent(origin)}/${encodeURIComponent(dst)}`)))
.then((responses) => {
	const timeFormat = "h:mA";
	console.log(responses.map(rsp => JSON.parse(rsp)).flat().sort((a, b) => {
		return moment(a.orig_arrival_time.trim(), timeFormat).valueOf() - moment(b.orig_arrival_time.trim(), timeFormat).valueOf();
	}));	
});

