

//constructor function // creates new object for each location
function DropMarker(x, y, loc, date, weather, battery, altitude, audio, questions, answers) { //, responses, answers, tokens
	this.x = x;
	this.y = y;
	this.col = color(255, 255, 255);
	this.loc = loc;
	this.date = date;
	this.weather = weather;
	this.battery = battery;
	this.altitude = altitude;
	this.audio = audio;
	this.questions = questions;
	this.answers = answers;
	this.isVisible = false;
	this.displayMarker = function() {
			//this.isVisible = true;
			imageMode(CENTER)
			tint(this.col);
			image(mapmarkerIcon, this.x, this.y);
		}
		//highlight and display marker data
	this.displayData = function() {
		imageMode(CENTER)
		tint(this.col);
		image(mapmarkerIcon, this.x, this.y);

		fill(0);
		leftArrow = createImg("img/leftarrow.png");
		leftArrow.position(900, 700);
		leftArrow.mousePressed(leftClicked);
		leftArrow.addClass('left');

		// leftArrow.mouseOver(leftarrowsGray);
		// leftArrow.mouseOut(leftarrowsBlack);

		rightArrow = createImg("img/rightarrow.png");
		rightArrow.position(1160, 700);
		rightArrow.mousePressed(rightClicked);
		rightArrow.addClass('right');
		// rightArrow.mouseOver(rightarrowsGray);
		// rightArrow.mouseOut(rightarrowsBlack);

		//data
		noStroke();
		textSize(16);
    //fill(241,241,241);
		//rect(730, 40, 730, 320);
		
  //   fill(0);
		text("Location:  " + this.loc, 800, 120);
		text("Date:  " + this.date, 800, 140);
		// text("Altitude:  " + this.altitude, 740, 150);
		text("Weather:  " + this.weather, 800, 160);
		// text("Battery Life:  " + this.battery, 740, 250);
		// text("Audio Levels:  " + this.audio, 740, 300);

		$(".holder").empty();

		// qlength= this.questions.length - 3;
		for (var q = 0; q < this.questions.length; q++) {
		// for (var q = 0; q < qlength; q++) {

			if (this.questions[q]!= "Where are you?" ){

			var details = createDiv(this.questions[q]);
			myDivHolder.child(details);
			details.addClass('questions');

			}

			var tokens = this.answers[q];
			if (tokens) {
				// var tlength = tokens.length - 3;
				for (var t = 0; t < tokens.length; t++) {
				// for (var t = 0; t < tlength; t++) {

					
					var answer = createElement('p', tokens[t].text);
					details.child(answer);
					answer.addClass('answers');
					// curY += 22
					// fill(0);

					// descriptionholder = tokens[t].text;
					// descriptiontext.position(350, curY);
					// print(descriptionholder);
					//text(tokens[t].text, 820, curY, 500);
				}
			}
		//curY += 35;
		}
	}

	this.notDisplayed = function(){
		this.isVisible = false;
	}
	
}