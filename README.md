# nim-redux-init

**A CLI tool to quickly scaffold Redux/RTK Query setup in React, Next.js, React Native, and Expo projects.**

---

## Features

- Generate Redux store and auth slice with RTK Query or normal reducer setup
- Auto-detect project type: React, Next.js, React Native, or Expo
- Inject Redux Provider in your app entry point automatically
- Creates folder structure and boilerplate files
- Installs required dependencies automatically

---

## Installation

You can install the CLI globally via npm:


npm install -g nim-redux-init
Or use npx to run it without installing globally:



npx nim-redux-init
Usage
Run the CLI command anywhere inside your React/Next.js/React Native/Expo project root:



nim-redux-init
You'll be prompted to select your Redux setup type:

RTK Query: Includes Redux Toolkit Query setup with API slice and auth endpoints

Normal Reducer: Classic Redux Toolkit slice and store setup without RTK Query

The CLI will:

Create necessary folders and files (src/redux, src/redux/slices, src/redux/service, etc.)

Add a Redux Provider wrapper around your app's root component (App.js, app/layout.js, _layout.js, etc.)

Install Redux Toolkit, React-Redux, Axios, and other dependencies automatically

Supported Project Types
React (Create React App or similar)

Next.js

React Native

Expo

Example

nim-redux-init
Output:

swift

? Choose Redux setup: (Use arrow keys)
❯ RTK Query
  Normal Reducer

📁 Created directory: /path/to/project/src/redux
📄 Created file: /path/to/project/src/redux/store.js
📄 Created file: /path/to/project/src/redux/service/backendApi.js
...
🧵 <Provider> wrapped in /path/to/project/App.js
✅ RTK Query setup complete for react project.
Development
To link your local copy globally for testing:
npm link

Then run:

nim-redux-init
License
MIT License
