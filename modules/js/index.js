import hexagonFigure from "../gfx/hexagon.png";
import arrowFigure from "../gfx/up-chevron.png";
import "../style/index.css"

const hexSection = document.querySelector('#hex-section');
const selectElement = document.querySelector('#size-select');
const arraySection = document.querySelector('#array-section');
const wallsBtn = document.querySelector('#walls-btn');
const treasureBtn = document.querySelector('#treasure-btn');
const lightBtn = document.querySelector('#light-btn');
const saveBtn = document.querySelector('#save-btn');
const loadBtn = document.querySelector('#load-btn');
const goToHexBtn = document.querySelector("#go-to-hex")

wallsBtn.addEventListener('click', processButtonClick);
treasureBtn.addEventListener('click', processButtonClick);
lightBtn.addEventListener('click', processButtonClick);
saveBtn.addEventListener('click', saveOnServer);
loadBtn.addEventListener('click', loadFromServer);
goToHexBtn.addEventListener('click', () => {
  location.replace('/hex')
})

const hexagonInfo = {
  size: 0,
  levels: [],
};
let createArrowAndText = ''
let currentValue
function processButtonClick(event) {
  wallsBtn.style.color = 'black';
  treasureBtn.style.color = 'black';
  lightBtn.style.color = 'black';

  const clickedButton = event.target;
  clickedButton.style.color = 'blue';
}

function getHexagonId(row, col, hexCount) {
  return row * hexCount + col + 1;
}

function createHexagons() {
  hexSection.innerHTML = '';
  arraySection.innerHTML = '';

  const hexCount = parseInt(selectElement.value, 10) || 0;
  const hexSize = 30;
  const hexSpacing = 0.5;
  wallsBtn.style.color = 'blue';

  hexagonInfo.size = hexCount;

  for (let row = 0; row < hexCount; row++) {
    for (let col = 0; col < hexCount; col++) {
      const hexagonId = getHexagonId(row, col, hexCount);

      const hexContainer = document.createElement('div');
      hexContainer.style.position = 'absolute';

      const hexImg = document.createElement('img');
      hexImg.src = hexagonFigure;
      hexImg.height = Math.sqrt(3) * hexSize;
      hexImg.width = 2 * hexSize;

      const isEvenColumn = col % 2 === 1;

      if (isEvenColumn) {
        hexImg.style.marginTop = `${hexImg.width / 2}px`;
      }

      const xPos = col * (2 * hexSize + hexSpacing);
      const yPos = row * (Math.sqrt(3) * hexSize + hexSize / 2 + hexSpacing);
      hexContainer.style.left = `${xPos}px`;
      hexContainer.style.top = `${yPos}px`;

      hexContainer.appendChild(hexImg);
      hexSection.appendChild(hexContainer);

      const createArrowAndText = function (rotation, storedValue) {
        const group = document.createElement('div');
        group.style.position = 'absolute';
        group.style.left = '50%';
        group.style.top = isEvenColumn ? '65%' : '50%';

        const p = document.createElement('p');
        p.innerText = storedValue !== undefined ? storedValue.toString() : '';
        p.style.position = 'absolute';
        p.style.transform = 'translateX(-50%) translateY(-50%)';
        p.style.fontWeight = 'bolder'
        p.style.color = 'white';
        p.style.fontSize = '16px';
        p.style.left = '-5px';
        group.appendChild(p);

        const arrowImg = document.createElement('img');
        arrowImg.src = arrowFigure;
        arrowImg.height = 20;
        arrowImg.width = 20;
        arrowImg.style.transform = 'translateX(-50%) translateY(-50%) rotate(' + rotation + 'deg)';
        arrowImg.style.display = storedValue !== undefined ? 'block' : 'none';
        group.appendChild(arrowImg);

        hexContainer.appendChild(group);

        return { p, arrowImg };
      };

      const storedLevel = hexagonInfo.levels.find(l => l.id === hexagonId);
      const storedRotation = storedLevel ? (storedLevel.dirOut - 1) * 60 : 0;
      const { p, arrowImg } = createArrowAndText(storedRotation, storedLevel ? storedLevel.dirOut : undefined);

      hexContainer.addEventListener('click', function () {
        currentValue = parseInt(p.innerText, 10) || 0;
        currentValue = currentValue % 6 + 1;
        p.innerText = currentValue.toString();
        const rotation = (currentValue - 1) * 60;
        arrowImg.style.transform = `translateX(-50%) translateY(-50%) rotate(${rotation}deg)`;
        arrowImg.style.display = p.innerText ? 'block' : 'none';

        const dirIn = (currentValue + 2) % 6 + 1;
        const type = determineType();

        const level = {
          id: hexagonId,
          x: col,
          z: row,
          dirOut: currentValue,
          dirIn: dirIn,
          type: type,
        };
        const existingLevelIndex = hexagonInfo.levels.findIndex((l) => l.id === hexagonId);
        if (existingLevelIndex !== -1) {
          hexagonInfo.levels[existingLevelIndex] = level;
        } else {
          hexagonInfo.levels.push(level);
        }

        console.log(`Hexagon ${hexagonId} - Size: ${hexagonInfo.size}, Levels: ${JSON.stringify(hexagonInfo.levels)}`);
        updateArraySection();
      });
    }
  }
}

function determineType() {
  if (wallsBtn.style.color === 'blue') return 'wall';
  if (treasureBtn.style.color === 'blue') return 'treasure';
  if (lightBtn.style.color === 'blue') return 'light';
  return '';
}

function updateArraySection() {
  arraySection.innerHTML = `<pre class="black-text">${JSON.stringify(hexagonInfo, null, 2)}</pre>`;
}

function saveOnServer() {
  fetch('/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hexagonInfo),
  })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  alert('Zapisano na serwerze level')
}


function loadFromServer() {
  fetch('/load')
    .then(response => response.json())
    .then(data => {
      console.log('Loaded data:', data);
      console.log(data.levels);
      hexagonInfo.levels = data.levels;
      console.log(hexagonInfo.levels);
      selectElement.value = data.size
      createHexagons();
      arraySection.innerHTML = `<pre class="black-text">${JSON.stringify(data, null, 2)}</pre>`;
    })
    .catch(error => console.error('Error:', error));
}


selectElement.addEventListener('change', createHexagons);

createHexagons();