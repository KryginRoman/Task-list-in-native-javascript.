document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    const taskList = document.querySelector(".list");
    const addTaskButton = document.querySelector(".task-input__add");
    const clearTaskButton = document.querySelector(".task-input__clear");
    const collectionOfTasks = [];

    /*Functionality*/

    const addTask = task => {
        const hasTask = collectionOfTasks.includes(task);

        if (hasTask) return;

        collectionOfTasks.push(task);
    };
    const removeTask = task => {
        const indexTask = collectionOfTasks.findIndex(item => (item.toLowerCase() === task.toLowerCase()));

        collectionOfTasks.splice(indexTask, 1);
    };
    const clearTaskList = taskCollection => {
        taskCollection.splice(0, taskCollection.length);
        renderTaskList(taskCollection);
    };
    const checkEmptyField = ({value}) => {
        return (value === "");
    };
    const renderTaskRow = task => {
        const li = document.createElement("li");
        const innerLi = `
            <span class="task-text">${task}</span>
            <input type="checkbox" class="list-checkbox">
            <div class="list__remove-button"></div>
        `;

        li.classList.add("list-item");
        li.innerHTML = innerLi;

        return li;
    };
    const renderTaskList = taskCollection => {
        taskList.innerHTML = "";

        taskCollection.forEach(task => {
            const listItem = renderTaskRow(task);

            taskList.append(listItem);
        });
    };

    /*Adding event handlers*/ 

    addTaskButton.addEventListener("click", () => {
        const inputField = document.querySelector(".task-input__field");

        if (checkEmptyField(inputField)) {
            alert("empty field, please write your task.");
        } else {
            addTask(inputField.value);
            renderTaskList(collectionOfTasks);
            inputField.value = "";
        }

    });

    clearTaskButton.addEventListener("click", () => {
        clearTaskList(collectionOfTasks);
    });

    taskList.addEventListener("click", ({target}) => {
        const taskRow = target.closest(".list-item");

        if (target.classList.contains("list-checkbox")) {
            taskRow.classList.toggle("done-task");
        } else if (target.classList.contains("list__remove-button")) {
            const taskName = taskRow.querySelector(".task-text").textContent;

            taskRow.remove();
            removeTask(taskName);
            renderTaskList(collectionOfTasks);
        } else {
            return false;
        }
    });


});