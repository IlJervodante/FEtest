
var counter = 0;
const requestURL = 'https://jsonplaceholder.typicode.com/posts/';
const icon = document.getElementById("icon");
icon.addEventListener("click", toggleMenu);

function toggleMenu() {
	let visibility = document.getElementById('card-trigger').style.display;
	if (visibility == "inline")
		document.getElementById('card-trigger').style.display = "none";
	else
		document.getElementById('card-trigger').style.display = "inline";
}

const cells = document.getElementsByTagName('a');
for (let cell of cells) {
	let dataSku = cell.getAttribute('data-sku');
	if (dataSku != null)
		cell.addEventListener("click", function(){addCard(dataSku)});
}

var remover = document.getElementById("remover").addEventListener("click", removeAll);

function addCard(cardNumber) {
	let cardExist = document.getElementById(cardNumber);
	if (cardExist)
		return;
	let newElement = document.createElement('div');
	var cardsHolder = document.getElementById("cards-holder");
	newElement.setAttribute('class', "card");
	newElement.innerHTML = "<p id='title'></p><p class='text' id='body'></p><button type='button' id='" + cardNumber + "' onclick='removeCard(id)'>Remove Me!</button>";
	cardsHolder.appendChild(newElement);
	
	fetch(requestURL)
		.then(response => response.json())
		.then(data => populateCard(data, cardNumber));
}

function removeCard(id) {
	document.getElementById(id).parentNode.remove();
}

function populateCard(jsonObj, cardNumber) {
  let parent = document.getElementById(cardNumber).parentNode;
  parent.childNodes.item(0).innerHTML = jsonObj[cardNumber]['title'].toUpperCase();
  parent.childNodes.item(1).innerHTML = jsonObj[cardNumber]['body'];
}

function removeAll() {
	let cardsHolder = document.getElementById("cards-holder"); 
	while (cardsHolder.firstChild) {
        cardsHolder.removeChild(cardsHolder.firstChild);
    }
}
