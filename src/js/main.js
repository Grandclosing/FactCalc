
var app = angular.module('myCalculator', [/*"ngResource"*/]);
var arg1 = null;
var operation = null;
var actions = [];
var resetNumberBar = false;

app.controller('Calc', function($scope) {
	$scope.addNumber = function(num) {
		if(resetNumberBar === true) {
			$scope.argumentNumber = null;
			resetNumberBar = false;
		}
		if($scope.argumentNumber == null) {
			$scope.argumentNumber = num;
		} else {
			if(!($scope.argumentNumber.toString().charAt(0) === "0" && $scope.argumentNumber.toString().charAt(1) != ".")) {
				newNum = $scope.argumentNumber + "" + num;
				$scope.argumentNumber = newNum;
			}
		}
		actions.push("num");
	}
	
	$scope.add = function() {
		resetNumberBar = true;
		if(arg1 == null) {
			arg1 = $scope.argumentNumber;
		} else {
			$scope.displayResult();
			arg1 = $scope.argumentNumber;	
		}
		operation = "add";
		actions.push("op");
	}
	
	$scope.sub = function() {
		resetNumberBar = true;
		if(arg1 == null) {
			arg1 = $scope.argumentNumber;
		} else {
			$scope.displayResult();
			arg1 = $scope.argumentNumber;
		}
		operation = "sub";
		actions.push("op");
	}
	
	$scope.mult = function() {
		resetNumberBar = true;
		if(arg1 == null) {
			arg1 = $scope.argumentNumber;
		} else {
			$scope.displayResult();
			arg1 = $scope.argumentNumber;
		}
		operation = "mult";
		actions.push("op");
	}
	
	$scope.div = function() {
		resetNumberBar = true;
		if(arg1 == null) {
			arg1 = $scope.argumentNumber;
		} else {
			$scope.displayResult();
			arg1 = $scope.argumentNumber;
		}
		operation = "div";
		actions.push("op");
	}
	
	$scope.sqrt = function() {
		var num = $scope.argumentNumber;
		if(operation == null) {
			if(num != null && num != "") {
				$scope.argumentNumber = Math.sqrt(parseFloat(num));
				
				$scope.getFact($scope.setFact);
				actions.push("sqrt");
				resetNumberBar = true;
			}
		}
	}
	
	$scope.sqr = function() {
		var num = $scope.argumentNumber;
		if(operation == null) {
			if(num != null && num != "") {
				$scope.argumentNumber = parseFloat(num) * parseFloat(num);
				
				$scope.getFact($scope.setFact);
				actions.push("sqr");
				resetNumberBar = true;
			}
		}
		
	}
	
	$scope.dec = function() {
		if($scope.argumentNumber.toString().indexOf(".") === -1 && $scope.argumentNumber.toString().length != 0) {
			$scope.argumentNumber += "."
		}
	}
	
	$scope.displayResult = function() {	
		if(operation != null) {
			if(operation === "add") {
				$scope.argumentNumber = parseFloat(arg1) + parseFloat($scope.argumentNumber);
			} else if(operation === "sub") {
				$scope.argumentNumber = parseFloat(arg1) - parseFloat($scope.argumentNumber);
			} else if(operation === "mult") {
				$scope.argumentNumber = parseFloat(arg1) * parseFloat($scope.argumentNumber);
			} else if(operation === "div") {
				$scope.argumentNumber = parseFloat(arg1) / parseFloat($scope.argumentNumber);
			}
			operation = null;
			arg1 = null;
			resetNumberBar = true;
			actions = [];
			$scope.getFact($scope.setFact);
		} else {
			var num = $scope.argumentNumber;
			if(num != null && num != "") {
				$scope.getFact($scope.setFact);
			}
		}
	}

	$scope.getFact = function(callback) {
		fadeOut(document.getElementById('numberFact'));
		fadeOut(document.getElementById('twitter-container'));
		
		if(document.getElementById('tweet') != null) {
			document.getElementById('tweet').parentNode.removeChild(document.getElementById('tweet'));
		}
		
		setTimeout(function() {
			$scope.factResult = null;
			fadeIn(document.getElementById('loader'));
			
			var num = parseInt($scope.argumentNumber);
			if(num != null && num != "") {
				var http = new XMLHttpRequest();
				http.onreadystatechange = function() {
					if(http.readyState == 4 && http.status == 200) {
						callback(http.responseText);
					}
				}
				http.open('GET', "http://numbersapi.com/" + num, true);
				http.send();
				http.onerror = function(e) {
					console.log(e.error);
					$scope.setFact("An error has occurred; please reload the page.");
				}
			}
		}, 600);
		
		
	}	
	
	$scope.setFact = function(str) {
		$scope.factResult = str;
		fadeOut(document.getElementById('loader'));
		
		setTimeout(function() {
			createTweetButton(str);
			if(str.indexOf("error") != -1) {
				document.getElementById('numberFact').style.backgroundColor = "rgba(166, 0, 0, 0.3)";
			} else {
				document.getElementById('numberFact').style.backgroundColor = "rgba(0, 0, 0, 0.3)";
			}
			fadeIn(document.getElementById('numberFact'));
			fadeIn(document.getElementById('twitter-container'));
			$scope.$apply();
		}, 750);
	}
	
	$scope.clearAll = function() {
		operation = null; 
		arg1 = null;
		$scope.argumentNumber = null;
		resetNumberBar = false;
		actions = [];
	}
	
	$scope.clearLast = function() {
		var lastAction = actions.pop();
		if(lastAction === "num") {
			$scope.argumentNumber = $scope.argumentNumber.substr(0, $scope.argumentNumber.length - 1);
		} else if(lastAction === "op") {
			operation = null;
			resetNumberBar = false;
		} else if(lastAction === "sqrt") {
			$scope.sqr();
		} else if(lastAction === "sqr") {
			$scope.sqrt();
		}
	}
});

function createTweetButton(str) {
	var link = document.createElement('a');
	link.setAttribute('href', 'https://twitter.com/share');
	link.setAttribute('id', "tweet");
	link.setAttribute('class', 'twitter-share-button');
	link.setAttribute('data-text', str.substr(0, 139));
	link.setAttribute('data-size', "large");
	document.getElementById('twitter-container').appendChild(link);
	twttr.widgets.load();
}

function fadeIn(widget) {
	var i = 1;
	widget.style.display = "block";
	var fader = setInterval(function() {
		widget.style.opacity = i / 10;
		i++;
		if(i === 11) {
			clearInterval(fader);
		}
	}, 25);
}

function fadeOut(widget) {
	var i = 9;
	var fader = setInterval(function() {
		widget.style.opacity = i / 10;
		i--;
		if(i === -1) {
			clearInterval(fader);
			widget.style.display = "none";
		}
	}, 30);
}

function keyInput(e) {
	var keyString = String.fromCharCode(e.which);
	var keyCode = e.which;
	var controllerScope = angular.element(document.getElementById('calculatorGroup')).scope();
	console.log(keyCode + " " + keyString);
	if(keyCode === 13) { //'Enter' pressed
		controllerScope.displayResult();
	} else {
		if(!isNaN(keyString) || keyCode === 46) { //0-9, . pressed 
			controllerScope.addNumber(keyString);
		} else if(keyCode === 43) { // + pressed
			controllerScope.add();
		} else if(keyCode === 45) { // - pressed
			controllerScope.sub();
		} else if(keyCode === 42) { // * pressed
			controllerScope.mult();
		} else if(keyCode === 47) { // / pressed
			controllerScope.div();
		}
	}
	controllerScope.$apply();
}




