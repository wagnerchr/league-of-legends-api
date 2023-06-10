// Configs
const apiUrl = 'https://ddragon.leagueoflegends.com/cdn/11.11.1/data/en_US/champion.json';
let mainTag = document.querySelector('main');

// Starts App
const fetchIsso = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  const champions = Object.values(data.data);

  champions.forEach(champion => {
      const championName = champion.id;
      const championIcon = `https://ddragon.leagueoflegends.com/cdn/11.11.1/img/champion/${champion.image.full}`;    
      const champ = {
        name: championName,
        img: championIcon
      };

      let key = localStorage.length + 1;
      localStorage.setItem( key, JSON.stringify(champ));
  });
}

// Inserts Champions
const insertChamp = (value) => {
  mainTag.innerHTML = ''
  for (let i = 1; i < localStorage.length; i++) {
    champFromLocalStorage = JSON.parse(localStorage.getItem(i));

  if(champFromLocalStorage.name.toLowerCase().startsWith(value.toLowerCase())) {
    const divElement = document.createElement('div');
    divElement.classList.add("card");

    divElement.innerHTML = `
      <div class="card">
        <h3 class="card">${champFromLocalStorage.name}</h3>
        <img class="card" src="${champFromLocalStorage.img}"/>
      </div>
    `;
    mainTag.appendChild(divElement);    
  }}
}


// const fetchChampions = async (value) => {
//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     const champions = Object.values(data.data);
    
//     mainTag.innerHTML = ''
    
//     champions.forEach(champion => {
//       const championName = champion.id;
//       const championIcon = champion.image.full;

//     if(championName.toLowerCase().startsWith(value.toLowerCase())) {

//       const championImg = `https://ddragon.leagueoflegends.com/cdn/11.11.1/img/champion/${championIcon}`;

//       const divElement = document.createElement('div');
//       divElement.classList.add("card");

//       divElement.innerHTML = `
//         <div class="card">
//           <h3 class="card">${championName}</h3>
//           <img class="card" src="${championImg}"/>
//         </div>
//       `;
//       mainTag.appendChild(divElement);

//       const champ = {
//         name: championName,
//         img: championImg
//       }

//       localStorage.setItem('champ', JSON.stringify(champ))
//       const champFromLocalStorage = JSON.parse(localStorage.getItem('champ'));
//       console.log(champFromLocalStorage.name)
//     }
//   });
//   } catch (error) {
//     console.error('Erro:', error);
//   }
// };


const search = async (value) => {
  insertChamp(value);
}

const send = () => {
  const inputName = document.getElementById('input-name');
  const inputImg = document.getElementById('input-img');
  const valueName = inputName.value,
        valueImg = inputImg.value;
  const champ = {
    name: valueName,
    img: valueImg
  }  
  let key = localStorage.length + 1
  localStorage.setItem(key, JSON.stringify(champ));

  insertChamp('');
}

// Starting with Default

fetchIsso();
insertChamp('');
localStorage.clear();

