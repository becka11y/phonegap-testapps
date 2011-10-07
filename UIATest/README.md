PhoneGap iOS UIATest Documentation
==========================

UI Automation tests for iOS PhoneGap features that have UI interaction. 

File Structure
--------------

tests/*

These are automation test files that work with the Inpector Tool.  Currently just one - notification.js

www/*

These are the PhoneGap application files to be tested. Currently since there is only one test there is just a single html file with the UI to be tested:  index.html

Running the Tests
------------------

For a basic overview search for `UI Automation' at:  http://developer.apple.com/library/ios/#documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/Introduction/Introduction.html

- Create a new PhoneGap project in xCode.
- Copy the files from the www directory into the project's www directory.
- You will need the tests directory somewhere on the test machine.  I add the directory into my application project but it can be installed anywhere on the machine.
- Build and run the project on a device to get it installed.  Manually test a few features to make sure the app is working properly.
- Stop the app on the device and from with xCode.
- Open the Instruments apps.   Create a new automation project.   Select the device where the app is installed and choose the installed app as the target. Note the the UI Automation documentation states that you can run automation on the simulator but I haven't had much success.  Also, not all features (such as taking pictures) are available on the simulator.  
- Load the script.  Browse to the location on your machine where you copied the tests directory.  
- Press the record button.  Press stop recording when the test is completed.

