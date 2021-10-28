const defaultText = 'Sample text';
const defaultColor = '#1976D2';

let currentText = defaultText;
let currentColor = defaultColor;

function generate4BitGrayscale() {
  let channel = 0;
  return new Array(17).fill('').map(() => {
    const hexChannel = channel.toString(16);
    const color = `#${hexChannel}${hexChannel}${hexChannel}`;
    channel += 16;
    return color;
  });
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
        key={${c}}
        style={{
          backgroundColor: ${c},
          border: 1px solid ${arr[arr.length - 1 - i]},
        }}>
        <span style={{ color: ${color} }}>${text}</span>
      </div>`
    )
    .join('\n');
}

renderSwatches();
