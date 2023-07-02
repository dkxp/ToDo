export class Folder {
  constructor(title) {
    this.title = title;
    this.tasks = [];
    this.index = undefined;
  }
}

export class Task {
  constructor(description, dueDate, urgency) {
    this.description = description;
    this.dueDate = dueDate;
    this.urgency = urgency;
    this.completed = false;
  }
}

export class FolderManager {
  constructor() {
    this.folders = [];
    this.currentFoldex = 0;
  }

  addTask(task) {
    this.folders[this.currentFoldex].tasks.push(task);
    console.log("Just added task ", task);
    console.log(
      "Just added folder with tasks ",
      this.folders[this.currentFoldex].tasks
    );
  }
  removeTask(event) {
    const index = this.getCurrentTask(event);
    this.folders[this.currentFoldex].tasks.splice(index, 1);
  }
  getCurrentTask(event) {
    const taskContainer = event.target.closest(".task");
    const taskNodes = document.querySelectorAll(".task");
    let currentIndex;
    taskNodes.forEach(function (task, taskIndex) {
      if (task.isSameNode(taskContainer)) {
        currentIndex = taskIndex;
      }
    });
    return currentIndex;
  }

  addFolder(folder) {
    this.folders.push(folder);
  }
  removeFolder(index) {
    this.folders.splice(index, 1);
  }

  getCurrentFolder(event) {
    const folderContainer = event.target.closest(".folder");
    const folderNodes = document.querySelectorAll(".folder");
    return Array.from(folderNodes).indexOf(folderContainer);
  }

  switchFolder(event) {
    const folderContainer = event.target.closest(".folder");
    const folderNodes = document.querySelectorAll(".folder");
    this.currentFoldex = Array.from(folderNodes).indexOf(folderContainer);
    return this.currentFoldex;
  }
}

export class DomManager {
  constructor(folderManager) {
    this.folderManager = folderManager;
    this.createTask = this.createTask.bind(this);
    this.createTaskElements = this.createTaskElements.bind(this);
    this.appendTask = this.appendTask.bind(this);
    this.deleteTaskObjEvListener = this.deleteTaskObjEvListener.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.validateEditInputs = this.validateEditInputs.bind(this);
  }

  getNameOnPageLoad() {
    document.addEventListener("DOMContentLoaded", () => {
      const firstName = prompt("Please enter your first name");
      document.querySelector("h1").innerHTML += ` ${firstName}`;
      document.body.removeAttribute("hidden");
    });
  }

  createFolderElements() {
    // Element Creation
    const folderContainer = document.createElement("div");
    const folderName = document.createElement("p");
    const deleteBtn = document.createElement("button");
    // Eventlistener
    return [folderContainer, folderName, deleteBtn];
  }
  deleteFolderObjEvListener(deleteBtn) {
    deleteBtn.addEventListener("click", (event) => {
      const index = this.folderManager.getCurrentFolder(event);
      this.folderManager.removeFolder(event);
      console.log(this.folderManager.folders);
    });
  }
  deleteFolderElementEvListener(deleteBtn) {
    deleteBtn.addEventListener("click", (event) => {
      event.target.parentNode.remove();
    });
  }
  changeFolderEvListener(folderContainer) {
    folderContainer.addEventListener("click", (event) => {
      const index = this.folderManager.switchFolder(event);
      console.log("switchFolder to index of ", index);
    });
  }
  addFolderElementInputs(folderName, deleteBtn) {
    folderName.textContent = document.getElementById("folder-name").value;
    deleteBtn.innerHTML = "&times;";
    if (!folderName.textContent) {
      folderName.textContent = "Test Folder";
    }
  }
  addFolderElementClasses(folderContainer, deleteBtn) {
    folderContainer.classList.add("folder");
    deleteBtn.classList.add("delete-button");
  }
  appendFolder(folderContainer, folderName, deleteBtn) {
    folderContainer.append(folderName);
    folderContainer.append(deleteBtn);
    document.querySelector(".card").append(folderContainer);
  }

  createFolder(newFolder) {
    // Alert if empty input
    if (!document.getElementById("folder-name").value) {
      window.alert("Please enter a folder name");
      return;
    }
    // Create folder
    const [folderContainer, folderName, deleteBtn] =
      this.createFolderElements();
    // Add event listeners
    this.deleteFolderObjEvListener(deleteBtn);
    this.changeFolderEvListener(folderContainer);
    this.deleteFolderElementEvListener(deleteBtn);
    this.addFolderElementInputs(folderName, deleteBtn);
    this.addFolderElementClasses(folderContainer, deleteBtn);
    this.appendFolder(folderContainer, folderName, deleteBtn);
  }
  testFolderOnLoad(newFolder) {
    const [folderContainer, folderName, deleteBtn] =
      this.createFolderElements();
    this.deleteFolderObjEvListener(deleteBtn);
    this.changeFolderEvListener(folderContainer);
    this.deleteFolderElementEvListener(deleteBtn);
    this.addFolderElementInputs(folderName, deleteBtn);
    this.addFolderElementClasses(folderContainer, deleteBtn);
    this.appendFolder(folderContainer, folderName, deleteBtn);
  }
  // Task dom
  deleteTaskObjEvListener = (deleteBtn) => {
    deleteBtn.addEventListener("click", (event) => {
      //   const index = this.folderManager.getCurrentTask(event);
      this.folderManager.removeTask(event);
      event.target.closest(".task").remove();
    });
  };
  deleteTaskElementEvListener(deleteBtn) {
    deleteBtn.addEventListener("click", (event) => {
      event.target.parentNode.remove();
    });
  }
  validateTaskInputs() {
    if (
      !document.getElementById("task-description").value ||
      !document.getElementById("task-date").value
    ) {
      window.alert("Please fill in the task information");
      return false;
    }
    return true;
  }
  createTaskElements(event) {
    const taskContainer = createTaskContainer();
    const taskDescription = createTaskDescription();
    const taskDueDate = createTaskDueDate();
    const taskUrgency = createTaskUrgency();
    const taskCompleteCheckBox = createCompleteCheckBox();
    const taskDeleteBtn = createTaskDeleteBtn();
    const taskEditBtn = createTaskEditBtn(event);

    // Event Listeners
    this.deleteTaskObjEvListener(taskDeleteBtn);

    return [
      taskContainer,
      taskCompleteCheckBox,
      taskDescription,
      taskDueDate,
      taskUrgency,
      taskDeleteBtn,
      taskEditBtn,
    ];

    function createTaskContainer() {
      const taskContainer = document.createElement("div");
      taskContainer.classList.add("task");
      return taskContainer;
    }
    function createTaskDescription() {
      const taskDescription = document.createElement("div");
      taskDescription.textContent =
        document.getElementById("task-description").value;
      taskDescription.classList.add("task-description");
      return taskDescription;
    }
    function createTaskDueDate() {
      const taskDueDate = document.createElement("div");
      taskDueDate.textContent = document.getElementById("task-date").value;
      taskDueDate.classList.add("task-due-date");
      return taskDueDate;
    }
    function createTaskUrgency() {
      const taskUrgency = document.createElement("div");
      taskUrgency.textContent = document.getElementById("task-urgency").value;
      taskUrgency.classList.add("task-urgency");
      return taskUrgency;
    }
    function createCompleteCheckBox() {
      const taskCompleteCheckBox = document.createElement("input");
      taskCompleteCheckBox.type = "checkbox";
      taskCompleteCheckBox.classList.add("task-completion");
      taskCompleteCheckBox.addEventListener("click", () => {
        if (taskCompleteCheckBox.checked) {
          taskDescription.style.textDecoration = "line-through";
        } else {
          taskDescription.style.textDecoration = "none";
        }
      });
      return taskCompleteCheckBox;
    }
    function createTaskDeleteBtn() {
      const taskDeleteBtn = document.createElement("button");
      taskDeleteBtn.innerHTML = "&times;";
      taskDeleteBtn.classList.add("task-delete");
      return taskDeleteBtn;
    }
    function createTaskEditBtn(event) {
      const taskEditBtn = document.createElement("button");
      taskEditBtn.innerHTML = "	&#8853;";
      taskEditBtn.classList.add("task-edit");
      taskEditBtn.setAttribute("data-modal-target", "#modal");
      taskEditBtn.addEventListener("click", (event) => {
        getClickedTask(event);
        const modal = document.querySelector(taskEditBtn.dataset.modalTarget);
        openModal(modal);
      });
      // Modal close
      closeModalOnOverlayClickEvListener();
      // Get index of task to edit, when edit button is clicked
      function getClickedTask(event) {
        let tasks = document.querySelectorAll(".task");
        let taskIndex = Array.from(tasks).indexOf(
          event.target.closest(".task")
        );
        return taskIndex;
      }
      function closeModalOnOverlayClickEvListener() {
        document.getElementById("overlay").addEventListener("click", () => {
          const modal = document.getElementById("modal");
          closeModal(modal);
        });
      }
      function openModal(modal) {
        if (modal === null) return;
        modal.classList.add("active");
        overlay.classList.add("active");
      }
      function closeModal(modal) {
        if (modal === null) return;
        modal.classList.remove("active");
        overlay.classList.remove("active");
      }
      return taskEditBtn;
    }
  }

  appendTask(taskContainer, elements) {
    const taskList = document.querySelector(".task-list");
    // Append to container
    elements.forEach((element) => {
      taskContainer.append(element);
    });
    // Append to list
    taskList.append(taskContainer);
    return taskList;
  }
  createTask() {
    if (!this.validateTaskInputs()) return;
    const [taskContainer, ...taskElements] = this.createTaskElements();
    this.appendTask(taskContainer, taskElements);
  }

  // edit

  validateEditInputs() {
    if (
      !document.getElementById("modal-info").value ||
      !document.getElementById("modal-date").value
    ) {
      window.alert("Please fill in the new task information");
      return false;
    }
    return true;
  }
  saveEdit() {
    if (!this.validateEditInputs()) return;
    const modal = document.getElementById("modal");
    const tasks = document.querySelectorAll(".task");
    const currentTask = tasks[taskIndex];
    const newTaskDescription = currentTask.querySelector(".task-description");
    const newTaskDueDate = currentTask.querySelector(".task-due-date");
    const newTaskUrgency = currentTask.querySelector(".task-urgency");
    newTaskDescription.textContent =
      document.getElementById("modal-info").value;
    newTaskDueDate.textContent = document.getElementById("modal-date").value;
    newTaskUrgency.textContent = document.getElementById("modal-urgency").value;
    function closeModal(modal) {
      if (modal === null) return;
      modal.classList.remove("active");
      overlay.classList.remove("active");
    }
    closeModal(modal);
  }
  // Modal event listener
  saveEditEvListener() {
    document
      .getElementById("modal-save")
      .addEventListener("click", this.saveEdit);
  }
}
