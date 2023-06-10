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
      
      let key = localStorage.length + 1;

      const champ = {
        key: key,
        name: championName,
        img: championIcon
      };
      localStorage.setItem( key, JSON.stringify(champ));
  });
}

const edit = (champ) => { 
  var modal = document.getElementsByClassName("modal")[0];
  modal.style.display = "flex";

  const champFromLocalStorage = JSON.parse(localStorage.getItem(champ));

  let inputName = document.querySelector(".input-edit-name")
  inputName.value = champFromLocalStorage.name;
  let inputImage = document.querySelector(".input-edit-img")
  inputImage.value = champFromLocalStorage.img;
  let championImage = document.querySelector(".champion-img")
  let imgElement = document.createElement("img"); 
  imgElement.src=`${champFromLocalStorage.img}` 
  championImage.appendChild(imgElement)

  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
    championImage.innerHTML = ''
  });
}


// Inserts Champions
const insertChamp = (value) => {
  mainTag.innerHTML = ''
  for (let i = 1; i < localStorage.length + 1; i++) {
    champFromLocalStorage = JSON.parse(localStorage.getItem(i));

  if(champFromLocalStorage.name.toLowerCase().startsWith(value.toLowerCase())) {
    const divElement = document.createElement('div');
    divElement.classList.add("card");

    divElement.innerHTML = `
      <div class="card">
        <h3 class="card">${champFromLocalStorage.name}</h3>
        <img class="card" src="${champFromLocalStorage.img}"/>
        <button class="editButton">Edit</button>
      </div>
    `;

    const editButton = divElement.querySelector(".editButton");
    editButton.addEventListener("click", edit.bind(null, i));

    mainTag.appendChild(divElement);    
  }}
}

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

