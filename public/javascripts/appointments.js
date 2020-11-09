// JavaScript Document
var access_key = '8e6dd728f8af508589491d63d16ada7e';
var locale;
$.ajax({
    url: 'https://api.ipstack.com/check?access_key=' + access_key,   
    dataType: 'jsonp',
    success: function(json) {
		locale = json.country_code

    }
});

var appointments = [
  [1, '2020-12-09T03:05:00+0000', 2599,2599,2599],
  [2, '2020-12-09T03:05:00+0000', 2599,2599,2599],
  [3, '2020-12-09T03:05:00+0000', 2599,2599,2599],
  [4, '2020-12-09T03:15:00+0000', 4499,4499,4499],
  [5, '2020-12-09T03:15:00+0000', 4499,4499,4499],
  [6, '2020-12-09T03:15:00+0000', 4499,4499,4499],
  [7, '2020-12-09T03:15:00+0000', 4499,4499,4499],
  [8, '2020-12-09T03:20:00+0000', 4499,4499,4499],
  [9, '2020-12-09T03:20:00+0000', 4499,4499,4499],
  [10, '2020-12-09T03:20:00+0000', 4499,4499,4499],
  [11, '2020-12-09T03:20:00+0000', 4499,4499,4499],
  [12, '2020-12-09T03:20:00+0000', 4499,4499,4499],
  [13, '2020-12-09T03:20:00+0000', 4499,4499,4499],
  [14, '2020-12-09T03:20:00+0000', 4499,4499,4499]
];


function dayOfMonth(date){
	var priceIndex = 2;
	if (locale == "GB"){
		priceIndex = 2;
	}
	else if (locale == "IE"){
		priceIndex = 3;
	}
	
	var lowestPrice = 8000000;
	for(var i = 0; i < appointments.length; i++){
		if(lowestPrice > appointments[i][priceIndex]){
			lowestPrice =  appointments[i][priceIndex];
		}
		var dateToCheck = new Date(appointments[i][1]);
		if (dateToCheck.getDate() == date.getDate()){
			switch(locale) {
			  case 'IE':
				return ('€' + lowestPrice/100);
				break;
			  case 'GB':
				return ('£' + lowestPrice/100);
				break;
			  default:
				return ('US $' + lowestPrice/100);
			}
		}
	}
	return false;
}

function hoursByDay(date){ //returns an array of available hours 
	let hours = [];
	let dates = [];
	for(var i = 0; i < appointments.length; i++){
		var dateToCheck = new Date(appointments[i][1]);
		if (dateToCheck.getDate() == date.getDate()){
			if(hours.indexOf(dateToCheck.getHours()) === -1) {
				hours.push(dateToCheck.getHours());
				dates.push(dateToCheck);
			}
		}
	}
	if(dates.length!=0){
		return dates;
	}
	else{
		return false;
	}
}

function timesForHours(date){ //returs a date object for the available times in this hour
	let times = [];
	let dates = [];
	for(var i = 0; i < appointments.length; i++){
		var dateToCheck = new Date(appointments[i][1]);
		if (dateToCheck.getHours() == date.getHours()){
			if(times.indexOf(dateToCheck.getMinutes()) === -1) {
				times.push(dateToCheck.getMinutes());
				dates.push(dateToCheck)
			}
		}
	}
	return dates;
}

//date.toLocaleTimeString([], {timeStyle: 'short', hour12: true });
//date.toLocaleTimeString([], {hour: '2-digit'});

console.log(hoursByDay(new Date('2020-12-09T03:20:00+0000')));
console.log(dayOfMonth(new Date('2020-12-09T03:20:00+0000')));
console.log(timesForHours(new Date('2020-12-09T03:20:00+0000')));


