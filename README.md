# Project demo
Our proposed idea will make use of an object detection model to scan
the provided image for the item in question. If the model is not able to detect
the object outright, it will not let the user post his item until he provides a
valid photo. If the photo contains clutter and other irrelevant details, the
model will scan the photo, locate the object in question and then crop the
image to only contain the object. This will lead to less misleading or irrelevant
features, and will automate the process instead of requiring manual
inspection. In addition, this process will be much faster in taking action than
manual inspection.


## For starting the server :

node server.js 

## After starting the server. Wait for 3 things to be printed in the console :

1- First the server starts listening to a specific port. 

	Server started in 8080

2- Second connecting to mongodb is successful.
 
	Conntected To Mongo Database

3- Finally the model (Coco-Ssd) is loaded successfully, this may take several seconds before appearing.
	
	model uploaded successfully


### For more info about the project --> Report.pdf 
