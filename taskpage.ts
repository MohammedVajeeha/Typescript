//@ts-nocheck
const addTaskButton = document.getElementById("addbtn") as HTMLButtonElement;
const taskNameInput = document.getElementById("taskName") as HTMLInputElement;
const tasksContainer = document.getElementById("tasks") as HTMLDivElement;
const searchInput = document.getElementById("search") as HTMLInputElement;

addTaskButton.addEventListener("click", () => {
    const taskName = taskNameInput.value;
    if (taskName === "") {
        alert("Please enter a task name");
    }

    if (taskName.trim() !== "") {
        const existingTaskDiv = getExistingTaskDiv(taskName);
        if (existingTaskDiv) {
            alert("Name already exists!!...");
        } else {
            createTask(taskName);
        }
        taskNameInput.value = "";
    }
});

function getExistingTaskDiv(name: string): HTMLDivElement | null {
    const existingTasks = Array.from(document.querySelectorAll(".task")) as HTMLDivElement[];
    for (let i = 0; i < existingTasks.length; i++) {
        const taskDiv = existingTasks[i];
        const taskName = taskDiv.querySelector("span").textContent;
        const completed = taskDiv.classList.contains("completed");
        if (taskName === name && !completed) {
            return taskDiv;
        }
    }
    return null;
}

function createTask(name: string): void {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const taskNameElement = document.createElement("span");
    taskNameElement.textContent = name;
    const dropdown = document.createElement("select");
    const statuses = ["to-do", "progress", "completed"];
    statuses.forEach(status => {
        const option = document.createElement("option");
        option.value = status;
        option.textContent = status;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener("change", () => {
        if (dropdown.value === "completed") {
            taskDiv.classList.add("completed");
            checkbox.checked = true;
            checkbox.disabled = true;
        } else {
            taskDiv.classList.remove("completed");
            checkbox.checked = false;
            checkbox.disabled = false;
        }
    });

    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            dropdown.value = "completed";
            taskDiv.classList.add("completed");
        } else {
            dropdown.value = "to-do";
            taskDiv.classList.remove("completed");
        }
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        console.log("Delete button clicked");
        tasksContainer.removeChild(taskDiv);
    });

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskNameElement);
    taskDiv.appendChild(dropdown);
    taskDiv.appendChild(deleteButton);

    tasksContainer.appendChild(taskDiv);
}

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const taskDivs = document.querySelectorAll(".task") as NodeListOf<HTMLDivElement>;
    taskDivs.forEach(taskDiv => {
        const taskName = taskDiv.querySelector("span").textContent.toLowerCase();
        if (taskName.includes(searchTerm)) {
            taskDiv.style.display = "flex";
        } else {
            taskDiv.style.display = "none";
        }
    });
});
