var target = UIATarget.localTarget();
var app = target.frontMostApp();
var win = app.mainWindow();
var webView = win.scrollViews()[0].webViews()[0];

// globals to use when testing alerts.  Set these params for each alert to be tested at at the beginning of each test
// AlertParms:
// message - the message passed into the alert
// title - the title passed into the alert, "Alert" or "Confirm" if no title passed in
// buttons - array of button names passed into the alert.  "OK" for alert, "YES", "NO" for confirm if no buttons provided
// tapIndex - the index of the button in the buttons array to tap in order to dismiss
var alertParams = { "message": "Simple Alert", "title": "Alert", "buttons": ["OK"], "tapIndex":0 }
var testName = "Simple Alert";
var bPass = true;


// helper function for logging parameter failures
function logParamError(message, expected, actual) {
	UIALogger.logError("Error: " + message + ". Expected `" + expected + "` got `" + actual + "`");
}
// need to have a handler for Alerts - this is where alert testing occurs
UIATarget.onAlert = function onAlert(alert) {
    
    var title = alert.staticTexts()[0].name();
    var message = alert.staticTexts()[1].name();
    var buttons = alert.buttons();

    
    UIALogger.logMessage("Alert with title of `" + title + "` encountered.");
    //alert.logElementTree();
    if (title != alertParams.title) {
    	bPass = false;
        logParamError("Incorrect title",alertParams.title, title);
    } 
    if (message && message != alertParams.message) {
    	bPass = false;
    	logParamError("Incorrect message parameterExpected",alertParams.message,message);
    }
    if (buttons.length != alertParams.buttons.length) {
    	bPass = false;
        UIALogger.logError("Error: Wrong number of buttons encountered");
    }
    for (var i=0; i<buttons.length; i++) {
    	var buttonText = buttons[i].name();
    	if (buttonText != alertParams.buttons[i]) {
    		bPass = false;
    		logParamError("Button " + i + " text does not match",alertParams.buttons[i],buttonText);
    	}
    }
    if (bPass) {
    	alert.buttons()[alertParams.tapIndex].tap();
        return true; //alert handled, so bypass the default handler        
    } else {
    	// return false to use the default handler
       	return false;
    }
    
}

// test simple alert with just message
var alertParams = { "message": "Simple Alert", "title": "Alert", "buttons": ["OK"], "tapIndex":0 }
var testName = "Simple Alert";  // must match button name that invokes this test
UIALogger.logStart(testName);
var testButton = webView.buttons()[testName];
//UIALogger.logMessage("button label: " + testButton.name());
testButton.tap();
UIATarget.localTarget().delay(2); // see http: //stackoverflow.com/questions/3651316/handling-alert-with-uiautomation
if (bPass == true) {
	UIALogger.logPass(testName);
}
else {
	UIALogger.logFail(testName);
}

// test simple alert with message and title
testName = "Simple Alert with Title";
alertParams = { "message": "I'm Late, I'm late, for a very important date!", "title": "unClever Title", "buttons": ["OK"], "tapIndex":0 }
UIALogger.logStart(testName);
webView.buttons()[testName].tap();
UIATarget.localTarget().delay(2);
// check results
if (bPass == true) {
	UIALogger.logPass(testName);
}
else {
	UIALogger.logFail(testName);
}

// test alert with message, title and custom button name

// test default confirm
// test default confirm
var alertParams = { "message": "Simple Confirm", "title": "Confirm", "buttons": ["OK", "Cancel"], "tapIndex":0 }
var testName = "Default Confirm";
UIALogger.logStart(testName);
var testButton = webView.buttons()[testName];
//UIALogger.logMessage("button label: " + testButton.name());
testButton.tap();
UIATarget.localTarget().delay(2); // see  http: //stackoverflow.com/questions/3651316/handling-alert-with-uiautomation
if (bPass == true) {
	var buttonPressed = parseInt(webView.staticTexts()[2].name());
	var trueIndex = alertParams.tapIndex + 1;
	if (buttonPressed == trueIndex) {
		UIALogger.logPass(testName);
	} else {
		logParamError("Incorrect button press returned",trueIndex,buttonPressed);
		UIALogger.logFail(testName); 
	}
} else {
	UIALogger.logFail(testName);
}

//test confirm with message and custom title
var alertParams = { "message": "Time to say hello?", "title": "Confirmation Request", "buttons": ["OK", "Cancel"], "tapIndex":1 }
var testName = "Default Confirm with Title";
UIALogger.logStart(testName);
var testButton = webView.buttons()[testName];
//UIALogger.logMessage("button label: " + testButton.name());
testButton.tap();
UIATarget.localTarget().delay(3); // see http: //stackoverflow.com/questions/3651316/handling-alert-with-uiautomation
if (bPass == true) {
	UIALogger.logMessage(webView.logElementTree()); //staticTexts()["buttonPressed"].name());
	var buttonPressed = parseInt(webView.staticTexts()[2].name());
	var trueIndex = alertParams.tapIndex + 1;
	if (buttonPressed == trueIndex) {
		UIALogger.logPass(testName);
	} else {
		logParamError("Incorrect button press returned",trueIndex,buttonPressed);
		UIALogger.logFail(testName); 
	}
} else {
	UIALogger.logFail(testName);
}
	
//test confirm with message and custom title
var alertParams = { "message": "Off with her head!", "title": "Confirmation Request", "buttons": ["Of Course!","Oh No"], "tapIndex":1 }
var testName = "Confirm with Title and Custom Buttons";
UIALogger.logStart(testName);
var testButton = webView.buttons()[testName];
testButton.tap();
UIATarget.localTarget().delay(4); // see http: //stackoverflow.com/questions/3651316/handling-alert-with-uiautomation
if (bPass == true) {
	var buttonPressed = parseInt(webView.staticTexts()[2].name());
	var trueIndex = alertParams.tapIndex + 1;
	if (buttonPressed == trueIndex) {
		UIALogger.logPass(testName);
	} else {
		logParamError("Incorrect button press returned",trueIndex,buttonPressed);
		UIALogger.logFail(testName); 
	}
} else {
	UIALogger.logFail(testName);
}
//test confirm with message, custom title and 3 buttons
var alertParams = { "message": "Off with her head!", "title": "Confirmation Request", "buttons": ["YES","NO","MAYBE"], "tapIndex":2 }
var testName = "Confirm with Title and 3 Buttons";
UIALogger.logStart(testName);
var testButton = webView.buttons()[testName];
//UIALogger.logMessage("button label: " + testButton.name());
testButton.tap();
UIATarget.localTarget().delay(3); // see http: //stackoverflow.com/questions/3651316/handling-alert-with-uiautomation
if (bPass == true) {
	var buttonPressed = parseInt(webView.staticTexts()[2].name());
	var trueIndex = alertParams.tapIndex + 1;
	if (buttonPressed == trueIndex) {
		UIALogger.logPass(testName);
	} else {
		logParamError("Incorrect button press returned",trueIndex,buttonPressed);
		UIALogger.logFail(testName); 
	}
} else {
	UIALogger.logFail(testName);
}
