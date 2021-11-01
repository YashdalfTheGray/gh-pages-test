[![Deployment](https://github.com/YashdalfTheGray/contrast-test/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/YashdalfTheGray/contrast-test/actions/workflows/build-and-deploy.yml)
# contrast-test

This repository started out as a way to test a deploy to GitHub pages action but then turned into a contrast testing tool for type and color.

It takes inspiration from medical contrast testing.

## How to use

This tool is meant to show you the contrast between differnt shades of black and white background and your selected color. You also have the ability to change the text to say what you want it to say.

Once you provide some text and a color, you'll see swatches rendering the given text in the given color laid over different shades of gray, including black and white. You can use the "Use color as background" toggle to invert this relationship and use the color as the background and the grayscale as the text color.

## Development

This tool is written in Typescript and SASS. To keep it simple, it just uses `tsc` and UglifyJS to transpile and productionize the Typescript code. It uses the `sass` Node.js module (also known as `dart-sass`) to compile and productionize the SASS code. Concatenation isn't included in the toolchain because it is not complex enough for the whole Webpack build toolchain.

This project does have a watch mode, both `tsc` and `sass` executables support a watch mode and reprocess the files as changes are made. Development is as easy as running an `npm install` and then an `npm run watch`.

You can then open the `docs/index.html` file in your browser to see your changes.
