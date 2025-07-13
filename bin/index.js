#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const { execSync } = require("child_process");

const cwd = process.cwd();

// Directory paths
const reduxDir = path.join(cwd, "src/redux");
const slicesDir = path.join(reduxDir, "slices");
const serviceDir = path.join(reduxDir, "service");
const utilsDir = path.join(cwd, "src/utils");
const libDir = path.join(cwd, "src/lib");

// Detect project type
function detectProjectType() {
  if (fs.existsSync(path.join(cwd, "next.config.js"))) return "nextjs";
  if (fs.existsSync(path.join(cwd, "app/_layout.js"))) return "expo";
  if (
    fs.existsSync(path.join(cwd, "android")) ||
    fs.existsSync(path.join(cwd, "ios"))
  )
    return "react-native";
  return "react"; // default: CRA
}

// Entry file detection
function findAppEntryFile(type) {
  const files = {
    react: ["src/main.js", "src/main.tsx", "src/main.jsx"],
    nextjs: ["app/layout.js", "app/layout.tsx", "app/layout.jsx"],
    "react-native": ["App.js", "App.tsx", "App.jsx"],
    expo: ["app/_layout.js", "app/_layout.tsx", "app/_layout.jsx"],
  };
  return files[type].find((f) => fs.existsSync(path.join(cwd, f)));
}

// Ensure folder exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
}

// Create file if it doesn't exist
function writeFile(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`📄 Created file: ${filePath}`);
  }
}

// Install required dependencies
function installDependencies(deps) {
  console.log("📦 Installing dependencies...");
  try {
    execSync(`npm install ${deps.join(" ")}`, { stdio: "inherit" });
    console.log("✅ Dependencies installed successfully.");
  } catch (err) {
    console.error("❌ Failed to install dependencies.", err);
  }
}

// Inject <Provider> into app entry
function injectProvider(appFilePath, type) {
  if (!fs.existsSync(appFilePath)) {
    console.warn("❌ App entry file not found.");
    return;
  }

  let content = fs.readFileSync(appFilePath, "utf8");
  if (content.includes("Provider")) {
    console.log("✅ Provider already injected.");
    return;
  }

  const importStore =
    type === "nextjs" || type === "expo"
      ? "import { store } from '../redux/store';"
      : "import { store } from './redux/store';";

  const updated = `
import { Provider } from 'react-redux';
${importStore}

${content
  .replace(/export default function [^\(]+\(/, (match) => `${match}`)
  .replace(/return\s*\(/, "return (\n  <Provider store={store}>")
  .replace(/\n\);/, "\n  </Provider>\n);")}
`;

  fs.writeFileSync(appFilePath, updated, "utf8");
  console.log(`🧵 <Provider> wrapped in ${appFilePath}`);
}

// RTK Query Setup
function createRTKFiles() {
  const storeCode = `
import { configureStore } from "@reduxjs/toolkit";
import backendApi from "./service/backendApi";
import { NODE_ENV } from "../utils/constant";

export const store = configureStore({
  reducer: {
    [backendApi.reducerPath]: backendApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(backendApi.middleware),
  devTools: NODE_ENV === "development",
});

export default store;
`;

  const backendApi = `
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constant";

const backendApi = createApi({
  tagTypes: ["FetchMyChatList", "GetPatient"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL || "http://localhost:3000/api/v1",
    credentials: "include",
    withCredentials: true,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.user?.token;
      if (token) headers.set("Authorization", \`Bearer \${token}\`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default backendApi;
`;

  const authSlice = `
import backendApi from "./backendApi";

const AuthSlice = backendApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    accountVerify: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-account",
        method: "POST",
        body: data,
      }),
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useAccountVerifyMutation,
  useResendOtpMutation,
} = AuthSlice;
`;

  const constant = `
export const BASE_URL = "http://192.168.1.104:3000/api/v1";
export const NODE_ENV = "development";
`;

  const axiosFile = `
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
`;

  ensureDir(reduxDir);
  ensureDir(serviceDir);
  ensureDir(utilsDir);
  ensureDir(libDir);

  writeFile(path.join(reduxDir, "store.js"), storeCode);
  writeFile(path.join(serviceDir, "backendApi.js"), backendApi);
  writeFile(path.join(serviceDir, "authSlice.js"), authSlice);
  writeFile(path.join(utilsDir, "constant.js"), constant);
  writeFile(path.join(libDir, "axios.js"), axiosFile);
}

// Normal Reducer Setup
function createReducerFiles() {
  const store = `
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
`;

  const auth = `
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
`;

  ensureDir(reduxDir);
  ensureDir(slicesDir);

  writeFile(path.join(reduxDir, "store.js"), store);
  writeFile(path.join(slicesDir, "authSlice.js"), auth);
}

// Main function
async function main() {
  const { setupType } = await inquirer.prompt([
    {
      type: "list",
      name: "setupType",
      message: "Choose Redux setup:",
      choices: ["RTK Query", "Normal Reducer"],
    },
  ]);

  const projectType = detectProjectType();
  const entryFile = findAppEntryFile(projectType);

  if (setupType === "RTK Query") {
    createRTKFiles();
    installDependencies(["@reduxjs/toolkit", "react-redux", "axios"]);
  } else {
    createReducerFiles();
    installDependencies(["@reduxjs/toolkit", "react-redux"]);
  }

  if (entryFile) {
    injectProvider(path.join(cwd, entryFile), projectType);
  } else {
    console.warn("⚠️ Could not detect App entry file to wrap <Provider>.");
  }

  console.log(`✅ ${setupType} setup complete for ${projectType} project.`);
  //thanks for using this tool and to the creators of the tool
  console.log(
    `👨‍💻 Thanks for using this tool and to the creators of the tool. Have a great day!`
  );
  //visit our website
  console.log(`🌐 Visit my website: https://www.zaynmiraj.com`);
}

main();
