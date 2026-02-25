const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✕";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            li.classList.add("removing");

            setTimeout(() => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            }, 300);
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
}

addBtn.addEventListener("click", addTask);


taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

renderTasks();