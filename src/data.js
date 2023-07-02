export class Folder {
  constructor(title) {
    const currentTime = Date.now();
    this.id = currentTime;
    this.title = title;
    this.tasks = [];
  }
}

export class Task {
  constructor(description, dueDate, urgency) {
    const currentTime = Date.now();
    this.id = currentTime;
    this.description = description;
    this.dueDate = dueDate;
    this.urgency = urgency;
    this.completed = false;
  }
}

export class DataManager {
  constructor() {
    this.folders = [];
    this.storage = window.localStorage;
    this.currentFolderID = null;
    this.currentFolderIndex;
    this.currentTaskID = null;
  }
  // Task edit
  taskEdit() {
    const folderID = this.currentFolderID;
    const taskID = this.currentTaskID;
    let task;
    for (let i = 0; i < this.folders.length; i++) {
      if (this.folders[i].id == folderID) {
        for (let j = 0; j < this.folders[i].tasks.length; j++) {
          if (taskID == this.folders[i].tasks[j].id) {
            task = this.folders[i].tasks[j];
          }
        }
      }
    }
    const modal = document.getElementById("modal");
    task.description = document.getElementById("modal-info").value;
    task.dueDate = document.getElementById("modal-date").value;
    task.urgency = document.getElementById("modal-urgency").value;
    this.storeData();
    function closeModal(modal) {
      modal.classList.remove("active");
      overlay.classList.remove("active");
    }
    closeModal(modal);
  }

  // Tasks
  setTaskID(e) {
    this.currentTaskID = e.target.closest(".task").getAttribute("id");
    this.storeData();
    return this.currentTaskID;
  }
  addTask(task) {
    for (let i = 0; i < this.folders.length; i++) {
      if (this.folders[i].id == this.currentFolderID) {
        this.folders[i].tasks.push(task);
      }
    }
    this.storeData();
  }
  removeTask(task) {
    const taskID = task.id;
    const folderID = this.currentFolderID;

    for (let i = 0; i < this.folders.length; i++) {
      if (this.folders[i].id == folderID) {
        const tasks = this.folders[i].tasks;
        for (let j = 0; j < tasks.length; j++) {
          if (tasks[j].id == taskID) {
            this.folders[i].tasks.splice(j, 1);
            break;
          }
        }
        break;
      }
    }
    this.storeData();
  }

  addFolder(folder) {
    this.folders.push(folder);
    this.storeData();
    return this.folders;
  }
  storeData() {
    let data = this.folders;
    this.storage.setItem("data", JSON.stringify(data));
  }
  removeFolder(e) {
    const id = e.target.parentNode.id;
    for (let i = 0; i < this.folders.length; i++) {
      if (id == this.folders[i].id) {
        this.folders.splice(i, 1);
      }
    }
    this.storeData();
  }
  setFolderID(e) {
    document
      .getElementById(`${this.currentFolderID}`)
      .classList.remove("active");
    this.currentFolderID = e.target.closest(".folder").getAttribute("id");
    this.storeData();
    document.getElementById(`${this.currentFolderID}`).classList.add("active");
    return this.currentFolderID;
  }
  setFolderIndex() {
    for (let i = 0; i < this.folders.length; i++) {
      if (this.currentFolderID == this.folders[i].id) {
        this.currentFolderIndex = i;
      }
    }
    this.storeData();
    return this.currentFolderIndex;
  }
}
