//@ts-nocheck
var addTaskButton = document.getElementById("addbtn");
var taskNameInput = document.getElementById("taskName");
var tasksContainer = document.getElementById("tasks");
var searchInput = document.getElementById("search");
addTaskButton.addEventListener("click", function () {
    var taskName = taskNameInput.value;
    if (taskName === "") {
        alert("Please enter a task name");
    }
    if (taskName.trim() !== "") {
        var existingTaskDiv = getExistingTaskDiv(taskName);
        if (existingTaskDiv) {
            alert("Name already exists!!...");
        }
        else {
            createTask(taskName);
        }
        taskNameInput.value = "";
    }
});
function getExistingTaskDiv(name) {
    var existingTasks = Array.from(document.querySelectorAll(".task"));
    for (var i = 0; i < existingTasks.length; i++) {
        var taskDiv = existingTasks[i];
        var taskName = taskDiv.querySelector("span").textContent;
        var completed = taskDiv.classList.contains("completed");
        if (taskName === name && !completed) {
            return taskDiv;
        }
    }
    return null;
}
function createTask(name) {
    var taskDiv = document.createElement("div");
    taskDiv.className = "task";
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    var taskNameElement = document.createElement("span");
    taskNameElement.textContent = name;
    var dropdown = document.createElement("select");
    var statuses = ["to-do", "progress", "completed"];
    statuses.forEach(function (status) {
        var option = document.createElement("option");
        option.value = status;
        option.textContent = status;
        dropdown.appendChild(option);
    });
    dropdown.addEventListener("change", function () {
        if (dropdown.value === "completed") {
            taskDiv.classList.add("completed");
            checkbox.checked = true;
            checkbox.disabled = true;
        }
        else {
            taskDiv.classList.remove("completed");
            checkbox.checked = false;
            checkbox.disabled = false;
        }
    });
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            dropdown.value = "completed";
            taskDiv.classList.add("completed");
        }
        else {
            dropdown.value = "to-do";
            taskDiv.classList.remove("completed");
        }
    });
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
        console.log("Delete button clicked");
        tasksContainer.removeChild(taskDiv);
    });
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskNameElement);
    taskDiv.appendChild(dropdown);
    taskDiv.appendChild(deleteButton);
    tasksContainer.appendChild(taskDiv);
}
searchInput.addEventListener("input", function () {
    var searchTerm = searchInput.value.toLowerCase();
    var taskDivs = document.querySelectorAll(".task");
    taskDivs.forEach(function (taskDiv) {
        var taskName = taskDiv.querySelector("span").textContent.toLowerCase();
        if (taskName.includes(searchTerm)) {
            taskDiv.style.display = "flex";
        }
        else {
            taskDiv.style.display = "none";
        }
    });
});
