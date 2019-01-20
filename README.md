# Dyslexi

This extension makes reading articles easier for those who have dyslexia or other reading ailments. It's estimated that 1 in 10 people are dyslexic. If we make reading even slightly easier, it's a win in our book.

# Contributing

We're running on React. You can check out the React components under `src/components` and the styles we use under `src/styles`. The app is loaded in at `src/content.js`, so you can follow the files from there to figure out where everything is.

Bootstrapped with Create React App, and uses [this guide](https://veerasundar.com/blog/2018/05/how-to-create-a-chrome-extension-in-react-js/) and [that guide](https://medium.com/@gilfink/building-a-chrome-extension-using-react-c5bfe45aaf36) to make things work. You don't have to read these, they're just for reference.

## Building

Whenever you make a change, you'll have to rebuild the extension so that the changes you made are compiled down into the extension. Run `yarn build` to generate a `build` folder. Then, add the `build` folder as an unpacked extension in the Chrome extensions page. You should see the extension on your toolbar. Remember to rebuild after you make changes. Happy experimenting!

## Issues

- I have no idea what the numbers correspond to in /public/static/js/background.js

## Contributing

Make pull requests or issues as you see fit!