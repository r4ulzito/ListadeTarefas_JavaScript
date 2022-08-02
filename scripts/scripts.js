const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");

const tasksContainer = document.querySelector(".tasks-container");

//Validando se o input de texto não esta vazio
function validateInput() {
  return inputElement.value.trim().length > 0;
}

function handleAddTask() {
  const inputIsValid = validateInput();

  if (!inputIsValid) {
    return inputElement.classList.add("error");
  }

  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item");

  const taskContent = document.createElement("p");
  taskContent.innerText = inputElement.value;

  taskContent.addEventListener("click", function () {
    handleClick(taskContent);
  });

  const deleteItem = document.createElement("i");
  deleteItem.classList.add("far");
  deleteItem.classList.add("fa-trash-alt");

  deleteItem.addEventListener("click", function () {
    handleDeleteClick(taskItemContainer, taskContent);
  });

  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);

  tasksContainer.appendChild(taskItemContainer);

  inputElement.value = "";

  updateLocalStorage();
}

function handleClick(taskContent) {
  const tasks = tasksContainer.childNodes;
  for (const task of tasks) {
    const currenTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

    if (currenTaskIsBeingClicked) {
      task.firstChild.classList.toggle("completed");
    }
  }

  updateLocalStorage();
}

function handleDeleteClick(taskItemContainer, taskContent) {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    const currenTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

    if (currenTaskIsBeingClicked) {
      taskItemContainer.remove();
    }
  }

  updateLocalStorage();
}

function handleInputChange() {
  const inputIsValid = validateInput();

  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }
}

// Função que salva as tarefas no Local Storage
function updateLocalStorage() {
  const tasks = tasksContainer.childNodes;

  const localStorageTasks = [...tasks].map(function (task) {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("completed");

    return { description: content.innerText, isCompleted };
  });

  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
}

//Função que atualiza as tarefas que ja estão salvas no LocalStorage
function refreshTasksUsingLocalStorage() {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

  if (!tasksFromLocalStorage) {
    return;
  }

  for (const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;
    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }

    taskContent.addEventListener("click", function () {
      handleClick(taskContent);
    });

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");

    deleteItem.addEventListener("click", function () {
      handleDeleteClick(taskItemContainer, taskContent);
    });

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);
  }
}

refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", function () {
  handleAddTask();
});

inputElement.addEventListener("change", function () {
  handleInputChange();
});
