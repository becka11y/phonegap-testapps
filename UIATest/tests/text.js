var target = UIATarget.localTarget();
var app = target.frontMostApp();
var win = app.mainWindow();
var webView = win.scrollViews()[0].webViews()[0];

// List element hierarchy for the screen 
UIALogger.logStart("Logging element tree …");
UIATarget.localTarget().logElementTree();
UIALogger.logPass();

var testName = "Enter Text";
UIALogger.logStart(testName);
var testText = webView.textFields()["First Name: "];
//var testText = webView.textFields().firstWithValueForKey("fName", "i);
//testText.logElement();
//testText.setValue("");
testText.tap();
target.frontMostApp().keyboard().typeString("Alice");
app.windows()[1].toolbar().elements()["Done"].tap();
//UIATarget.localTarget().logElementTree();

//UIATarget.localTarget().delay(2);
if (testText.value() == "Alice") {
	UIALogger.logPass(testName);
} else {
	UIALogger.logFail("Error: Incorrect input value. Expected `Alice` got `" + testText.value() + "`");
}
//UIALogger.logMessage("text field value: " + testText.value());


