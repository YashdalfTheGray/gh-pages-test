const defaultText = 'Sample text';
const defaultColor = '#03a9f4';
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
  updateSwatches(currentText, currentColor, isColorBackground);
});

colorInput.addEventListener('change', (e) => {
  currentColor = (e.currentTarget as HTMLInputElement).value;
  updateSwatches(currentText, currentColor, isColorBackground);
});

useColorForBackground.addEventListener('change', (e) => {
  isColorBackground = (e.currentTarget as HTMLInputElement).checked;
  updateSwatches(currentText, currentColor, isColorBackground);
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
        style="--animation-order: ${i}; background-color: ${
        isColorBackground ? color : c
      }; border: 1px solid ${arr[arr.length - 1 - i]}">
        <span class="text" style="color: ${
          isColorBackground ? c : color
        }">${text}</span>
      </div>`
    )
    .join('\n');
}

function updateSwatches(
  text: string,
  color: string,
  isColorBackground: boolean
) {
  const swatches = swatchContainer.querySelectorAll<HTMLDivElement>('.swatch');
  if (swatches.length === 0) {
    renderSwatches();
  } else {
    const grayscale = generate4BitGrayscale();

    swatches.forEach((e, k) => {
      e.style.backgroundColor = isColorBackground ? color : grayscale[k];
      const textContainer = e.querySelector<HTMLSpanElement>('.text');
      if (textContainer) {
        textContainer.style.color = isColorBackground ? grayscale[k] : color;

        // only do this if it is required, we get animations this way
        // and also we don't do unnecessary work
        if (textContainer.innerText !== text) {
          e.innerHTML = `<span class="text" style="color: ${
            isColorBackground ? grayscale[k] : color
          }">${text}</span>`;
        }
      }
    });
  }
}

renderSwatches();
