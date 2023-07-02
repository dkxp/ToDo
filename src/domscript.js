// DOM load
export const getNameOnPageLoad = function () {
  document.addEventListener("DOMContentLoaded", () => {
    const firstName = prompt("Please enter your first name");
    document.querySelector("h1").innerHTML += ` ${firstName}`;
    document.body.removeAttribute("hidden");
  });
};
// Global Variable
let taskIndex;
// Folder functions
const appendFolder = function (folderContainer, folderName, deleteBtn) {
  folderContainer.append(folderName);
  folderContainer.append(deleteBtn);
  document.querySelector(".card").append(folderContainer);
};
const createFolderElements = function () {
  // Element Creation
  const folderContainer = document.createElement("div");
  const folderName = document.createElement("p");
  const deleteBtn = document.createElement("button");
  // Eventlistener
  deleteBtn.addEventListener("click", (event) =>
    event.target.closest(".folder").remove()
  );
  return [folderContainer, folderName, deleteBtn];
};
const addFolderElementInputs = function (folderName, deleteBtn) {
  folderName.textContent = document.getElementById("folder-name").value;
  deleteBtn.innerHTML = "&times;";
};
const addFolderElementClasses = function (folderContainer, deleteBtn) {
  folderContainer.classList.add("folder");
  deleteBtn.classList.add("delete-button");
};
const createFolder = () => {
  // Alert if empty input
  if (!document.getElementById("folder-name").value) {
    window.alert("Please enter a folder name");
    return;
  }
  // Create folder
  const [folderContainer, folderName, deleteBtn] = createFolderElements();
  addFolderElementInputs(folderName, deleteBtn);
  addFolderElementClasses(folderContainer, deleteBtn);
  appendFolder(folderContainer, folderName, deleteBtn);
};
// Folder event listeners
export const deleteFolderEvListener = function () {
  document
    .querySelector(".delete-button")
    .addEventListener("click", (event) =>
      event.target.closest(".folder").remove()
    );
};
export const createFolderEvListener = function () {
  document
    .getElementById("folder-create")
    .addEventListener("click", createFolder);
};

// Task functions
const openModal = function (modal) {
  if (modal === null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
};
const closeModal = function (modal) {
  if (modal === null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
};
const validateTaskInputs = function () {
  if (
    !document.getElementById("task-description").value ||
    !document.getElementById("task-date").value
  ) {
    window.alert("Please fill in the task information");
    return false;
  }
  return true;
};
const createTaskElements = function () {
  const taskContainer = createTaskContainer();
  const taskDescription = createTaskDescription();
  const taskDueDate = createTaskDueDate();
  const taskUrgency = createTaskUrgency();
  const taskCompleteCheckBox = createCompleteCheckBox();
  const taskDeleteBtn = createTaskDeleteBtn();
  const taskEditBtn = createTaskEditBtn();

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
    taskDeleteBtn.addEventListener("click", (event) =>
      event.target.closest(".task").remove()
    );
    return taskDeleteBtn;
  }
  function createTaskEditBtn() {
    const taskEditBtn = document.createElement("button");
    taskEditBtn.innerHTML = "	&#8853;";
    taskEditBtn.classList.add("task-edit");
    taskEditBtn.setAttribute("data-modal-target", "#modal");
    taskEditBtn.addEventListener("click", (event) => {
      getClickedTask(event);
      const modal = document.querySelector(taskEditBtn.dataset.modalTarget);
      openModal(modal);
    });
    // Get index of task to edit, when edit button is clicked
    function getClickedTask(event) {
      let tasks = document.querySelectorAll(".task");
      taskIndex = Array.from(tasks).indexOf(event.target.closest(".task"));
      return taskIndex;
    }
    return taskEditBtn;
  }
};
const appendTask = function (taskContainer, elements) {
  const taskList = document.getElementById("tasks");
  // Append to container
  elements.forEach((element) => {
    taskContainer.append(element);
  });
  // Append to list
  taskList.append(taskContainer);
  return taskList;
};
const createTask = function () {
  if (!validateTaskInputs()) return;
  const [taskContainer, ...taskElements] = createTaskElements();
  appendTask(taskContainer, taskElements);
};
// Task event listeners
export const createTaskEvListener = function () {
  document.getElementById("task-create").addEventListener("click", createTask);
};
export const closeModalOnOverlayClickEvListener = function () {
  document.getElementById("overlay").addEventListener("click", () => {
    const modal = document.getElementById("modal");
    closeModal(modal);
  });
};

// Modal functions
const validateEditInputs = function () {
  if (
    !document.getElementById("modal-info").value ||
    !document.getElementById("modal-date").value
  ) {
    window.alert("Please fill in the new task information");
    return false;
  }
  return true;
};
const saveEdit = function () {
  if (!validateEditInputs()) return;
  const modal = document.getElementById("modal");
  const tasks = document.querySelectorAll(".task");
  const currentTask = tasks[taskIndex];
  const newTaskDescription = currentTask.querySelector(".task-description");
  const newTaskDueDate = currentTask.querySelector(".task-due-date");
  const newTaskUrgency = currentTask.querySelector(".task-urgency");
  newTaskDescription.textContent = document.getElementById("modal-info").value;
  newTaskDueDate.textContent = document.getElementById("modal-date").value;
  newTaskUrgency.textContent = document.getElementById("modal-urgency").value;
  closeModal(modal);
};
// Modal event listener
export const saveEditEvListener = function () {
  document.getElementById("modal-save").addEventListener("click", saveEdit);
};

// Switching folder functions
const clearTasks = function () {
  const tasks = document.querySelectorAll(".task");
  tasks.forEach((task) => task.remove());
};
const switchFolders = function () {
  // Clear tasks
  clearTasks();
};

export const switchFolderEvListener = function () {
  document.querySelector(".card").addEventListener("click", switchFolders);
};
