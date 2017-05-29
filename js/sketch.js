document.getElementById('displaymap').addEventListener('click', showMap);
document.getElementById('displaygraph').addEventListener('click', hideMap);


var title;
var description;
var cvs;

var mapMarkers = [];

var clickCount = 0;
var currentCount;
var currentIndex = 0;
var currentMapIndex = 0;

var sortOptions;
var datatitle;
var locDrop;
var dateDrop;
var weatherDrop;
var altDrop;
var audioDrop;

var locChange = 0;
var dateChange = 0;
var weatherChange = 0;
var altChange = 0;
var audioChange = 0;

var locArray = [];
var dateArray = [];
var weatherArray = [];
var altArray = [];
var audioArray = [];

var dataLength = 0;

var dataX = 0;
var dataY = 0;

var date = 0;
var time = 0;
var loc = 0;
var weather = 0;
var battery = 0;
var altitude = 0;
var audioLevel = 0;

var myDiv;
var descriptiontext ;
var descriptionholder = "";

var question = 0;
var answers = 0;

var mapNY;
// var markerIconBlack;
// var markerIconRed;
var mapmarkerIcon;
var leftArrow;
var rightArrow;

var leftClick = false;
var rightClick = false;

var textbox;

// var cvspos = cvs.width-20


function preload() {
	mapNY = loadImage("img/bluemap.png");
	mapmarkerIcon = loadImage("img/mapmarker.png");
}

function setup() {
	//background(241,241,241);
	background(255);
	createCanvas(1000, 1000);
}

function showMap(){
		loadJSON("data/reporter-export.json", mapData);

		document.getElementById('displaymap').addEventListener('click', showMap);
		document.getElementById('displaymap').classList.toggle('active');
		document.getElementById('displaygraph').className = "myButton"

// 	title = createP("MAP.me (aka their data, my data) (aka map vs territory) ")
// 	title.position(20, 0);
// 	title.style("font-size", "30px");
// 	//title.mousePressed(mapData);

// 	//project description 
// 	description = createDiv("For over 10 days I collected data about myself. I focused on data that I knew was already being collected by the apps on my phone and personal, emotional, data, that I chose to record.");
// 	description.position(20, 80);
// 	description.style('font-family', 'Open Sans, sans-serif');
// 	description.style('font-weight', '400');
// 	description.style('font-size', '16px');

	//canvas
	var cvs = createCanvas(1200, 800);
	//cvs.position(190, 400);
	cvs.position(160, 400);
	cvs.addClass('canvas');
	// var x = (windowWidth - width) / 2;
 //  	var y = (windowHeight - height) / 2;
 //  	cvs.position(x, y);
	background(241,241,241);

	sortOptions = createP("Sort My Data:")
	sortOptions.position(180, 460);
	sortOptions.style("color", "#fc625d");
	sortOptions.style("font-weight", "bold");
	sortOptions.style("font-size", "20px");

	datatitle = createP("My.Data:")
	datatitle.position(960, 460);
	datatitle.style("color", "#fc625d");
	datatitle.style("font-weight", "bold");
	datatitle.style("font-size", "20px");

	locDrop = createSelect();
	locDrop.position(180, 510);
	locDrop.option("location");
	locDrop.changed(drawEverything);

	dateDrop = createSelect();
	dateDrop.position(180, 560);
	dateDrop.option("date");
	dateDrop.changed(drawEverything);

	weatherDrop = createSelect();
	weatherDrop.position(180, 610);
	weatherDrop.option("weather");
	weatherDrop.changed(drawEverything);

	altDrop = createSelect();
	altDrop.position(180, 660);
	altDrop.option("altitude");
	altDrop.changed(drawEverything);

	audioDrop = createSelect();
	audioDrop.position(180, 710);
	audioDrop.option("audio");
	audioDrop.changed(drawEverything);

	myDivHolder = createDiv("");
	myDivHolder.position(960, 580);
	myDivHolder.addClass('holder');

	$(".graphs").hide();

	// myDiv = createDiv();
	// myDiv.position(220, 60);
}

function hideMap(){
	var cvs = createCanvas(1000, 1000);
	//cvs.position(190, 400);
	cvs.position(160, 400);
	cvs.addClass('canvas');
	

	document.getElementById('displaygraph').classList.toggle('active');
	document.getElementById('displaymap').className = "myButton";

	sortOptions.hide();
	locDrop.hide();
	dateDrop.hide();
	weatherDrop.hide();
	altDrop.hide();
	audioDrop.hide();
	rightArrow.hide();
	leftArrow.hide();
	datatitle.hide();
	myDivHolder.hide();

	// $(".right").empty();
	// $(".left").empty();
	$(".right").hide();
	$(".left").hide();

	$(".graphs").show();


	

	runChart();
}

function mapData(data) {

	dataLength = data.snapshots.length;
	for (var i = 0; i < dataLength; i++) {

		if (data.snapshots[i].location != undefined) {
			//get plot points
			dataX = data.snapshots[i].location.longitude;
			mapX = map(dataX, -74.02244, -73.89805, 110, 820)
			dataY = data.snapshots[i].location.latitude;
			mapY = 10 + map(dataY, 40.74, 40.66553, 110, 615)
				//get altitude
			altitude = round(data.snapshots[i].location.altitude);
			//zipcodes
			if (data.snapshots[i].location.placemark !== undefined) {
				loc = data.snapshots[i].location.placemark.postalCode;
			}
			//get WEATHER
			if (data.snapshots[i].weather !== undefined) {
				weather = data.snapshots[i].weather.weather;
			}
		}
		// get audio
		if (data.snapshots[i].audio !== undefined) {
			audio = round(data.snapshots[i].audio.avg);
		}
		//fill localArray with zip codes
		if (locArray.indexOf(loc) == -1) { //maybe ===
			locArray.push(loc);
		}
		///fill weatherArray
		if (weatherArray.indexOf(weather) == -1) { //maybe ===
			weatherArray.push(weather);
		}
		//get dates and fill dateArray with dates	
		date = data.snapshots[i].date.slice(0, 10);
		if (dateArray.indexOf(date) == -1) { //maybe ===
			dateArray.push(date);
		}
		//fill altArray with altitudes
		if (altArray.indexOf(altitude) == -1) { //maybe ===
			altArray.push(altitude);
		}
		//fill audioArray with audio values
		if (audioArray.indexOf(audio) == -1) { //maybe ===
			audioArray.push(audio);
		}
		// get battery
		battery = data.snapshots[i].battery
			//MY DATA
		var answers = [];
		var questions = [];
		var responses = data.snapshots[i].responses;
		//get questions and responses
		if (responses !== undefined) {
			for (var j = 0; j < responses.length; j++) {
				questions.push(responses[j].questionPrompt);
				answers.push(responses[j].tokens);
			}
		}
		var m = new DropMarker(mapX, mapY, loc, date, weather, battery, altitude, audio, questions, answers); //, 
		mapMarkers.push(m);
	}

	// populate dropdowns
	for (var l = 0; l < locArray.length; l++) {
		locDrop.option(locArray[l]);
	}
	for (var a = 0; a < altArray.length; a++) {
		altDrop.option(altArray[a]);
	}
	for (var d = 0; d < dateArray.length; d++) {
		dateDrop.option(dateArray[d]);
	}
	for (var w = 0; w < weatherArray.length; w++) {
		weatherDrop.option(weatherArray[w]);
	}
	for (var n = 0; n < audioArray.length; n++) {
		audioDrop.option(audioArray[n]);
	}

	//draw initial mapMarkers...
	drawEverything();
}


function mousePressed() {
	clickCount++;

	for (var i = 0; i < mapMarkers.length; i++) {
		currentCount = mapMarkers.indexOf(mapMarkers[i]);
		var d = dist(mouseX, mouseY, mapMarkers[i].x, mapMarkers[i].y);
		if (d < 7) {
			currentIndex = returnIndex(); //returnIndex();
			drawEverything();
		}
	}
}

function returnIndex() {
	return currentCount;
}

function leftClicked() {
	leftClick = true;
	rightClick = false;

	if (currentIndex >= 0) {
		currentIndex--;
		var d = currentIndex;
		while (mapMarkers[d].isVisible == false) {
			d--;
			currentIndex--;
		}
	}
	if (currentIndex <= 0) {
		currentIndex = mapMarkers.length - 1;
	}

	drawEverything();
}

function rightClicked() {
	rightClick = true;
	leftClick = false;

	if (currentIndex < mapMarkers.length - 1) {
		currentIndex++;
		var d = currentIndex;
		while (mapMarkers[d].isVisible == false) {
			d++;
			currentIndex++;
		}
	}

	if (currentIndex >= mapMarkers.length - 1) {
		currentIndex = 0;
	}

	drawEverything();
}

function drawEverything() {

	imageMode(CORNER);
	tint(255);
	image(mapNY, 120, 10);
	
	noStroke()
	//stroke(125, 77, 118);
  //strokeWeight(2);
  	fill(255, 200);
  	rect(-5, 40, 200, 350, 20, 20, 20, 20);
	fill(255);
	rect(730, 40, 330, 555, 20, 20, 20, 20);
	

	locChange = locDrop.value();
	dateChange = dateDrop.value();
	weatherChange = weatherDrop.value();
	altChange = altDrop.value();
	audioChange = audioDrop.value();


	if (leftClick == false && rightClick == false) {

		if (clickCount == 0) {
			currentIndex = mapMarkers.length - 1;
		}

		for (var i = 0; i < mapMarkers.length; i++) {
			if ((mapMarkers[i] == mapMarkers[currentIndex]) && (mapMarkers[i].loc == locChange || locChange == "location") && (mapMarkers[i].date == dateChange || dateChange == "date") && (mapMarkers[i].weather == weatherChange || weatherChange == "weather") && (mapMarkers[i].altitude == altChange || altChange == "altitude") && (mapMarkers[i].audio == audioChange || audioChange == "audio")) {
				mapMarkers[currentIndex].displayData();
				mapMarkers[currentIndex].col = color(252, 98, 93);
			}
			//else {	
			if ((mapMarkers[i].loc == locChange || locChange == "location") && (mapMarkers[i].date == dateChange || dateChange == "date") && (mapMarkers[i].weather == weatherChange || weatherChange == "weather") && (mapMarkers[i].altitude == altChange || altChange == "altitude") && (mapMarkers[i].audio == audioChange || audioChange == "audio")) {
				mapMarkers[i].displayMarker();
				mapMarkers[i].col = color(255, 255, 255);
				mapMarkers[i].isVisible = true;
			} else {
				mapMarkers[i].isVisible = false;
			}
		}
	} else if (leftClick == true) { //&& rightClick == false
		for (var f = 0; f < mapMarkers.length; f++) {
			if ((mapMarkers.indexOf(mapMarkers[f]) == currentIndex) && (mapMarkers[f].loc == locChange || locChange == "location") && (mapMarkers[f].date == dateChange || dateChange == "date") && (mapMarkers[f].weather == weatherChange || weatherChange == "weather") && (mapMarkers[f].altitude == altChange || altChange == "altitude") && (mapMarkers[f].audio == audioChange || audioChange == "audio")) {
				mapMarkers[f].displayData();
				mapMarkers[f].col = color(252, 98, 93);
			}
			if ((mapMarkers[f].loc == locChange || locChange == "location") && (mapMarkers[f].date == dateChange || dateChange == "date") && (mapMarkers[f].weather == weatherChange || weatherChange == "weather") && (mapMarkers[f].altitude == altChange || altChange == "altitude") && (mapMarkers[f].audio == audioChange || audioChange == "audio")) {
				mapMarkers[f].displayMarker();
				mapMarkers[f].col = color(255, 255, 255);
				mapMarkers[f].isVisible = true;
			} else {
				mapMarkers[f].isVisible = false;
			}
		}
	} else if (rightClick == true) { //&& leftClick == false
		for (var i = 0; i < mapMarkers.length; i++) {
			if ((mapMarkers.indexOf(mapMarkers[i]) == currentIndex) && (mapMarkers[i].loc == locChange || locChange == "location") && (mapMarkers[i].date == dateChange || dateChange == "date") && (mapMarkers[i].weather == weatherChange || weatherChange == "weather") && (mapMarkers[i].altitude == altChange || altChange == "altitude") && (mapMarkers[i].audio == audioChange || audioChange == "audio")) {
				mapMarkers[i].displayData();
				mapMarkers[i].col = color(252, 98, 93);
			}
			if ((mapMarkers[i].loc == locChange || locChange == "location") && (mapMarkers[i].date == dateChange || dateChange == "date") && (mapMarkers[i].weather == weatherChange || weatherChange == "weather") && (mapMarkers[i].altitude == altChange || altChange == "altitude") && (mapMarkers[i].audio == audioChange || audioChange == "audio")) {
				mapMarkers[i].displayMarker();
				mapMarkers[i].col = color(255, 255, 255);
				mapMarkers[i].isVisible = true;
			} else {
				mapMarkers[i].isVisible = false;
			}
		}
	}
	//print(currentIndex);
}

function leftarrowsGray() {
	leftArrow = createImg("img/leftarrow_gray.png");
	leftArrow.position(740, 700);
	leftArrow.mousePressed(leftClicked);
	leftArrow.mouseOver(leftarrowsGray);
	leftArrow.mouseOut(leftarrowsBlack);
	// rightArrow = createImg("img/rightarrow_gray.png");
	// rightArrow.position(1030, 700);
	// rightArrow.mousePressed(leftClicked);
	// rightArrow.mouseOver(arrowsGray);
	// rightArrow.mouseOut(arrowsBlack);
}

function leftarrowsBlack() {
	leftArrow = createImg("img/leftarrow.png");
	leftArrow.position(740, 700);
	leftArrow.mousePressed(leftClicked);
	leftArrow.mouseOver(leftarrowsGray);
	leftArrow.mouseOut(leftarrowsBlack);
	// rightArrow = createImg("img/rightarrow.png");
	// rightArrow.position(1030, 700);
	// rightArrow.mousePressed(leftClicked);
	// rightArrow.mouseOver(arrowsGray);
	// rightArrow.mouseOut(arrowsBlack);
}

function rightarrowsGray() {
	// leftArrow = createImg("img/leftarrow_gray.png");
	// leftArrow.position(740, 700);
	// leftArrow.mousePressed(leftClicked);
	// leftArrow.mouseOver(arrowsGray);
	// leftArrow.mouseOut(arrowsBlack);
	rightArrow = createImg("img/rightarrow_gray.png");
	rightArrow.position(1030, 700);
	rightArrow.mousePressed(leftClicked);
	rightArrow.mouseOver(rightarrowsGray);
	rightArrow.mouseOut(rightarrowsBlack);
}

function rightarrowsBlack() {
	// leftArrow = createImg("img/leftarrow.png");
	// leftArrow.position(740, 700);
	// leftArrow.mousePressed(leftClicked);
	// leftArrow.mouseOver(arrowsGray);
	// leftArrow.mouseOut(arrowsBlack);
	rightArrow = createImg("img/rightarrow.png");
	rightArrow.position(1030, 700);
	rightArrow.mousePressed(leftClicked);
	rightArrow.mouseOver(rightarrowsGray);
	rightArrow.mouseOut(rightarrowsBlack);
}