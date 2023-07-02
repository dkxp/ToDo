import "./style.css";
import { Folder, Task, DataManager } from "./data.js";
import { DOMFactory } from "./create-dom.js";

const dataManager = new DataManager();
const domFactory = new DOMFactory();
dataManager.folders = JSON.parse(window.localStorage.getItem("data")) || [];
