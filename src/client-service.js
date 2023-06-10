let mainTag = document.querySelector('main');

fetch(`https://ddragon.leagueoflegends.com/cdn/11.11.1/data/en_US/champion.json`)
  .then(response => response.json())
  .then(data => {

    const filteredChampions = Object.values(data.data).filter(champion => {
      console.log(champion.name.toLowerCase().startsWith("A"));
    });


    const champions = data.data;
    for (const championKey in champions) {

      const champion = champions[championKey];
      const championName = champion.id;



      const championIcon = champion.image.full
      const championImg = `https://ddragon.leagueoflegends.com/cdn/11.11.1/img/champion/${championIcon}`;

      // Main Space
      const divElement = document.createElement('div');

      divElement.classList.add("card");

      // Card
      divElement.innerHTML = `
      <div class="card">
        <h3 class="card">${championName}</h3>
        <img class="card" src="${championImg}"/>
      </div>
      `

      mainTag.appendChild(divElement)
      
    }
  })
  .catch(error => {
    console.error('Erro:', error);
  });


  const search = (value) => {

    mainTag.innerHTML = ''

  fetch(`https://ddragon.leagueoflegends.com/cdn/11.11.1/data/en_US/champion.json`)
  .then(response => response.json())
  .then(data => {

    const filteredChampions = Object.values(data.data).filter(champion => {
      console.log(champion.name.toLowerCase().startsWith("A"));
    });


    const champions = data.data;
    for (const championKey in champions) {

      const champion = champions[championKey];
      const championName = champion.id;

      if(championName.toLowerCase().startsWith(value.toLowerCase())) {

      const championIcon = champion.image.full
      const championImg = `https://ddragon.leagueoflegends.com/cdn/11.11.1/img/champion/${championIcon}`;

      // Main Space
      const divElement = document.createElement('div');

      divElement.classList.add("card");

      // Card
      divElement.innerHTML = `
      <div class="card">
        <h3 class="card">${championName}</h3>
        <img class="card" src="${championImg}"/>
      </div>
      `

      mainTag.appendChild(divElement)
      }
    }

  })
  .catch(error => {
    console.error('Erro:', error);
  });
  }

const send = () => {

  var inputName = document.getElementById('input-name');
  var inputImg = document.getElementById('input-img');

  var valueName = inputName.value;
  var valueImg = inputImg.value;

  const divElement = document.createElement('div');
  divElement.innerHTML = `
  <div class="card">
    <h3 class="card">${valueName}</h3>
    <img class="card" src="${valueImg}"/>
  </div>
  `

  mainTag.appendChild(divElement)

  
}