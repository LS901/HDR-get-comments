# Intro

This is my submission for the HDR UK coding test: implementing a service which consumes this API: https://jsonplaceholder.typicode.com/comments and returns paginated data in a JSON
format for use on whatever the data is needed for.

Key Points:

- This was built by Vite as a TypeScript + React project - Using a bit of Tailwind, and Jest for unit testing
- The `/service` folder and the `/tests` folder are the main parts of this in terms of what has been asked for in the criteria
- I decided to create a minimal user interface as well for some better visualisation of the data.

# Building the project

Run:

`npm install`
`npm build`
_For the UI:_`npm run dev`

When calling the service; the default values are `page=1`, `total=25` and an empty omit string. In order to
omit values correctly, the input string should be a **comma delimited string** (as set out by instructions) e.g.: `name,email`

# Testing

Tests can be run by `npm run test` 

- The tests were set up the match the acceptance criteria within the instructions document, plus ones around errors
- It is worth mentioning I focused more on the value of the tests themselves, more so than coverage, as laid out in the instructions.

# UI Component

I decided to build the UI as it does allow a bit of extra visualisation of the data if it was ever needed, but I am aware this isn't exactly necessary. 
As a result, please be aware that this is why the UI is very minimal.

# How have I made this production ready?

- Installed and incorporated ESLint which can be ran by `npm run lint` to ensure there are no errors or problems when building
- Refactored code where necessary
- Detailed commenting of code
- Following consistent coding conventions throughout such as typographical conventions
- I used TypeScript because of the extra level of security and robustness it ensures against potential regressions that can occur from incorrect typing
