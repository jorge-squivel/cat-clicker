/* ========== Model ========== */

var model = {
	currentCat: null,
	cats: [
		{
			clickCount : 0,
			name : 'Cholo',
			imgSrc : 'img/cat.jpg',
			//imgAttribution : ''
		},
		{
			clickCount : 0,
			name : 'Paris',
			imgSrc : 'img/cat2.jpg',
			//imgAttribution : ''
		},
		{
			clickCount : 0,
			name : 'Hilton',
			imgSrc : 'img/cat3.jpg'
			//imgAttribution : ''
		},
		{
			clickCount : 0,
			name : 'Lucho',
			imgSrc : 'img/cat4.jpg'
			//imgAttribution : ''
		},
		{
			clickCount : 0,
			name : 'Michael Fassbender',
			imgSrc : 'img/cat5.jpg'
			//imgAttribution : ''
		}
	]
};

/* ========== Octopus ========== */

var octopus = {
	// The init method starts off the entire application
	init: function() {
		// Calls the model's currentCat property and initially sets it to 0
		model.currentCat = model.cats[0];

		// Initialize both views: The list and The View displayed (each cat)
		catListView.init();
		catView.init();
	},

	getCurrentCat: function() {
		return model.currentCat;
	},

	getCats: function() {
		return model.cats;
	},

	// Sets the currently-selected cat to the object passed in
	// You passed it in object and it sets the currentCat (from Model) equal to the object you pass in
	setCurrentCat: function(cat) {
		model.currentCat = cat;
	},

	// Takes our currentCat and increments it's clickCount (A cats' property from Model)
	incrementCounter: function() {
		model.currentCat.clickCount++;
		catView.render();
	}
};

/* ========== View ========== */
// catView is an object with an init function and a render function
var catView = {
	init: function() {
		// Store pointers to our DOM elements for easy access later
		this.catElem = document.getElementById('cat');
		this.catNameElem = document.getElementById('cat-name');
		this.catImageElem = document.getElementById('cat-img');
		this.countElem = document.getElementById('cat-count');

		// on click, increment the current cat's counter
		this.catImageElem.addEventListener('click', function(e){
			octopus.incrementCounter();
		});

		// render this view (update the DOM elements with the right values)
		this.render();
	},

	render: function() {
		// update the DOM elements with values from the current cat
		
		// Get our currentCat from the octopus, which of course gets it form the model
		var currentCat = octopus.getCurrentCat();
		// the we set the count element and the name and the image to our currentCat 
		this.countElem.textContent = currentCat.clickCount;
		this.catNameElem.textContent = currentCat.name
		this.catImageElem.src = currentCat.imgSrc;
	}
};

var catListView = {
	init: function() {
		// We grab the catListElement fromthe DOM and put it in 'this' variable
		// store the DOM element (catList) for easy access later
		this.catListElem = document.getElementById('cat-list');
		// render this view (update the DOM elements with the right values)
		this.render();
	},
	render: function() {
		// get the cats from the octopus, which originally gets it from the model
		var cats = octopus.getCats();
		// then we empty our ul, which lists all the cats
		this.catListElem.innerHTML = '';
		// loop over the cats
		for (var i = 0; i <= cats.length; i++) {
			// this is the cat we are currently looping over
			var cat = cats[i];
			// Create a new cat list item (li) and set its text 
			var elem = document.createElement('li');
			elem.textContent = cat.name;

			// on click, setCurrentCat and render the catView
			// (this uses our closure-in-a-loop trick to connect the view
			// of the cat variable to the click event function)
			elem.addEventListener('click', (function(cat) {
				return function () {
					octopus.setCurrentCat(cat);
					catView.render();
				};
			})(cat));

			// finally, add the element to the list
			this.catLstElem.appendChild(elem);
		};
	}
};
// make it go! this makes everything happen
octopus.init();




