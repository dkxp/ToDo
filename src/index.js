import "./style.css";
import { Folder, Task, DataManager } from "./data.js";
import { DOMFactory } from "./create-dom.js";

const dataManager = new DataManager();
const domFactory = new DOMFactory();
dataManager.folders = JSON.parse(window.localStorage.getItem("data")) || [];
// If no items in localstorage
if (dataManager.folders.length === 0) {
  // Render test folder, if nothing in localstorage
  const testFolder = new Folder("Test Folder");
  dataManager.addFolder(testFolder);
  domFactory.appendFolder(testFolder);
  dataManager.currentFolderID = testFolder.id;
  dataManager.setFolderIndex();
  // Add blue background to first
  document
    .getElementById(`${dataManager.currentFolderID}`)
    .classList.add("active");
  // Event listener to render task elements when test folder is clicked
  document.getElementById(`${testFolder.id}`).addEventListener("click", (e) => {
    dataManager.setFolderID(e);
    dataManager.setFolderIndex();
    const tasks = dataManager.folders[dataManager.currentFolderIndex].tasks;
    domFactory.removeTasks();
    domFactory.renderTasksOnFolderChange(tasks);
  });
  // Add event listeners to test folder element, to render that folder's tasks
  // and add event listeners to those task elements
  // Also adds event listener to delete folder
  document.getElementById(`${testFolder.id}`).addEventListener("click", (e) => {
    const tasks = dataManager.folders[dataManager.currentFolderIndex].tasks;
    tasks.forEach((task) => {
      document
        .getElementById(`${task.id}`)
        .querySelector(".task-delete")
        .addEventListener("click", (e) => {
          dataManager.removeTask(task);
        });
      document
        .getElementById(`${task.id}`)
        .querySelector(".task-edit")
        .addEventListener("click", (e) => {
          dataManager.setTaskID(e);
        });
    });
  });
  const deleteBtn = document.getElementById(`${testFolder.id}`).lastChild;
  deleteBtn.addEventListener("click", (e) => {
    dataManager.removeFolder(e);
  });
}
// If items in localstorage
else if (dataManager.folders.length > 0) {
  // Set folder ID/Index to the first one
  dataManager.currentFolderID = dataManager.folders[0].id;
  dataManager.currentFolderIndex = 0;
  // Render tasks and folders
  const tasks = dataManager.folders[dataManager.currentFolderIndex].tasks;
  const folders = dataManager.folders;
  domFactory.renderTasksOnFolderChange(tasks);
  domFactory.renderFoldersOnLoad(folders);
  // Add blue background to first
  document
    .getElementById(`${dataManager.currentFolderID}`)
    .classList.add("active");
  // Event listener to render task elements when folder is clicked
  folders.forEach((folder) => {
    document.getElementById(`${folder.id}`).addEventListener("click", (e) => {
      dataManager.setFolderID(e);
      dataManager.setFolderIndex();
      const tasksHere =
        dataManager.folders[dataManager.currentFolderIndex].tasks;
      domFactory.removeTasks();
      domFactory.renderTasksOnFolderChange(tasksHere);
    });
  });
  // Event listener for the task elements that are loaded on new page load
  tasks.forEach((task) => {
    document
      .getElementById(`${task.id}`)
      .querySelector(".task-delete")
      .addEventListener("click", (e) => {
        dataManager.removeTask(task);
      });
    document
      .getElementById(`${task.id}`)
      .querySelector(".task-edit")
      .addEventListener("click", (e) => {
        dataManager.setTaskID(e);
      });
  });
  // Add event listeners to folder elements, to render that folder's tasks
  // and add event listeners to those task elements
  // Also adds event listener to delete folder
  folders.forEach((folder) => {
    document.getElementById(`${folder.id}`).addEventListener("click", (e) => {
      const tasks = dataManager.folders[dataManager.currentFolderIndex].tasks;
      tasks.forEach((task) => {
        document
          .getElementById(`${task.id}`)
          .querySelector(".task-delete")
          .addEventListener("click", (e) => {
            dataManager.removeTask(task);
          });
        document
          .getElementById(`${task.id}`)
          .querySelector(".task-edit")
          .addEventListener("click", (e) => {
            dataManager.setTaskID(e);
          });
      });
    });
    // dataManager.removeFolder listener
    const deleteBtn = document.getElementById(`${folder.id}`).lastChild;
    deleteBtn.addEventListener("click", (e) => {
      dataManager.removeFolder(e);
    });
  });
}

// Folder event listeners
document.getElementById("folder-create").addEventListener("click", (e) => {
  // Check for folder name input
  const folderName = document.getElementById("folder-name").value;
  if (!folderName) {
    window.alert("Please enter a folder name!");
    return;
  }
  // Create & add folder to dataManager.folders using dataManager.addFolder
  const folder = new Folder(folderName);
  dataManager.addFolder(folder);
  // Render folder
  domFactory.appendFolder(folder);
  // Render tasks on folder click
  document.getElementById(`${folder.id}`).addEventListener("click", (e) => {
    // Render tasks
    dataManager.setFolderID(e);
    dataManager.setFolderIndex();
    const tasks = dataManager.folders[dataManager.currentFolderIndex].tasks;
    domFactory.removeTasks();
    domFactory.renderTasksOnFolderChange(tasks);
  });
  document.getElementById(`${folder.id}`).addEventListener("click", (e) => {
    // dataManager.removeTask & dataManager.setTaskID listeners on
    // .task-delete & .task-edit elements
    const tasks = dataManager.folders[dataManager.currentFolderIndex].tasks;
    tasks.forEach((task) => {
      document
        .getElementById(`${task.id}`)
        .querySelector(".task-delete")
        .addEventListener("click", (e) => {
          dataManager.removeTask(task);
        });
      document
        .getElementById(`${task.id}`)
        .querySelector(".task-edit")
        .addEventListener("click", (e) => {
          dataManager.setTaskID(e);
        });
    });
  });
  // dataManager.removeFolder listener
  const deleteBtn = document.getElementById(`${folder.id}`).lastChild;
  deleteBtn.addEventListener("click", (e) => {
    dataManager.removeFolder(e);
  });
});

// Task event listeners
document.getElementById("task-create").addEventListener("click", (e) => {
  // Validate inputs
  if (
    !document.getElementById("task-description").value ||
    !document.getElementById("task-date").value
  ) {
    window.alert("Please fill in the task information");
    return;
  }
  // Create & add task to dataManager.folders[].tasks using dataManager.addFolder
  const description = document.getElementById("task-description").value;
  const date = document.getElementById("task-date").value;
  const urgency = document.getElementById("task-urgency").value;
  const task = new Task(description, date, urgency);

  dataManager.addTask(task);
  // Render tasks
  domFactory.createTask(task);
  // dataManager.removeTask listener
  document
    .getElementById(`${task.id}`)
    .querySelector(".task-delete")
    .addEventListener("click", (e) => {
      dataManager.removeTask(task);
    });
  // dataManager.currentTaskID listener
  document
    .getElementById(`${task.id}`)
    .querySelector(".task-edit")
    .addEventListener("click", (e) => {
      dataManager.setTaskID(e);
    });
});
// Modal window listeners
document.getElementById("modal-save").addEventListener("click", (e) => {
  if (
    !document.getElementById("modal-info").value ||
    !document.getElementById("modal-date").value
  ) {
    window.alert("Please fill in the new task information");
    return;
  }
  dataManager.taskEdit();
  const taskID = dataManager.currentTaskID;
  domFactory.domEdit(taskID);
});
