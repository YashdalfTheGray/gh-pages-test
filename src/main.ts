const defaultText = 'Sample text';
const defaultColor = '#1976D2';
const isColorBackgroundByDefault = false;

let currentText = defaultText;
let currentColor = defaultColor;
let isColorBackground = isColorBackgroundByDefault;

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
const useColorForBackground = document.querySelector<HTMLInputElement>(
  'input#use-color-for-background-field'
)!;
const swatchContainer = document.querySelector<HTMLDivElement>(
  'div.text-color-display'
)!;

textInput.value = defaultText;
colorInput.value = defaultColor;
useColorForBackground.checked = isColorBackgroundByDefault;

textInput.addEventListener('change', (e) => {
  currentText = (e.currentTarget as HTMLInputElement).value;
  renderSwatches(currentText, currentColor);
});

colorInput.addEventListener('change', (e) => {
  currentColor = (e.currentTarget as HTMLInputElement).value;
  renderSwatches(currentText, currentColor);
});

useColorForBackground.addEventListener('change', (e) => {
  isColorBackground = (e.currentTarget as HTMLInputElement).checked;
  renderSwatches(currentText, currentColor, isColorBackground);
});

function renderSwatches(
  text = defaultText,
  color = defaultColor,
  isColorBackground = isColorBackgroundByDefault
) {
  swatchContainer.innerHTML = generate4BitGrayscale()
    .map(
      (c, i, arr) => `
      <div
        class="swatch"
        style="background-color: ${
          isColorBackground ? color : c
        }; border: 1px solid ${arr[arr.length - 1 - i]}">
        <span class="text" style="color: ${
          isColorBackground ? c : color
        }">${text}</span>
      </div>`
    )
    .join('\n');
}

renderSwatches();
