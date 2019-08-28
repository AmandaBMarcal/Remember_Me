# Remember Me
Remember Me focuses on users who experience from memory deficits. This full-stack web application exercises their neurological skills as well as their motor skills, and records the results for their caregivers & family members to see.

**Link to project:** http://bit.ly/Remember--Me

![alt tag](/public/img/one.png)
![alt tag](/public/img/two.png)
![alt tag](/public/img/three.png)
![alt tag](/public/img/four.png)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Node.JS/Express, HTML5Up, Chart.JS, Mongo

This application came to mind after experiencing tribulations while recording mental progression and regression from a family member who suffers from memory loss. I knew that to measure success I needed to create a grading system by having a set of instructions and a way to show the progression on a graph. I used a set interval to time the user as well as searching for diff recipes that they could follow in chronological order. The instructions display on the DOM with bolded keywords, then following the recipe instructions, a set of pictures are displayed so that the user is able to recollect what they remember from the recipe keywords. I created an algorithm that allowed me to use the keywords from the recipe to === the name of the img so that if the user selects the right img, it is then graded as such. I built a bar graph using Chart.JS to display all of the grades so that the user can see each try based off the grade they received. It allows the caregiver of the user to see how good they've been doing throughout their attempts at different recipes.   


## Lessons Learned:

Whilst creating this application, it gave me the opportunity to really focus on the data that went into my database. I wanted the application to truly prioritize the safety of the user as well as their results and the information they provide. I created a user collection so that the caretakers userid and passwords was together. A score collection so that the player_id and score was together. A player collection where the players information was all in one id (email, caregiver name, birthday, telephone number). This way, by making all of the info private it secured the info my users provided.
