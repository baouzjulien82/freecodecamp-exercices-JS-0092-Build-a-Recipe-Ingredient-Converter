const conversionTable = {
  cup: { gram: 240, ounce: 8.0, teaspoon: 48 },
  gram: { cup: 1 / 240, ounce: 0.0353, teaspoon: 0.2 },
  ounce: { cup: 0.125, gram: 28.35, teaspoon: 6 },
  teaspoon: { cup: 1 / 48, gram: 5, ounce: 0.167 },
};

const convertQuantity = (fromUnit) => (toUnit) => (quantity) => {
  const conversionRate = conversionTable[fromUnit][toUnit];
  return quantity * conversionRate;
};

const adjustForServings = (baseQuantity) => (newServings) =>
  baseQuantity * newServings;

const processIngredient = (baseQuantity, baseUnit, newUnit, newServings) => {
  const adjustedQuantity = adjustForServings(baseQuantity)(newServings);
  const convertedQuantity = convertQuantity(baseUnit)(newUnit)(adjustedQuantity);
  return convertedQuantity.toFixed(2); // retourne une string
};

// Récupération des éléments du DOM
const ingredientName = document.getElementById("ingredient");
const ingredientQuantity = document.getElementById("quantity");
const unitToConvert = document.getElementById("unit");
const numberOfServings = document.getElementById("servings");
const recipeForm = document.getElementById("recipe-form");
const resultList = document.getElementById("result-list");

const units = ["cup", "gram", "ounce", "teaspoon"];

const updateResultsList = () => {
  resultList.innerHTML = ""; // on vide la liste

  units.forEach((unit) => {
    if (unit !== unitToConvert.value) {
      // calcul avec processIngredient
      const result = processIngredient(
        parseFloat(ingredientQuantity.value), // quantité saisie
        unitToConvert.value,                  // unité de départ (choisie par l’utilisateur)
        unit,                                 // unité cible
        parseFloat(numberOfServings.value)    // nombre de portions
      );

      // créer un <li> et l’ajouter
      const li = document.createElement("li");
      li.textContent = `${ingredientName.value}: ${result} ${unit}`;
      resultList.appendChild(li);
    }
  });
};

// Événement sur le formulaire
recipeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateResultsList();
});
