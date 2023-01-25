function poundsToKg(poundsWeight) {
  return poundsWeight / 2.2046;
}

const specificationsWeight = document.querySelector('#specifications-weight');

window.onload = function () {
  const poundsWeight = parseInt(specificationsWeight.textContent);
  console.log({ poundsWeight });
  const kgWeight = Math.round(poundsToKg(poundsWeight) * 100) / 100;
  console.log({ kgWeight });
  specificationsWeight.textContent = `${kgWeight}kg`;
}

document.querySelector('#search').addEventListener('click', getPokemon);

/*function getPokemon(e) {
const name = document.querySelector("#pokemonName").value;

  fetch('https://pokeapi.co/api/v2/pokemon/${name}')
  .then((res) => response.json())
  .then((data) => {
    document.querySelector(".pokemonBox").innerHTML = '
    
    '

  })
  .catch((err) => {
    console.log('Pokemon not found', err);
  });

  e.preventDefault();
}

getPokemon()*/