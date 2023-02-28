# Circle Payments Dashboard

This is a dashboard for the Circle interview process. It is a dashboard which shows payments and allows the user to create payments as per the requirements in the root README.

## Getting Started
(after starting the local API server)
`npm install && npm run dev` should be sufficient. The terminal should indicate a localhost port to navigate to in your browser; I believe the default is http://localhost:5173/

*Note: I noticed the backend server had trouble starting under `Node 18`. I would use [nvm](https://github.com/nvm-sh/nvm) and `Node 18` to run the server.*

## Design Choices
- Using TypeScript. I try to always use TypeScript.
- Container/presenter pattern. I like this pattern because it allows me to separate the API and overall state from the UI a bit.
- Separate out types/constants/api calls.
- The requirements specified to display the sender, receiver, amount, and currency -- I added a hover tooltip to allow the user to display the other details
- I chose Material UI because I've been using it in my personal projects lately. I find it has everything I need and is similar in technical design to the custom component library I wrote at Amazon. I prefer to manage styles in JS using `styled-components` and similar patterns.
- I used vite for the first time on this project. It was relatively painless and I don't know that the project was big enough to see the differences vs. webpack/create-react-app but I wanted to try it out.
- I'm using "native" React features to handle state because I don't think the app demands anything more in its current state.
- Fun rainbow title. I'm not an animations expert but this was a simple fun way to add some life to the application.

## Future work
Because of limited time, there are many things that I could not do and would need to consider for a production application. Here are some of them:
- Add unit/e2e tests
- More systematic validation; the validateInput function is very rudimentary and I would probably use a form library and/or something like [Yup](https://github.com/jquense/yup) to handle validation in a production application
- Tweak UI alignment to be perfect; systematize things like padding and color to be in a theme; probably remove the css file and put everything in js to keep style consistent
- Consider using Redux/MobX for state management if this application is sufficiently complex
- Instrumentation with logging/metrics/alarms


Love,

Thomas Augustus Grice