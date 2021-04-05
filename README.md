### Check the app at following link :
## https://aytacg26.github.io/boardgamesquizapp/

### App tested and it works on the following browser versions :

1. Google Chrome (Version 89.0.4389.114 (Official Build) (64-bit))
2. Firefox (Version 86.0.1)
3. Microsoft Edge (Version 89.0.774.63 (Official build) (64-bit))
4. Opera (Version 74.0.3911.232)

### On Google Chrome, it has been tested on the following window sizes :

#### Desktop

- Desktop 940x700
- Desktop 1360x768
- Desktop 1600x1200
- Desktop 1680x1050
- Desktop 1920x1080
- Desktop 2560x1080

#### Mobile

- Mobile Galaxy Note 3 360x640
- Mobile Galaxy Note II 360x640
- Mobile Galaxy S III 360x640
- Mobile iPhone5/SE 320x568
- Mobile iPhone 6/7/8 375x667
- Mobile iPhone 6/7/8 Plus 414x736

## Notes :

- File Minifactions has not be done for the ease of control process and to keep the number of files less, this is not a fully production ready application.

- Coding has been done on Microsoft VS Code, no framework or css styling package/framework (Bootstrap or MaterializeCSS) has been used.

- ReactJS style tried to be applied on the element creation by using createElement function located in js/utils folder.

- Data fetching has been done with Fetch API, the quizData.js file located in js/utils contains two functions (one for fetching questions (fetchQuestions()) and
  one for fetching results (fetchResults())).

- App has been created by mostly Vanilla JavaScript and ES6

## Files and Functions in Utils Folder :

**alert.js** => setAlert() function : it has been created and used for alert message boxes

**calculateTotalPoints.js** => calculateTotalPoints() : it calculates total points of questions (not the points of player)

**clearLocalStorage.js** => clearLocalStorage() : In app, playername, number of questions, points of player and current question number is
stored in localStorage and in case a player closes the browser or refreshes it, s/he will
be able to continue on the last question s/he was. After completion of the game, on restart
button, this function is used. On the other hand, if user deletes any of the data on localStorage
(name or Number of questions etc.) the game will restart automatically and in this process, this function
is also again used.

**createElement.js** => instead of using document.createElement, el.appendChild, el.classList.add(className) in every creation of elements, this
function has been created and for Question Windows and Game Results window, this function is used and created elements
are injected to the div#root in question_page.html (located in html folder). In fact, this app would be done as SPA but
to also show element selections or getting element processes, index page has been created in normal way (Html + JS) and
question windows/results have been totally created by JavaScript createElement processes.

**generateMessage.js** => generateMessage() function generates random correct answer and wrong answer messages for alertbox. Static messages has been added
to file and with the help of Math.random, message is selected on correct answer messages array or wrong answer messages array

**getQuestionById.js** => In every click to the Next button on question window, currentQuestion id is increaed by one and this function filters the Next
question from fetched json and sends it to the question window generator function

**highLight.js** => Gets the elements by their Id on correct answer array and adds new class to them

**statDataSelector.js** => This function takes results data and point statistics of the user and filters the result data according to
the total point % of the user.
