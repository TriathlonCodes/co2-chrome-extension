$(document).ready(function(){
  console.log("I'm ready!")
  $('body').prepend('<div class="header"><span><h2>Loading</h2></span><span><form id="vehicle"><input type="radio" name="automobile" value="car" checked>Car <input type="radio" name="automobile" value="suv">SUV <input type="radio" name="automobile" value="electric">Electric <input type="radio" name="automobile" value="bus">Bus </form></span><span> <form class="refresh"><input type="Submit" value="Refresh Results"></form></span><span><form class="how-much"><input type="Submit" value="How Much is That?"></form></span></div><div class="how-much"></div>')
  setTimeout(getEmissions, 2000)
  $('form.refresh').submit(submitForm)
  $('form#vehicle').on("change", getVehicle)
  $('form.how-much').submit(showHowMuch)
  $('div.how-much').click(function(){
    $(this).hide()
  })
})

var getEmissions = function(vehicle){
  var vehicle = vehicle || "car"
  var distance = $("#pane > div > div.widget-pane-content.scrollable-y > div > div.widget-pane-section-trip-summary.noprint > div.widget-pane-section-trip-summary-header > h1 > span:nth-child(1) > span.widget-pane-section-trip-summary-subtitle > span").text()
  var formattedDistance = formatDistance(distance)
  console.log(formattedDistance)
  emissionRate = emissionRateFor(vehicle)
  var weight = emissionRate*formattedDistance
  var volume = getVolume(weight)
  var volumeFacts = ["<p>That's " + volume + " liters of CO2 gas</p>","<p>That's " + Math.floor(weight/90)/10 + " days of you exhaling</p>", "<p>That's enough to fill " + Math.floor(volume/7.104) + " basketballs</p>"]
  if ( weight > 1000 ){
    $('.header h2').html(Math.floor(weight)/1000 + " kilograms of CO2")
  } else if (weight <= 1000 ){
    $('.header h2').html(Math.floor(weight) + " grams of CO2")
  } else {
    $('.header h2').html("Select a journey and press refresh")
  }
  $('div.how-much').html(volumeFacts[Math.floor(Math.random()*volumeFacts.length)] + "<img src='https://en.gravatar.com/userimage/88043209/a1973478ffee0c8c2811c3130e9d4a95.png?size=100'/>")
}
var submitForm = function(e){
  e.preventDefault()
  refreshResults()
}


var refreshResults = function(vehicle){
  var vehicle = $('form#vehicle').serializeArray()[0]["value"] || "car"
  getEmissions(vehicle)
}

var formatDistance = function(distanceString){
  var distanceNum = parseFloat(distanceString.replace(/[ ]\D*/,""))
  return distanceNum
}

var getVehicle = function(){
  var vehicle = $('form#vehicle').serializeArray()[0]["value"]
  refreshResults(vehicle)
}

var emissionRateFor = function(vehicle){
  if (vehicle === "car"){
    return 368.4
  } else if (vehicle === "suv") {
    return 513.8
  } else if (vehicle === "electric") {
    return 245.5
  } else if (vehicle === "bus") {
    return 69
  }
}

String.prototype.splice = function(index, string){
  return this.substring(0,index) + string + this.substring(index, this.lenth)
}

var getVolume = function(weight){
  //liters
  return Math.floor(weight/0.00198)/1000
}

var showHowMuch = function(e){
  e.preventDefault()
  $('div.how-much').css("display", "table-cell")
}
