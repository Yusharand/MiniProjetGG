//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//Options values for buttons
let options = {
  fruits: [
    "Pomme",
    "Myrtille",
    "Mandarin",
    "Ananas",
    "Banane",
    "Pasteque",
    "Canelle",
    "Citron",
    "Goyave",
    "Framboise"
  ],
  animaux: [
    "Herisson", 
    "Rhinoceros",
    "Ecureuil",
    "Leopard",
    "Morse",
    "Zebre",
    "Hippopotame",
    "Dinosaure",
    "Chien",
    "Scolopendre"
  ],  

  pays: [
    "Inde",
    "Hongrie",
    "Kazakhstan",
    "Argentine",
    "Zimbabwe",
    "Dominicaine",
    "Madagascar",
    "Montenegro",
    "Swaziland",
    "Samoa"
  ],
};

//count
let winCount = 0;
let count = 0;

let choixMot = "";

//Afficher option buttons
const afficherOptions = () => {
  optionsContainer.innerHTML += `<h3>Choisissez un option:</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateMot('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//Bloquer les buttons
const bloquer = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //desactiver les options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //desactiver les lettres
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

//Generateur Mot
const generateMot = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //Si optionValeur correspond le button innerText donc souligner le button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  //initialiser lettre cachée, effacer mot precedent
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //choisir mot aleatoire
  choixMot = optionArray[Math.floor(Math.random() * optionArray.length)];
  choixMot = choixMot.toUpperCase();

  //remplacer chaque mot avec span contenant dash
  let displayItem = choixMot.replace(/./g, '<span class="dashes">_</span>');

  //Afficher chaque element comme span
  userInputSection.innerHTML = displayItem;
};

//Initialiser fonction (appeler quand page charge/user clique nouveau jeu)
const initializer = () => {
  winCount = 0;
  count = 0;

  //Initialiser effacer tout content et cacher lettres et nouveau jeu button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //Creer lettre button
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Nombre à ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    //caractere button click
    button.addEventListener("click", () => {
      let charArray = choixMot.split("");
      let dashes = document.getElementsByClassName("dashes");
      //si tableau contient valeur cliqué remplacer le dash correspondant avec lettre ou dram on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //si caractere en tableau est meme que button cliqué
          if (char === button.innerText) {
            //remplace dash avec lettre
            dashes[index].innerText = char;
            //incrementer counter
            winCount += 1;
            //si winCount egal mot length
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>Vous avez gagne!!</h2><p>Le mot est <span>${choixMot}</span></p>`;
              //bloquer tout buttons
              bloquer();
            }
          }
        });
      } else {
        //perdu count
        count += 1;
        //pour dessiner man
        dessinerMan(count);
        //Count==6 car tete,corps,bras gauche , bras droit,jambe gauche, jambe droite
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>Vous avez perdu!!</h2><p>Le mot est <span>${choixMot}</span></p>`;
          bloquer();
        }
      }
      //desactiver button cliqué
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  afficherOptions();
  //Appel à canvasCreator (pour effacer cabvas precedent et creer canvas initial)
  let { initialDessiner } = canvasCreator();
  //initialDessiner doit dessiner frame
  initialDessiner();
};

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //Pour dessiner ligne
  const dessinerLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const tete = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const corps = () => {
    dessinerLine(70, 40, 70, 80);
  };

  const brasGauche = () => {
    dessinerLine(70, 50, 50, 70);
  };

  const brasDroit = () => {
    dessinerLine(70, 50, 90, 70);
  };

  const jambeGauche = () => {
    dessinerLine(70, 80, 50, 110);
  };

  const jambeDroite = () => {
    dessinerLine(70, 80, 90, 110);
  };

  //initial frame
  const initialDessiner = () => {
    //effacer canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    dessinerLine(10, 130, 130, 130);
    //left line
    dessinerLine(10, 10, 10, 131);
    //top line
    dessinerLine(10, 10, 70, 10);
    //small top line
    dessinerLine(70, 10, 70, 20);
  };

  return { initialDessiner, tete, corps, brasGauche, brasDroit, jambeGauche, jambeDroite };
};

//dessiner le man
const dessinerMan = (count) => {
  let { tete, corps, brasGauche, brasDroit, jambeGauche, jambeDroite } = canvasCreator();
  switch (count) {
    case 1:
      tete();
      break;
    case 2:
      corps();
      break;
    case 3:
      brasGauche();
      break;
    case 4:
      brasDroit();
      break;
    case 5:
      jambeGauche();
      break;
    case 6:
      jambeDroite();
      break;
    default:
      break;
  }
};

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;