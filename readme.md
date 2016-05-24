![MacDown logo](https://media.glassdoor.com/sql/459214/general-assembly-squarelogo-1389133751210.png)

# Read Me    


Hello there! I’m **Emilio Gomez**, and this is a Read Me file of my 1st WDI project: a Musical Feud Game.

Let me introduce the project!

</br>


## How it works

**The Game** is a musical version of Family Feud were 2 players battle to guess the name of the songs from their favorite artist. They get to choose any artist from the iTunes store and get its top 50 tracks. Whoever, makes more points wins!!!

</br>


## Technologies used

**HTML** was used to create an index file were most of the elements are created and were the actual game is hosted.

**Javascript** was used to provide all the functionality of the game

**iTunes API** was used to provide the data base for the songs to be used for the game

**JQuery** library was used to provide the animation on buzzer 

**AJAX** was used to connect to the iTunes API and to read the json data information

**CSS** was usde for the look & feel of the site

**Bootstrap** library was used for the grid and wireframe of the game plus some additional embedded styling for buttons and forms

**Animate.css** was used to add animation on some elements

**Moqups** was used to create the game wireframe

</br>


## User Stories and the planning process

**User Stories**

1. Players log in their name for game personalization
2. Players decide on the artist songs to play to
3. User is reminded to get ready, and hit the start button to start listenning to a song
4. Player can use either the "S" or "L" key to buzz and get a chance to answer
5. Buzzer and board announce who buzzed first and gets to submit the guess
6. If user is right, he/she gets 100 points. If he/she is wrong the other player gets a chance to guess the right answer and get 100 points. If both players guess wrong, the game reveals the right answer and adds a button to choose the next song.
7. Players choose next song and keep playing until they wish to

</br>

**Planning**

The game was planned under two main functionalities: the buzzer to identify which player would get to answer first and the actual board were the different questions would be shown and where the player can submit their answers.

From that a wireframe was designed to provide a clear path on which  elements would need to be created to ensure the functionality would run smoothly:

![Markdown preferences pane](http://i.imgur.com/apnyK2Q.png)
Original Wireframe

</br>
Then working through the user stories, I created piece by piece the required functions and objects that would bring to life the usability of the game using dummy data. Once the game was working with the dummy data the next step was to re-factor the code to use iTunes API with an specific json file of one artist and once that worked I was challenged to make it a dynamic search so the players can choose the artist's song of their choice that they could play the game to.

Finally, providing an exciting and engaging look & feel to provide a better experience. The game was uploaded to BitBalloon as required in the project specifications, however, it wasn't functional since BitBalloon doesn't have authorization to access iTunes API and the data for the artist couldn't be retrieved. Either way the URL for the game in BitBallon is [here](http://cleaner-crab-53004.bitballoon.com/).

</br>


## Additional Information
### ICE BOX Features
-  Drum Kit solo player
-  Genre category (additional to artist name category)
-  Select from a variety of avatars
-  Improve the Look & Feel
-  Guess the album from looking at the album cover category


### Shout out

-  Shout out to Illias for all his help first cracking how to access the iTunes API data using jsonp instead of AJAX.
-  Shout out to everyone in Illias's team because they were always very supportive during scrums and throughout the whole experience.



