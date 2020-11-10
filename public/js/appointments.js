// START newsletter signup forms
var niceListInput = document.getElementById('niceListInput');
var niceListButton = document.getElementById('niceListButton');
niceListInput.onchange = function(e) {
  var inputVal = e.target.value;
  if (inputVal && inputVal.includes('@') && inputVal.includes('.')) {
    niceListButton.disabled = false;
  }
}

/*
when signing up for newsletter - post an object 

  { 
    type: 'newsletter', 
    value: 'jimmytucker0@gmail.com'
  }

to /api/web/
*/
niceListButton.onclick = function(e) {
  e.preventDefault()
  var inputVal = niceListInput.value;
  if (!niceListButton.disabled && inputVal && inputVal.includes('@') && inputVal.includes('.')) {
    fetch("/api/web/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ type: 'newsletter', value: inputVal})
    })
    .then(function(result) {
      niceListInput.disabled = true;
      niceListButton.innerHTML = "Check your email for Confirmation!"
    })
  }
}

var getDiscountCodeInput = document.getElementById('getDiscountCodeInput');
var getDiscountCodeButton = document.getElementById('getDiscountCodeButton');
getDiscountCodeInput.onchange = function(e) {
  var inputVal = e.target.value;
  if (inputVal && inputVal.includes('@') && inputVal.includes('.')) {
    getDiscountCodeButton.disabled = false;
  }
}
getDiscountCodeButton.onclick = function(e) {
  e.preventDefault()
  var inputVal = getDiscountCodeInput.value;
  if (!getDiscountCodeButton.disabled && inputVal && inputVal.includes('@') && inputVal.includes('.')) {
    fetch("/api/web/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ type: 'newsletter', value: inputVal})
    })
    .then(function(result) {
      getDiscountCodeInput.disabled = true;
      getDiscountCodeButton.innerHTML = "Check your email for Confirmation!"
    })
  }
}
// END newsletter signup forms

// FORM OBJECT
var _formData = {
  selectedSlotDateTime: null,
  selectedSlotID: null,
  selectedSlotPriceEUR: null,
  selectedSlotPriceGBP: null,
  selectedSlotPriceUS: null,
  form: {
    firstName: '',
    lastName: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    agreeTOS: false,
    passenger1: {
      name: '',
      age: '',
      gender: '',
      niceList: '',
      letterToSanta: '',
      additionalDetails: '',
      consentAuthorized: false
    },
    passenger2: {
      name: '',
      age: '',
      gender: '',
      niceList: '',
      letterToSanta: '',
      additionalDetails: '',
      consentAuthorized: false
    },
  },
}

var access_key = '8e6dd728f8af508589491d63d16ada7e';
var locale;
var priceIndex = 2;
var currencyString = 'US $';

// helpers for rendering calendar correctly
Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

String.prototype.splice = function(idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

// helper for calendar css class
function determinePriceRange(price) {
  // compare price to medium range, for underlines in calendar
  var mediumMin = 2600;
  var mediumMax = 2600;
  if (price < mediumMin) return 'min';
  if (price > mediumMax) return 'max';
  return 'med'
}

// set local price symbol and index
$.ajax({
    url: 'https://api.ipstack.com/check?access_key=' + access_key,   
    dataType: 'jsonp',
    success: function(json) {
      locale = json.country_code;
      if (locale == "GB"){
        priceIndex = 2;
        currencyString = '£';
      }
      else if (locale == "IE"){
        priceIndex = 3;
        currencyString = '€';
      }
    }
});

var appointments = [
  [1, '2020-12-09T03:00:00+0000', 2599,2599,2599],
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
  [14, '2020-12-09T03:20:00+0000', 4499,4499,4499],
  [15, '2020-12-09T04:00:00+0000', 4499,4499,4499],
  [16, '2020-12-09T04:05:00+0000', 4499,4499,4499],
  [17, '2020-12-09T05:00:00+0000', 4499,4499,4499],
  [18, '2020-12-11T05:00:00+0000', 4499,4499,4499],
  [19, '2020-12-14T05:00:00+0000', 4499,4499,4499],
];


function dayOfMonth(date){	
	var lowestPrice = 8000000;
	for(var i = 0; i < appointments.length; i++){
		if(lowestPrice > appointments[i][priceIndex]){
			lowestPrice =  appointments[i][priceIndex];
		}
		var dateToCheck = new Date(appointments[i][1]);
		if (dateToCheck.getDate() == date.getDate()){
      // return (currencyString + lowestPrice/100);
      return determinePriceRange(lowestPrice)
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
				dates.push([ dateToCheck, appointments[i]]);
			}
		}
	}
	if(dates.length!=0){
    return dates;
    // return hours;
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
				dates.push(appointments[i])
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


var timeblockList = document.getElementById('timeblocklist');
var hoursListContainer = document.querySelector('.calendersecrip');

function populateHoursList(dayDateString) {
  var hoursList = hoursByDay(new Date(dayDateString));
  hoursListContainer.classList.remove('calendersecrip--hidden')
  timeblockList.innerHTML = '';
  
  hoursList.forEach(function(hourAndAppt) {
    let thisHour = hourAndAppt[0];
    var cloneDate = new Date(thisHour);
    var availableHourString = cloneDate.toLocaleTimeString([], {timeStyle: 'short', hour12: true }) + " - " + thisHour.addHours(1).toLocaleTimeString([], {timeStyle: 'short', hour12: true });
    // create a new div element 
    var newli = document.createElement("li");
    var newtimeblock = document.createElement("div");
    newtimeblock.classList.add('timeblock');
    var newboxtiming = document.createElement("div");
    newboxtiming.classList.add('boxtiming');
    var newtimeavailable = document.createElement("div"); 
    newtimeavailable.classList.add('timeavailable');
    var newtimeprice = document.createElement("div");
    newtimeprice.classList.add('timeprice');
    newli.appendChild(newtimeblock)
    newtimeblock.appendChild(newboxtiming) 
    newtimeblock.appendChild(newtimeavailable)
    newtimeblock.appendChild(newtimeprice)
    newboxtiming.innerHTML = availableHourString;
    newtimeavailable.innerHTML = "3 Departures available";
  
    let currencyString = hourAndAppt[1][3].toString();
    currencyString = currencyString.splice(currencyString.length - 2, 0, '.')
    newtimeprice.innerHTML = "£" + currencyString;
  
    newli.dataset.hour = cloneDate.toUTCString();
    newli.onclick = function() {
      // populate timeslot inputs and make section visible
      let timesArray = timesForHours(new Date(newli.dataset.hour));
      Array.from(timeblockList.querySelectorAll('li')).forEach(function(thisLI) {
        thisLI.classList.remove('activetime');
      });
      newli.classList.add('activetime');
    }
  
    timeblockList.appendChild(newli)
  })
}

var daysContainer = document.getElementById('daysContainer');
var daysList = Array.from(daysContainer.querySelectorAll('.dateContainer'));
daysList.forEach(function(thisDayNode) {
  if (thisDayNode.id) {
    var thisDayNum = thisDayNode.id.split('dec')[1];
    if (thisDayNum.length === 1) {
      thisDayNum = '0' + thisDayNum;
    }
    thisDayNode.dataset.datestring = '2020-12-' + thisDayNum + 'T03:00:00+0000';
    var priceRange = dayOfMonth(new Date(thisDayNode.dataset.datestring))
    if (priceRange) {
      thisDayNode.classList.add('dateContainer--price-' + priceRange);
      thisDayNode.onclick = function() {
        daysList.forEach(function(dayNode) {
          dayNode.classList.remove('dateContainer--selected');
          populateHoursList(thisDayNode.dataset.datestring);
        });
        thisDayNode.classList.add('dateContainer--selected');
      }
    } else {
      thisDayNode.classList.add('dateContainer--disabled');
    }
  }
})

var currentSelection = {}