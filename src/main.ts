const defaultText = 'Sample text';
const defaultColor = '#1976D2';

let currentText = defaultText;
let currentColor = defaultColor;

function generate4BitGrayscale() {
  let channel = 16;
  return [
    '#000',
    ...new Array(15).fill('').map(() => {
      const hexChannel = channel.toString(16);
      const color = `#${hexChannel}${hexChannel}${hexChannel}`;
      channel += 16;
      return color;
    }),
    '#fff',
  ];
}

const textInput = document.querySelector<HTMLInputElement>(
  'input#text-entry-field'
)!;
const colorInput = document.querySelector<HTMLInputElement>(
  'input#text-color-field'
)!;
const swatchContainer = document.querySelector<HTMLDivElement>(
  'div.text-color-display'
)!;

textInput.value = defaultText;
colorInput.value = defaultColor;

textInput.addEventListener('change', (e) => {
  currentText = (e.currentTarget as HTMLInputElement).value;
  renderSwatches(currentText, currentColor);
});

colorInput.addEventListener('change', (e) => {
  currentColor = (e.currentTarget as HTMLInputElement).value;
  renderSwatches(currentText, currentColor);
});

function renderSwatches(text = defaultText, color = defaultColor) {
  swatchContainer.innerHTML = generate4BitGrayscale()
    .map(
      (c, i, arr) => `
      <div
        class="swatch"
        style="background-color: ${c}; border: 1px solid ${
        arr[arr.length - 1 - i]
      }">
        <span class="text" style="color: ${color}">${text}</span>
      </div>`
    )
    .join('\n');
}

renderSwatches();
