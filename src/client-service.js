// Configs
const apiUrl = 'https://ddragon.leagueoflegends.com/cdn/11.11.1/data/en_US/champion.json';
// const jsonServerUrl = 'http://localhost:3000/champions';

const fetchChampions = async (value) => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const champions = Object.values(data.data);
    let mainTag = document.querySelector('main');
    mainTag.innerHTML = ''
    
    champions.forEach(champion => {
      const championName = champion.id;
      const championIcon = champion.image.full;

    if(championName.toLowerCase().startsWith(value.toLowerCase())) {

      const championImg = `https://ddragon.leagueoflegends.com/cdn/11.11.1/img/champion/${championIcon}`;

      const divElement = document.createElement('div');
      divElement.classList.add("card");

      divElement.innerHTML = `
        <div class="card">
          <h3 class="card">${championName}</h3>
          <img class="card" src="${championImg}"/>
        </div>
      `;
      mainTag.appendChild(divElement);
    }});
  } catch (error) {
    console.error('Erro:', error);
  }
};

const search = async (value) => {
  await fetchChampions(value);
}

const send = () => {

  const inputName = document.getElementById('input-name');
  const inputImg = document.getElementById('input-img');

  const valueName = inputName.value,
        valueImg = inputImg.value;

  const divElement = document.createElement('div');
  divElement.innerHTML = `
    <div class="card">
      <h3 class="card">${valueName}</h3>
      <img class="card" src="${valueImg}"/>
    </div>
  `
  console.log(
    valueName +
    "\n- - -\n" +
    valueImg
  )

  // Problem
  // mainTag.appendChild(divElement)
}

// Starting with Default
fetchChampions('');