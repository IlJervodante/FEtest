
var counter = 0;
const requestURL = 'https://jsonplaceholder.typicode.com/posts/';

function addCard(cardNumber) {
	let id = counter;
	let newElement = document.createElement('div');
	var cardsHolder = document.getElementById("cards-holder");
	newElement.setAttribute('class', "card");
	newElement.innerHTML = "<p id='title'>CARDS DATA " + cardNumber + "</p><button type='button' id='" + id + "' onclick='removeCard(id)'>Remove Me!</button>";
	cardsHolder.appendChild(newElement);
	counter++;
	
	fetch(requestURL)
		.then(response => response.json())
		.then(data => populateCard(data, cardNumber, id));
}

function removeCard(id) {
	document.getElementById(id).parentNode.remove();
}

function populateCard(jsonObj, cardNumber, childId) {
  const newParagraph = document.createElement('p');
  newParagraph.setAttribute('class', "text");
  newParagraph.innerHTML = jsonObj[cardNumber]['body'];
  let parent = document.getElementById(childId).parentNode;
  parent.childNodes.item("title").innerHTML = jsonObj[cardNumber]['title'].toUpperCase();
  parent.appendChild(newParagraph);
}
