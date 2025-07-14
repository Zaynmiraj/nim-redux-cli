# nim-redux-cli

⚡ A powerful CLI tool to quickly set up Redux with either RTK Query or traditional reducers for React, Next.js, React Native, and Expo projects.

---

## 🔧 What does it do?

This CLI automatically:

- Detects your project type (React, Next.js, React Native, or Expo)
- Asks you to choose between RTK Query or a Normal Reducer setup
- Creates all necessary Redux folder structure and files
- Injects the Redux `<Provider>` into the correct app entry point
- Installs all required dependencies
- Includes optional auth mutation setup for RTK Query

---

## 📦 Installation

Install globally via npm:

```bash
npm install -g nim-redux-cli
```

Or use it directly without installing globally:

```bash
npx nim-redux-cli
```

---

## 🚀 Getting Started

First, create your project using your preferred framework:

```bash
npx create-react-app my-app
# or
npx create-next-app my-app
# or
npx create-expo-app my-app
# or
npx @react-native-community init my-app
```

Then, navigate to your project folder:

```bash
cd my-app
```

Run the tool:

```bash
npx nim-redux-cli
```

You’ll be prompted to choose a Redux setup type:

- RTK Query
- Normal Reducer

Based on your selection, it will generate the required structure and logic.

---

## 🧱 File Structure Generated

Depending on your choice, this tool will create files like:

For RTK Query:

```
src/
  redux/
    store.js
    service/
      backendApi.js
      authSlice.js
  utils/
    constant.js
  lib/
    axios.js
```

For Normal Reducer:

```
src/
  redux/
    store.js
    slices/
      authSlice.js
```

Additionally, the tool will wrap your app with the Redux `<Provider>` in the correct entry file:

- React: `src/main.jsx` or `src/main.js` or `src/main.tsx`
- Next.js: `app/layout.jsx` or `pages/_app.js` or `pages/_app.tsx`
- React Native: `App.js` or `App.tsx` or `App.jsx`
- Expo: `app/_layout.js` or `app/_layout.jsx` or `app/_layout.tsx`

---

## 📦 Dependencies Installed Automatically

- `@reduxjs/toolkit`
- `react-redux`
- `axios` (for RTK Query setup)

---

## 🧪 Example Output

```bash
npx nim-redux-cli
```

```
? Choose Redux setup: (Use arrow keys)
❯ RTK Query
  Normal Reducer

📁 Created directory: /your-project/src/redux
📄 Created file: /your-project/src/redux/store.js
📄 Created file: /your-project/src/redux/service/backendApi.js
📄 Created file: /your-project/src/redux/service/authSlice.js
📄 Created file: /your-project/src/utils/constant.js
📄 Created file: /your-project/src/lib/axios.js
🧵 <Provider> wrapped in /your-project/App.js
✅ RTK Query setup complete for react-native project.
👨‍💻 Thanks for using this tool and to the creators of the tool. Have a great day!
🌐 Visit my website: https://www.zaynmiraj.com
```

---

## 💡 Tips

- You can rerun this command if you want to switch between RTK and Reducer setup (but be cautious of overwriting existing files).
- Works best in a clean/new project scaffolded with Create React App, Next.js, React Native, or Expo.

---

## 🙏 Credits

Built by **ZaYn Miraj**  
CLI Creator: [@zaynmiraj](https://www.zaynmiraj.com)

---

## 🪪 License

MIT License
Copyright (c) 2025 ZaYn Miraj

# nim-redux-cli

⚡ A powerful CLI tool to quickly set up Redux with either RTK Query or traditional reducers for React, Next.js, React Native, and Expo projects.

---

## 🔧 What does it do?

This CLI automatically:

- Detects your project type (React, Next.js, React Native, or Expo)
- Asks you to choose between RTK Query or a Normal Reducer setup
- Creates all necessary Redux folder structure and files
- Injects the Redux `<Provider>` into the correct app entry point
- Installs all required dependencies
- Includes optional auth mutation setup for RTK Query

---

## 📦 Installation

Install globally via npm:

```bash
npm install -g nim-redux-cli
```

Or use it directly without installing globally:

```bash
npx nim-redux-cli
```

---

## 🚀 Getting Started

First, create your project using your preferred framework:

```bash
npx create-react-app my-app
# or
npx create-next-app my-app
# or
npx create-expo-app my-app
# or
npx @react-native-community init my-app
```

Then, navigate to your project folder:

```bash
cd my-app
```

Run the tool:

```bash
npx nim-redux-cli
```

You’ll be prompted to choose a Redux setup type:

- RTK Query
- Normal Reducer

Based on your selection, it will generate the required structure and logic.

---

## 🧱 File Structure Generated

Depending on your choice, this tool will create files like:

For RTK Query:

```
src/
  redux/
    store.js
    service/
      backendApi.js
      authSlice.js
  utils/
    constant.js
  lib/
    axios.js
```

For Normal Reducer:

```
src/
  redux/
    store.js
    slices/
      authSlice.js
```

Additionally, the tool will wrap your app with the Redux `<Provider>` in the correct entry file:

- React: `src/main.jsx` or `src/main.js` or `src/main.tsx`
- Next.js: `app/layout.jsx` or `pages/_app.js` or `pages/_app.tsx`
- React Native: `App.js` or `App.tsx` or `App.jsx`
- Expo: `app/_layout.js` or `app/_layout.jsx` or `app/_layout.tsx`

---

## 📦 Dependencies Installed Automatically

- `@reduxjs/toolkit`
- `react-redux`
- `axios` (for RTK Query setup)

---

## 🧪 Example Output

```bash
npx nim-redux-cli
```

```
? Choose Redux setup: (Use arrow keys)
❯ RTK Query
  Normal Reducer

📁 Created directory: /your-project/src/redux
📄 Created file: /your-project/src/redux/store.js
📄 Created file: /your-project/src/redux/service/backendApi.js
📄 Created file: /your-project/src/redux/service/authSlice.js
📄 Created file: /your-project/src/utils/constant.js
📄 Created file: /your-project/src/lib/axios.js
🧵 <Provider> wrapped in /your-project/App.js
✅ RTK Query setup complete for react-native project.
👨‍💻 Thanks for using this tool and to the creators of the tool. Have a great day!
🌐 Visit my website: https://www.zaynmiraj.com
```

---

## 💡 Tips

- You can rerun this command if you want to switch between RTK and Reducer setup (but be cautious of overwriting existing files).
- Works best in a clean/new project scaffolded with Create React App, Next.js, React Native, or Expo.

---

## 🙏 Credits

Built by **ZaYn Miraj**  
CLI Creator: [@zaynmiraj](https://www.zaynmiraj.com)

---

## 🪪 License

MIT License
