import { DataManager } from "./data.js";

export class DOMFactory {
  constructor() {
    this.storage = window.localStorage;
  }
  // Tasks
  createTaskElements(task) {
    const taskContainer = createTaskContainer(task);
    const taskDescription = createTaskDescription(task);
    const taskDueDate = createTaskDueDate(task);
    const taskUrgency = createTaskUrgency(task);
    const taskCompleteCheckBox = createCompleteCheckBox();
    const taskDeleteBtn = createTaskDeleteBtn();
    const taskEditBtn = createTaskEditBtn(task);

    return [
      taskContainer,
      taskCompleteCheckBox,
      taskDescription,
      taskDueDate,
      taskUrgency,
      taskDeleteBtn,
      taskEditBtn,
    ];

    function createTaskContainer(task) {
      const taskContainer = document.createElement("div");
      taskContainer.classList.add("task");
      taskContainer.setAttribute("id", task.id);
      return taskContainer;
    }
    function createTaskDescription(task) {
      const taskDescription = document.createElement("div");
      taskDescription.textContent = task.description;
      taskDescription.classList.add("task-description");
      return taskDescription;
    }
    function createTaskDueDate(task) {
      const taskDueDate = document.createElement("div");
      taskDueDate.textContent = task.dueDate;
      taskDueDate.classList.add("task-due-date");
      return taskDueDate;
    }
    function createTaskUrgency(task) {
      const taskUrgency = document.createElement("div");
      taskUrgency.textContent = task.urgency;
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
      deleteTasktEvListener(taskDeleteBtn);
      return taskDeleteBtn;
    }
    function deleteTasktEvListener(deleteBtn) {
      deleteBtn.addEventListener("click", (e) => {
        e.target.parentNode.remove();
      });
    }
    function createTaskEditBtn(task) {
      const taskEditBtn = document.createElement("button");
      taskEditBtn.innerHTML = "	&#8853;";
      taskEditBtn.classList.add("task-edit");
      taskEditBtn.setAttribute("data-modal-target", "#modal");
      taskEditBtn.addEventListener("click", (task) => {
        // const id = task.id;

        const modal = document.querySelector(taskEditBtn.dataset.modalTarget);
        openModal(modal);
      });
      // Modal close
      closeModalOnOverlayClickEvListener();
      // Get index of task to edit, when edit button is clicked

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
  createTask(task) {
    const [taskContainer, ...taskElements] = this.createTaskElements(task);
    this.appendTask(taskContainer, taskElements);
  }

  // Folder
  createFolderElements() {
    const container = document.createElement("div");
    const title = document.createElement("p");
    const deleteBtn = document.createElement("button");

    return [container, title, deleteBtn];
  }
  addTitle(folder, title, deleteBtn) {
    title.textContent = folder.title;
    deleteBtn.innerHTML = "&times;";
  }
  addAttributes(folder, container, deleteBtn) {
    container.setAttribute("id", `${folder.id}`);
    container.classList.add("folder");
    deleteBtn.classList.add("delete-button");
  }
  addDeleteListener(deleteBtn) {
    deleteBtn.addEventListener("click", (e) => {
      e.target.parentNode.remove();
    });
  }
  appendFolder(folder) {
    const [container, title, deleteBtn] = this.createFolderElements();
    this.addAttributes(folder, container, deleteBtn);
    this.addDeleteListener(deleteBtn);
    this.addTitle(folder, title, deleteBtn);
    container.append(title);
    container.append(deleteBtn);
    document.querySelector(".card").append(container);
  }

  // Modal edit

  domEdit(taskID) {
    const taskDescription = document
      .getElementById(`${taskID}`)
      .querySelector(".task-description");
    const taskDueDate = document
      .getElementById(`${taskID}`)
      .querySelector(".task-due-date");
    const taskUrgency = document
      .getElementById(`${taskID}`)
      .querySelector(".task-urgency");
    taskDescription.textContent = document.getElementById("modal-info").value;
    taskDueDate.textContent = document.getElementById("modal-date").value;
    taskUrgency.textContent = document.getElementById("modal-urgency").value;
  }

  removeTasks() {
    document.querySelectorAll(".task").forEach((element) => element.remove());
  }

  renderTasksOnFolderChange(tasks) {
    tasks.forEach((task) => {
      this.createTask(task);
    });
  }
  renderFoldersOnLoad(folders) {
    folders.forEach((folder) => {
      this.appendFolder(folder);
    });
  }
}
