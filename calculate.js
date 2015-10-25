$(document).ready(function(){
  console.log("I'm ready!")
  $('body').prepend('<div class="header"><span><h2>Loading</h2></span><span><form id="vehicle"><input type="radio" name="automobile" value="car" checked>Car <input type="radio" name="automobile" value="suv">SUV <input type="radio" name="automobile" value="electric">Electric </form></span><span> <button class="refresh">Refresh Results</button></span></div>')
  setTimeout(getEmissions, 3000)
  $('button.refresh').click(refreshResults)
  $('form#vehicle').on("change", getVehicle)
})

var getEmissions = function(vehicle){
  var vehicle = vehicle || "car"
  var distance = $("#pane > div > div.widget-pane-content.scrollable-y > div > div.widget-pane-section-trip-summary.noprint > div.widget-pane-section-trip-summary-header > h1 > span:nth-child(1) > span.widget-pane-section-trip-summary-subtitle > span").text()
  var formattedDistance = formatDistance(distance)
  console.log(formattedDistance)
  emissionRate = emissionRateFor(vehicle)
  if ( formattedDistance*emissionRate > 1000 ){
    $('.header h2').html(Math.floor(formattedDistance* emissionRate)/1000 + " kilograms of CO2")
  } else if (formattedDistance*emissionRate <= 1000 ){
    $('.header h2').html(Math.floor(formattedDistance* emissionRate) + " grams of CO2")
  } else {
    $('.header h2').html("Select a journey and press refresh")
  }
}

var refreshResults = function(vehicle){
  var vehicle = $('form#vehicle').serializeArray()[0]["value"] || "car"
  getEmissions(vehicle)
}

var formatDistance = function(distanceString){
  var distanceNum = parseFloat(distanceString.replace(/\D/,"").replace(/^0/,"0."))
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
  }

}
