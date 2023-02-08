/*const pokemon = 'gengar';

const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
const data = await response.json();

function poundsToKg(poundsWeight) {
  return poundsWeight / 2.2046;
}

const specificationsWeight = document.querySelector('#specifications-weight');

window.onload = function () {

  fetchName();

  const poundsWeight = parseInt(specificationsWeight.textContent);
  console.log({ poundsWeight });
  const kgWeight = Math.round(poundsToKg(poundsWeight) * 100) / 100;
  console.log({ kgWeight });
  specificationsWeight.textContent = `${kgWeight}kg`;
}


async function fetchName() {
  // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  const h1 = document.querySelector('h1');
  h1.textContent = data.name;
  const span = document.createElement('span');
  // span.textContent = `#${data.game_indices[0].game_index}`;
  span.textContent = '#' + data.game_indices[0].game_index;
  h1.appendChild(span);
  // h1.innerHTML = `${data.name} <span>#${data.game_indices[0].game_index}</span>`;




}

*/

// appel des données
async function getPkmnDatas(pokemon){

    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
    const datas = await response.json();
    return datas;

}

async function getPkmnDescription(pokemon){
    const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + pokemon);
    const datas = await response.json();
    return datas.flavor_text_entries[0].flavor_text;

}

async function getPkmnCategories(pokemon){

    const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + pokemon);
    const datas = await response.json();
    console.log()
    return datas.genera[7].genus; // 3 C'EST FRANCAIS
}

async function getPkmnWeaknesses(type){

    const response = await fetch('https://pokeapi.co/api/v2/type/' + type);
    const datas = await response.json();
    return datas.damage_relations.double_damage_from;
}

// async function getPkmnEvolutions(pokemon){

//   const response = await fetch('http://pokeapi.co.api/v2/pokemon/' + pokemon.species.name);
//   const datas = await response.json();
//   return datas.species;
// }


// remplir la page html avec les datas récupérées ci-dessus         à compléter avec les données à afficher!!!
async function displayPkmnDatas(datas){

    //nom
    const name = document.querySelector("h1");
    name.innerText = datas.name;

    //id
    const span = document.createElement("span");
    span.textContent = "#" + datas.game_indices[19].game_index;
    name.appendChild(span);

    //image
    const image = document.querySelector(".w-100");
    image.src = datas.sprites.other["official-artwork"].front_default;

    //description
    console.log(datas.id);
    const description = await getPkmnDescription(datas.name);
    document.querySelector("#description").innerText=description;

    //poids en kg
    const hectogramsWeight = datas.weight;
    document.querySelector("#specifications-weight").innerText=hectogramsWeight/10+' kg';

    //taille en m
    const metersHeight = datas.height;
    document.querySelector("#specifications-height").innerText=metersHeight/10+' m';

    //catégorie

    const category = await getPkmnCategories(datas.name);
    document.querySelector("#category").innerText=category;

    //talent

    const abilityContainer = document.querySelector("#ability")

    for (let i=0; i<datas.abilities.length; i++) {
        const abilitiesItem = document.createElement("strong");
        abilityContainer.appendChild(abilitiesItem);

        abilitiesItem.textContent = datas.abilities[i].ability.name+' ';
      }

    //type(s)

    const typeContainer = document.querySelector(".type-list");

    for (const types of datas.types) {
      const typeList = document.createElement("li");
      typeContainer.appendChild(typeList);

      const typeButton = document.createElement("button");
      typeList.appendChild(typeButton);
      typeButton.classList.add(types.type.name);

      typeButton.textContent = types.type.name;
    }

    //faiblesse(s)

    const weaknessContainer = document.querySelector(".weakness-list");
    const totalTypes = [];
    const totalWeaknesses = [];

    for (let i=0; i<datas.types.length; i++){
      totalTypes.push(datas.types[i].type.name);  
    }
    
    for (const type of totalTypes) {
        const weaknesses = await getPkmnWeaknesses(type);
      for (const w of weaknesses) {
          totalWeaknesses.push(w);
      }
    }

    for (const weakness of totalWeaknesses) {
      const weaknessItem = document.createElement("li");
      weaknessContainer.appendChild(weaknessItem);

      const weaknessButton = document.createElement("button");
      weaknessItem.appendChild(weaknessButton);
      weaknessButton.classList.add(weakness.name);
      weaknessButton.textContent = weakness.name;
    }

    //stats

    for (let i=0; i<datas.stats.length; i++) {

      const classnumber = Math.round((datas.stats[i].base_stat*15)/283);
      const classname = datas.stats[i].stat.name+ "-" + classnumber;
      console.log(classname);
      document.querySelector(".stats").classList.add(classname);
    }

    // //evolutions

    // const evolutions = document.querySelector ("#evolution > div");
    
    // if (pokemon.evolves_to.length > 0) {
    //   const div = document.createElement ("div");
    //   evolutions.appendChild(div);

    // }

    //faire boucle pour talents (abilities) comme ils peuvent en avoir plusieurs + pareil pour types + faiblesses (style eau peut etre faible vs plante mais pas eau electrik) POSER QUESTION SYLVAIN EN ARRIVANT



    
}



// action globale

async function main(){

    const pokemon = 'magneton';
    const datas = await getPkmnDatas(pokemon);

    displayPkmnDatas(datas);

}

main()