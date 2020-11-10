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
var priceIndex = 4;
var currencyString = '$';

// helpers for rendering calendar correctly
Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

String.prototype.splice = function(idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

function getTimezoneName() {
  const today = new Date();
  const short = today.toLocaleDateString(undefined);
  const full = today.toLocaleDateString(undefined, { timeZoneName: 'short' });

  // Trying to remove date from the string in a locale-agnostic way
  const shortIndex = full.indexOf(short);
  if (shortIndex >= 0) {
    const trimmed = full.substring(0, shortIndex) + full.substring(shortIndex + short.length);
    
    // by this time `trimmed` should be the timezone's name with some punctuation -
    // trim it from both sides
    return trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, '');

  } else {
    // in some magic case when short representation of date is not present in the long one, just return the long one as a fallback, since it should contain the timezone's name
    return full;
  }
}

// TODO: set price range on calendar
// helper for calendar css class
function determinePriceRange(price) {
  // compare price to medium range, for underlines in calendar
  var mediumMin = 2600;
  var mediumMax = 3500;
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
      Array.from(document.querySelectorAll('.localCurrency')).forEach(function(el) {
        el.innerHTML = currencyString;
      })
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
		var dateToCheck = new Date(appointments[i][1]);
		if (dateToCheck.getDate() == date.getDate()){
      if(lowestPrice > appointments[i][priceIndex]){
        lowestPrice =  appointments[i][priceIndex];
      }
		}
  }
  if (lowestPrice < 8000000) {
    return determinePriceRange(lowestPrice)
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
		if (
      dateToCheck.getHours() == date.getHours()
      && dateToCheck.getDate() == date.getDate()
    ){
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
/*
console.log(hoursByDay(new Date('2020-12-09T03:20:00+0000')));
console.log(dayOfMonth(new Date('2020-12-09T03:20:00+0000')));
console.log(timesForHours(new Date('2020-12-09T03:20:00+0000')));
*/
// departure time section
var departureTimeSection = document.getElementById('yoursantaexper');
var departureTimeDate = document.getElementById('santabookdate');
var departureTimeList = document.getElementById('detartrtimelist');
var departureTimePrice = document.getElementById('satatotalprice');
var departureTimeCheckoutButton = document.getElementById('satacheckoutwrp');
var departureTimeTimer = document.getElementById('departureTimeTimer');
var formSlotDate = document.getElementById('formSlotDate');
var formSlotTime = document.getElementById('formSlotTime');
var formSlotPrice = document.getElementById('formSlotPrice');
var confirmSlotDate = document.getElementById('confirmSlotDate');
var confirmSlotTime = document.getElementById('confirmSlotTime');
var confirmSlotPrice = document.getElementById('confirmSlotPrice');

departureTimeCheckoutButton.onclick =function(e) {
  jQuery('.rightsidesec').toggleClass("sidebaropen");
  jQuery('body').toggleClass("noscroll");
      fetch("/api/web/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ type: 'holdslot', value: _formData.selectedSlotID})
    })
    .then(function(result) {
      // start countdown here
    })
}

function createDepartureTime(departureObject, index) {
  var newDepDate = new Date(departureObject[1]);
  var newDepID = departureObject[0];
  var newDatePriceEUR = departureObject[2];
  var newDatePriceGBP = departureObject[3];
  var newDatePriceUS = departureObject[4];

  var availableHourString = newDepDate.toLocaleTimeString([], {hour: 'numeric', minute: 'numeric' });
 
  // create a new div element 
  var newli = document.createElement("li");
  var newdepartureradio = document.createElement("input");
  newdepartureradio.id = 'departureradio' + index;
  newdepartureradio.name = 'departuretime';
  newdepartureradio.type = 'radio';
  newdepartureradio.dataset.selectedslotdatetime = newDepDate.toUTCString();
  newdepartureradio.dataset.selectedslotid = newDepID;
  newdepartureradio.dataset.selectedslotpriceeur = newDatePriceEUR; // 3
  newdepartureradio.dataset.selectedslotpricegbp = newDatePriceGBP; // 2
  newdepartureradio.dataset.selectedslotpriceus = newDatePriceUS; // 4
  var newdeparturelabel = document.createElement("label");
  newdeparturelabel.for = 'departureradio' + index;
  newdeparturelabel.innerHTML = availableHourString;
  newli.appendChild(newdepartureradio)
  newli.appendChild(newdeparturelabel)

  newli.onclick = function(e) {
    if (!newdepartureradio.checked) {
      departureTimeCheckoutButton.classList.remove('satacheckoutwrp--hidden');
      newdepartureradio.checked = true;
      let currencyStringDecimal = departureObject[priceIndex].toString();
      currencyStringDecimal = currencyStringDecimal.splice(currencyStringDecimal.length - 2, 0, '.')
      departureTimePrice.innerHTML = currencyString + " " + currencyStringDecimal;
      
      _formData.selectedSlotDateTime = newdepartureradio.dataset.selectedslotdatetime;
      _formData.selectedSlotID = newdepartureradio.dataset.selectedslotid;
      _formData.selectedSlotPriceEUR = newdepartureradio.dataset.selectedslotpriceeur;
      _formData.selectedSlotPriceGBP = newdepartureradio.dataset.selectedslotpricegbp;
      _formData.selectedSlotPriceUS = newdepartureradio.dataset.selectedslotpriceus;
      
      formSlotDate.innerHTML = newDepDate.toLocaleDateString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' });
      formSlotTime.innerHTML = newDepDate.toLocaleTimeString() + " " + getTimezoneName();
      formSlotPrice.innerHTML = currencyString + currencyStringDecimal;

      confirmSlotDate.innerHTML = newDepDate.toLocaleDateString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' });
      confirmSlotTime.innerHTML = newDepDate.toLocaleTimeString() + " " + getTimezoneName();
      confirmSlotPrice.innerHTML = currencyString + currencyStringDecimal;
    }
  }

  departureTimeList.appendChild(newli);

  /* 
  selectedSlotDateTime: null,
  selectedSlotID: null,
  selectedSlotPriceEUR: null,
  selectedSlotPriceGBP: null,
  selectedSlotPriceUS: null,

  [1, '2020-12-09T03:00:00+0000', 2599,2599,2599]
  <li>
    <input name="departuretime" type="radio" />
    <label for="input1">8:05pm</label>
  </li>
  */
}

function populateDepartureTimes(hourDate) {
  departureTimeSection.classList.remove('yoursantaexper--hidden');
  var availableDepartureTimes = timesForHours(hourDate);
  departureTimeDate.innerHTML = hourDate.toLocaleDateString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' });
  departureTimeList.innerHTML = '';
  availableDepartureTimes.forEach(function(departureTime, index) {
    createDepartureTime(departureTime, index);
  })

}

// available hours section
var timeblockList = document.getElementById('timeblocklist');
var hoursListContainer = document.querySelector('.calendersecrip');

function populateHoursList(dayDateString) {
  var hoursList = hoursByDay(new Date(dayDateString));
  hoursListContainer.classList.remove('calendersecrip--hidden')
  timeblockList.innerHTML = '';
  
  hoursList.forEach(function(hourAndAppt) {
    let thisHour = hourAndAppt[0];
    var cloneDate = new Date(thisHour);
    var availableHourString = cloneDate.toLocaleTimeString([], {hour12: true, hour: '2-digit', minute: '2-digit' }) + " - " + thisHour.addHours(1).toLocaleTimeString([], {hour12: true, hour: '2-digit', minute: '2-digit' });
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
  
    let currencyStringDecimal = hourAndAppt[1][priceIndex].toString();
    currencyStringDecimal = currencyStringDecimal.splice(currencyStringDecimal.length - 2, 0, '.')
    newtimeprice.innerHTML = currencyString + " " + currencyStringDecimal;
  
    newli.dataset.hour = cloneDate.toUTCString();
    newli.onclick = function() {
      // populate timeslot inputs and make section visible
      let timesArray = timesForHours(new Date(newli.dataset.hour));
      populateDepartureTimes(new Date(newli.dataset.hour))
      Array.from(timeblockList.querySelectorAll('li')).forEach(function(thisLI) {
        thisLI.classList.remove('activetime');
      });
      newli.classList.add('activetime');
    }
  
    timeblockList.appendChild(newli)
  })
}

// available days section
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
        departureTimeCheckoutButton.classList.add('satacheckoutwrp--hidden');
        departureTimeSection.classList.add('yoursantaexper--hidden');
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
});
/*
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
  }
}*/

var formInputFirstName = document.getElementById('form_firstName');
var formInputLastName = document.getElementById('form_lastName');
var formInputEmail = document.getElementById('form_email');
/*
var formInputAddressLine1 = document.getElementById('form_addressLine1');
var formInputAddressLine2 = document.getElementById('form_addressLine2');
var formInputCity = document.getElementById('form_city');
var formInputState = document.getElementById('form_state');
var formInputCountry = document.getElementById('form_country');
*/
var formInputpassenger1name = document.getElementById('passenger1name');
var formInputpassenger1age = document.getElementById('passenger1age');
var formInputpassenger1genderboy = document.getElementById('form_passenger1_gender_boy');
var formInputpassenger1gendergirl = document.getElementById('form_passenger1_gender_girl');
var formInputpassenger1genderna = document.getElementById('form_passenger1_gender_na');
var formInputpassenger1niceListyes = document.getElementById('form_passenger1_niceList_yes');
var formInputpassenger1niceListno = document.getElementById('form_passenger1_niceList_no');
var formInputpassenger1niceListparent = document.getElementById('form_passenger1_niceList_parent');
var formInputpassenger1niceListguardian = document.getElementById('form_passenger1_niceList_guardian');
var formInputformpassenger1letterToSanta = document.getElementById('form_passenger1_letterToSanta');
var formInputformpassenger1additionalDetails = document.getElementById('form_passenger1_additionalDetails');
var formInputformpassenger1consentAuthorized = document.getElementById('form_passenger1_consentAuthorized');

var formInputpassenger2name = document.getElementById('passenger2name');
var formInputpassenger2age = document.getElementById('passenger2age');
var formInputpassenger2genderboy = document.getElementById('form_passenger2_gender_boy');
var formInputpassenger2gendergirl = document.getElementById('form_passenger2_gender_girl');
var formInputpassenger2genderna = document.getElementById('form_passenger2_gender_na');
var formInputpassenger2niceListyes = document.getElementById('form_passenger2_niceList_yes');
var formInputpassenger2niceListno = document.getElementById('form_passenger2_niceList_no');
var formInputpassenger2niceListparent = document.getElementById('form_passenger2_niceList_parent');
var formInputpassenger2niceListguardian = document.getElementById('form_passenger2_niceList_guardian');
var formInputformpassenger2letterToSanta = document.getElementById('form_passenger2_letterToSanta');
var formInputformpassenger2additionalDetails = document.getElementById('form_passenger2_additionalDetails');
var formInputformpassenger2consentAuthorized = document.getElementById('form_passenger2_consentAuthorized');

var paymentForm = document.getElementById('payment-form');

function validateForm() {
  if (
    formInputFirstName.value && formInputFirstName.value.length
    && formInputLastName.value && formInputLastName.value.length
    && formInputEmail.value && formInputEmail.value.includes('@') && formInputEmail.value.includes('.')
  ) {
    paymentForm.classList.remove('payment-form--hidden');
      _formData.form.firstName = formInputFirstName.value;
      _formData.form.lastName = formInputLastName.value;
      _formData.form.email = formInputEmail.value;
      /*_formData.form.addressLine1 = ;
      _formData.form.addressLine2 = ;
      _formData.form.city = ;
      _formData.form.state = ;
      _formData.form.country = ;*/
      _formData.form.agreeTOS = false,

      _formData.form.passenger1.name = formInputpassenger1name.value;
      _formData.form.passenger1.age = formInputpassenger1age.value;
      _formData.form.passenger1.gender = formInputpassenger1genderboy.checked ? 'boy' : (formInputpassenger1gendergirl.checked ? 'girl' : 'N/A');
      _formData.form.passenger1.niceList = formInputpassenger1niceListyes.checked ? 'yes' : (formInputpassenger1niceListno.checked ? 'no' : 'N/A');
      _formData.form.passenger1.letterToSanta = formInputformpassenger1letterToSanta.value;
      _formData.form.passenger1.additionalDetails = formInputformpassenger1additionalDetails.value;
      _formData.form.passenger1.consentAuthorized = formInputformpassenger1consentAuthorized.value || formInputformpassenger1consentAuthorized.checked;

      _formData.form.passenger2.name = formInputpassenger2name.value;
      _formData.form.passenger2.age = formInputpassenger2age.value;
      _formData.form.passenger2.gender = formInputpassenger2genderboy.checked ? 'boy' : (formInputpassenger2gendergirl.checked ? 'girl' : 'N/A');
      _formData.form.passenger2.niceList = formInputpassenger2niceListyes.checked ? 'yes' : (formInputpassenger2niceListno.checked ? 'no' : 'N/A');
      _formData.form.passenger2.letterToSanta = formInputformpassenger2letterToSanta.value;
      _formData.form.passenger2.additionalDetails = formInputformpassenger2additionalDetails.value;
      _formData.form.passenger2.consentAuthorized = formInputformpassenger2consentAuthorized.value || formInputformpassenger2consentAuthorized.checked;
    return true;
  } else {
    paymentForm.classList.add('payment-form--hidden');
  }
}
formInputFirstName.onchange = function(e) {
  if (validateForm()) {
    console.log('form is valid');
  }
}
formInputLastName.onchange = function(e) {
  if (validateForm()) {
    console.log('form is valid');
  }
}
formInputEmail.onchange = function(e) {
  if (validateForm()) {
    console.log('form is valid');
  }
}




