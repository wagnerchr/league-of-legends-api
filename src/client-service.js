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

const edit = (id) => { 

  console.log("Id: " + id)

  let modal = document.getElementsByClassName("modal")[0];
  let champFromLocalStorage = JSON.parse(localStorage.getItem(id));

  let inputName = document.querySelector(".input-edit-name")
  let inputImage = document.querySelector(".input-edit-img")
  let championImage = document.querySelector(".champion-img")
  let imgElement = document.createElement("img"); 

  modal.style.display = "flex";

  inputName.value = champFromLocalStorage.name;
  inputImage.value = champFromLocalStorage.img;
  imgElement.src=`${champFromLocalStorage.img}`
  championImage.appendChild(imgElement)

  console.log("Valores: " + champFromLocalStorage)

  let closeBtn = document.querySelector(".close");
  closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
    championImage.innerHTML = ''
    champFromLocalStorage = ''
    id = ''
  });

  let editBtn = document.querySelector(".edit-btn");
  editBtn.addEventListener('click', () => {
    let champFromLocalStorage2 = JSON.parse(localStorage.getItem(id));

    champFromLocalStorage2.name = inputName.value
    champFromLocalStorage2.img = inputImage.value

    localStorage.setItem(id, JSON.stringify(champFromLocalStorage2));
    modal.style.display = "none";
    championImage.innerHTML = ''
    id = ''
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

