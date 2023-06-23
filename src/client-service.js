// Configs
const apiUrl = 'http://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion.json';

// const apiChamp = `http://ddragon.leagueoflegends.com/cdn/img/champion/${champion}/`

let cardList = document.querySelector('.card-list');

// Starts App
const fetchIsso = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  const champions = Object.values(data.data);

  champions.forEach(champion => {
      const championName = champion.id;
      const championIcon = `https://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/${champion.image.full}`;    
      
      let key = localStorage.length + 1;

      const champ = {
        key: key,
        name: championName,
        img: championIcon
      };
      localStorage.setItem( key, JSON.stringify(champ));
  });
}

const showInfo = async (id) => {

  const champion = JSON.parse(localStorage.getItem(id));
  const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion/${champion.name}.json`);
  const data = await response.json();
  const champ = Object.values(data.data);

  const champName = champ[0].name;
  const champSkins = champ[0].skins;

  console.log(champSkins[0].num)
  console.log(champ[0].name)


  const carousel = document.querySelector('.carousel-wrapper');

  // Create Spans
  for(let n = 1; n <= champSkins.length; n++) {
    let spanItem = document.createElement('span')
    spanItem.id = `item-${n}`
    
    carousel.appendChild(spanItem)
  }

  // Create itens
  for(let n = 1; n <= champSkins.length; n++) {
    let carouselItem = document.createElement('div')
    carouselItem.classList.add('carousel-item')
    carouselItem.classList.add(`item-${n}`)
    
    carousel.appendChild(carouselItem)
  }

  //Create other itens
  for(let n = 1; n <= champSkins.length; n++) {
    let carouselItem = document.querySelector(`.item-${n}`)
    
      let aPrev = document.createElement('a')
      let aNext = document.createElement('a')

      aPrev.classList.add('arrow-prev', 'arrow')
      aNext.classList.add('arrow-next', 'arrow')

      aPrev.href = `#item-${n === 1 ? champSkins.length : n - 1}`;
      aNext.href = `#item-${n === champSkins.length ? 1 : n + 1}`;

      console.log(`#item-${n === 1 ? champSkins.length : n - 1}`)
      console.log(`#item-${n === champSkins.length ? 1 : n + 1}`)

      carouselItem.appendChild(aPrev)
      carouselItem.appendChild(aNext)
  }

  // Setting champ images
  for(let n = 0; n < champSkins.length; n++) {
    let carouselItem = document.querySelector(`.item-${n + 1}`)

    console.log 
    carouselItem.style.backgroundImage = `url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_${champSkins[n].num}.jpg')`;
  }


  
  let modal = document.querySelector(".modal-info");
  let imgDiv = document.querySelector(".champion-img-info");

  // let imgElement = document.createElement("img"); 
  // imgElement.src = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.name}_0.jpg`
  // imgDiv.appendChild(imgElement)


  let closeBtn = document.querySelector(".close");
  modal.style.display = "flex";


  // closeBtn.removeEventListener('click', closeBtn);
  // closeBtn.addEventListener('click', () => {
  //   modal.style.display = "none";
  //   championImage.innerHTML = ''
  //   champFromLocalStorage = ''
  // }, { once: true });


  
  champFromLocalStorage = ''
  id = ''
}

const fetchSplashs = async () => {
  const response = await fetch(apiChamp)
}


const add = () => {

  let modal = document.getElementsByClassName("modal")[0];

  let inputName = document.querySelector(".input-edit-name")
  let inputImage = document.querySelector(".input-edit-img")
  
  let championImage = document.querySelector(".champion-img")
  let imgElement = document.createElement("img"); 
  
  // Removing text if exists
  inputName.value = ''
  inputImage.value = ''

  inputImage.addEventListener('input', () => {
    console.log("entrou auqi")
    imgElement.src = `${inputImage.value}`
    championImage.appendChild(imgElement)
  })
  
  let editBtn = document.querySelector(".edit-btn");
  let closeBtn = document.querySelector(".close");
  editBtn.textContent = "Adicionar campeão"

  modal.style.display = "flex";

  closeBtn.removeEventListener('click', closeBtn);
  closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
    championImage.innerHTML = ''
    imgElement = ''
  }, { once: true } );

  editBtn.removeEventListener('click', editBtn);
  editBtn.addEventListener('click', () => {
    let champName = inputName.value,
        champImg = inputImage.value
    
    let champ = {
      name: champName,
      img: champImg
    }  

    send(champ)

    championImage.innerHTML = ''
    imgElement = ''
    modal.style.display = "none";
  }, { once: true });
}

const send = (champ) => {
 
  console.log("Sim, recebo o champ: \n " + champ)
  let key = localStorage.length + 1
  localStorage.setItem(key, JSON.stringify(champ));
  insertChamp('');
}



const edit = (id) => { 

  console.log("Id: " + id)

  let modal = document.getElementsByClassName("modal")[0];
  let champFromLocalStorage = JSON.parse(localStorage.getItem(id));

  let editBtn = document.querySelector(".edit-btn");
  let closeBtn = document.querySelector(".close");

  editBtn.textContent = "Editar campeão"

  let inputName = document.querySelector(".input-edit-name")
  let inputImage = document.querySelector(".input-edit-img")
  let championImage = document.querySelector(".champion-img")
  let imgElement = document.createElement("img"); 

  modal.style.display = "flex";

  inputName.value = champFromLocalStorage.name;
  inputImage.value = champFromLocalStorage.img;
  imgElement.src=`${champFromLocalStorage.img}`
  championImage.appendChild(imgElement)


  closeBtn.removeEventListener('click', closeBtn);
  closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
    championImage.innerHTML = ''
    champFromLocalStorage = ''
    id = ''
  }, { once: true });

  editBtn.removeEventListener('click', editBtn);
  editBtn.addEventListener('click', () => {
    let champFromLocalStorage2 = JSON.parse(localStorage.getItem(id));

    champFromLocalStorage2.name = inputName.value
    champFromLocalStorage2.img = inputImage.value

    localStorage.setItem(id, JSON.stringify(champFromLocalStorage2));
    modal.style.display = "none";
    championImage.innerHTML = ''
    id = ''

    insertChamp('');
  }, { once: true });
}




const remove = (id) => {
  console.log("Excluir ..." + id)
  let champFromLocalStorage = JSON.parse(localStorage.getItem(id));
  console.log("Objeto sendo excluido " + champFromLocalStorage.name)
  console.log("Objeto: " + champFromLocalStorage)

  localStorage.removeItem(id);
  insertChamp('');
}

// Inserts Champions
const insertChamp = (value) => {
  
  cardList.innerHTML = ''   // Reset cardList
  // For champ in api do:
  for (let i = 1; i < localStorage.length + 1; i++) {
    champFromLocalStorage = JSON.parse(localStorage.getItem(i));
    if(champFromLocalStorage != null) {

  // Just show champs that are being search
  if(champFromLocalStorage.name.toLowerCase().startsWith(value.toLowerCase()) && champFromLocalStorage.name != null) {
    
    // Creating cards 
    const cardElement = document.createElement('div');
    cardElement.classList.add("card-list");

    cardElement.innerHTML = `
        <div class="card"> 
          <div class="card-image">
            <img src="${champFromLocalStorage.img}"/>
            <button class="infoButton">I</button>

            <button class="editButton">Edit</button>
            <button class="removeButton">Excluir</button>


          </div>
          <h3>${champFromLocalStorage.name}</h3>
        </div>
    `;

    const editButton = cardElement.querySelector(".editButton");
    const removeButton = cardElement.querySelector(".removeButton");
    const infoButton = cardElement.querySelector(".infoButton");
  
    const imgElement = cardElement.querySelector(".card-image");

    editButton.addEventListener("click", edit.bind(null, i));
    removeButton.addEventListener("click", remove.bind(null, i));
    infoButton.addEventListener("click", showInfo.bind(null, i));

    imgElement.addEventListener("mouseenter", unhideElements.bind())
    imgElement.addEventListener("mouseleave", hideElements.bind());
    




    cardList.appendChild(cardElement); 
    const container = document.querySelector(".container");
    container.appendChild(cardList)
    }  
  }}
}

const search = async (value) => {
  insertChamp(value);
}

const unhideElements = (i , id) => {
  const divElement = event.target;
  const divButtons = divElement.querySelectorAll('button');
  divButtons.forEach(button => {
    button.style.zIndex = 1;
  })
}

const hideElements = () => {
  const divElement = event.target;
  const divButtons = divElement.querySelectorAll('button');
  divButtons.forEach(button => {
    button.style.zIndex = -1;
  })
}


// Starting with Default
fetchIsso();
insertChamp('');
localStorage.clear();
