# TextMeDoggos
https://textmedoggos.up.railway.app/  
The source code for my website to send individuals random doggos

![alt text](https://github.com/iamTanTan/TextMeDoggos/blob/main/assets/Capture.JPG)

## Design 
This Project was designed utilizing the MVC (Model View Controller) Architecture. 

* Models or entities for the MongoDB hosted data are within the folder: [models](https://github.com/iamTanTan/TextMeDoggos/blob/main/models)
* Views utilizing ejs templating are within the folder: [views](https://github.com/iamTanTan/TextMeDoggos/blob/main/views)
* Controller related code (used to communicate from server to frontend) are within the folder: [routes](https://github.com/iamTanTan/TextMeDoggos/blob/main/routes)

Hosting is done on Heroku. This necessitates the Procfile and the utils file to execute a timed script to send from the site.

## Reflection 
### My Experience
This project was my first exposure to the use of the MVC architecture and working with asynchonous functions.
I am happy with the functionality and ability to operate this site with the use of a database with live data and querying with mongoose ORM.
This project took significantly longer to create than I anticipated. I predicted that it would take a few weeks to complete but it took a couple months to complete when including things such as hosting on Heroku, implementing a timer to send daily massages, and fixing bugs.

I am glad this was one of my first projects that I created for myself.

###  What I would change
* The web site UI would have a few more pages or displays for the user. Currently there is only a single page and slight templating changes being rendered. These additions would likely be designed for the user to select some specific features of the dogs they would like to see (breed, size, type of image, etc.).
* The user data would be stored and phone numbers would be sent through an encryption algorithm before being stored in the database for security from my eyes.
* An option for a user to text the app (Twilio API) to get another Doggo whenever would be a nice feature to implement
* I would likely use a more robust UI library such as React.js and add TypeScript to the project to make the process easier to debug and to better understand the process.

