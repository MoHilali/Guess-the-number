//creation du tableau d'objet a l'exterieur de la fonction pour garder le contenu.
var scoreTable = [];

var n = document.getElementById("tablewinner")

// Creation de la table du Hall of Fame.
var table = document.createElement("TABLE");
table.setAttribute("id", "tablebig")
var header = document.createElement("TR");
header.setAttribute("id", "table")

// Remplissage de l'entete du tableau
headerT = ["Rank", "Name", "Score", "Time"]
for (var i of headerT) {
     var element = document.createElement("TD");
     element.setAttribute("id", "table");
     element.innerHTML = i;
     header.appendChild(element);
}
table.appendChild(header);

// Remplissage des cases du tableau par les rangs correspendants et par des tirets.
for (var i = 0; i < 10; i++) {
     var header = document.createElement("TR");
     header.setAttribute("id", (parseInt(i) + 1))

     var element = document.createElement("TD");
     element.setAttribute("id", "table")
     element.innerHTML = (parseInt(i) + 1);
     header.appendChild(element);

     element = document.createElement("TD");
     element.setAttribute("id", "rank" + (parseInt(i) + 1) + "2")
     element.innerHTML = "---";
     header.appendChild(element);

     element = document.createElement("TD");
     element.setAttribute("id", "rank" + (parseInt(i) + 1) + "3")
     element.innerHTML = "---";
     header.appendChild(element);

     element = document.createElement("TD");
     element.setAttribute("id", "rank" + (parseInt(i) + 1) + "4")
     element.innerHTML = "---";
     header.appendChild(element);

     table.appendChild(header);
}
n.appendChild(table);


var start, score, number;

//fonction qui lance le jeu.
function guessingGame() {
     //initialisation des variables globales.
     start = new Date();
     score = 1;
     number = Math.floor(Math.random() * 10) + 1;
     document.getElementById("game").innerHTML = "Choose a number between 1 and 10 :";
     var inField = document.getElementById("wrtField");
     inField.disabled = false;
     inField.placeholder="Enter value"
     inField.addEventListener("change", guess);
}

function guess(event) {
     //document.getElementById("divButtonGame").innerHTML = ""
     var gameSlot = document.getElementById("game")
     var choice = this.value;

     if (number < choice) {
          gameSlot.innerHTML = "Oops ! Your choice \"" + choice + "\" was greater than the magic number. <br/> Try again !";
          this.value = "";
          score++;
     } else if (number > choice) {
          gameSlot.innerHTML = "Oops ! Your choice \"" + choice + "\" was lesser than the magic number. <br/> Try again !";
          this.value = "";
          score++;
     } else if (choice == number) {
          this.value = "";
          //fin du jeu et ainsi prise du temps de fin.
          var end = new Date();
          //calcul du temps de jeu en secondes.
          var gameTime = Math.round((end.getTime() - start.getTime()) / 1000);

          if (scoreTable.length < 10) {
               //Declaration de l'objet joueur.
               var player = {
                    name: "",
                    score: 0,
                    time: 0,
               };

               //affectation de valeurs aux proprietés de l'objet.
               player.score = score;
               player.time = gameTime;
               // demander le nom du "champion" pour le rajouter dans le Hall of fame.
               gameSlot.innerHTML = "Congrats ! You have 5 seconds to enter your name :";
               event.target.placeholder = "Enter Name"

               setTimeout(function() {
                    player.name = event.target.value;
                    event.target.value = "";
                    event.target.disabled = true;
                    event.target.placeholder = "";

                    //ajouter l'objet a la fin du tableau
                    scoreTable.push(player);
                    //trier le tableau numeriquement en fonction du score des joueur (Merci W3School).
                    scoreTable.sort(function(a, b) {
                         return a.score - b.score
                    });

                    //Trouver le rang du joueur en utilisant la methode indexOf des arrays en js.
                    var rank = parseInt(scoreTable.indexOf(player)) + 1;

                    //Affichage de message final pour informer le joueur de son score et son rang dans le hall of fame.
                    gameSlot.innerHTML = player.name + ", your score is : " + player.score + ",  you found the magic number in " + player.time + " seconds and your rank is : " + rank + ".<br/> Press the 'Play' button to play again !";

                    // Remplir dans table Hall of fame
                    for (var i = 10; i > rank; i--) {
                         document.getElementById("rank" + i + "2").innerHTML = document.getElementById("rank" + (i - 1) + "2").innerHTML;
                         document.getElementById("rank" + i + "3").innerHTML = document.getElementById("rank" + (i - 1) + "3").innerHTML;
                         document.getElementById("rank" + i + "4").innerHTML = document.getElementById("rank" + (i - 1) + "4").innerHTML;
                    }
                    document.getElementById("rank" + rank + "2").innerHTML = player.name;
                    document.getElementById("rank" + rank + "3").innerHTML = player.score;
                    document.getElementById("rank" + rank + "4").innerHTML = player.time;
               }, 5000);


          } else if (scoreTable.length == 10 && score < scoreTable[scoreTable.length - 1].score) {
               //supprimer le joeur avec le plus mauvais score dans la hall of fame.
               scoreTable.pop();

               //Declaration de l'objet joueur.
               var player = {
                    name: "",
                    score: 0,
                    time: 0,
               };

               //affectation de valeurs aux proprietés de l'objet.
               player.score = score;
               player.time = gameTime;
               // demander le nom du "champion" pour le rajouter dans le Hall of fame.
               gameSlot.innerHTML = "Congrats ! You have 5 seconds to enter your name :";

               setTimeout(function() {
                    player.name = event.target.value;
                    event.target.value = "";
                    event.target.disabled = true;
                    event.target.placeholder = "";

                    //ajouter l'objet a la fin du tableau
                    scoreTable.push(player);
                    //trier le tableau numeriquement en fonction du score des joueur (Merci W3School).
                    scoreTable.sort(function(a, b) {
                         return a.score - b.score
                    });

                    //Trouver le rang du joueur en utilisant la methode indexOf des arrays en js.
                    var rank = parseInt(scoreTable.indexOf(player)) + 1;

                    //Affichage de message final pour informer le joueur de son score et son rang dans le hall of fame.
                    gameSlot.innerHTML = player.name + ", your score is : " + player.score + ",  you found the magic number in " + player.time + " seconds and your rank is : " + rank + ".\n Press the 'Play' button to play again !";

                    // Remplir dans table Hall of fame
                    for (var i = 10; i > rank; i--) {
                         document.getElementById("rank" + i + "2").innerHTML = document.getElementById("rank" + (i - 1) + "2").innerHTML;
                         document.getElementById("rank" + i + "3").innerHTML = document.getElementById("rank" + (i - 1) + "3").innerHTML;
                         document.getElementById("rank" + i + "4").innerHTML = document.getElementById("rank" + (i - 1) + "4").innerHTML;
                    }
                    document.getElementById("rank" + rank + "2").innerHTML = player.name;
                    document.getElementById("rank" + rank + "3").innerHTML = player.score;
                    document.getElementById("rank" + rank + "4").innerHTML = player.time;
               }, 5000);

          } else {
               // Affichage de message de felicitation ! avec le score et le temps écoulé.
               gameSlot.innerHTML = "BINGO ! Your score is : " + score + "  and you made it in  " + gameTime + " seconds.\n Press the 'Play' button to play again !";
               this.value = "";
               event.target.disabled = true;
               event.target.placeholder = "";
          }
     }
}
