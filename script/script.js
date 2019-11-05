document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    const taskList = document.querySelector(".list");
    const addTaskButton = document.querySelector(".task-input__add");
    const clearTaskButton = document.querySelector(".task-input__clear");
    const collectionOfTasks = [];

    /*Functionality*/

    const addTask = task => {
        const verificationTask = hasTask(task);

        if (verificationTask) return;

        const taskObject = {
            "name": task,
            "done": false
        };

        collectionOfTasks.push(taskObject);
    };
    const removeTask = task => {
        const indexTask = collectionOfTasks.findIndex(item => (item.name === task));

        collectionOfTasks.splice(indexTask, 1);
    };
    const makeDoneTask = task => {
        collectionOfTasks.forEach(item => {
            if (item.name === task) {
                item.done = true;
            }
        });
    };
    const hasTask = taskName => {
        const findedTask = collectionOfTasks.findIndex(item => (item.name === taskName));

        return (findedTask != -1);
    };
    const clearTaskList = taskCollection => {
        taskCollection.splice(0, taskCollection.length);
        renderTaskList(taskCollection);
    };
    const checkEmptyField = ({value}) => {
        return (value === "");
    };
    const renderTaskRow = task => {
        const {name} = task;
        const li = document.createElement("li");
        const innerLi = `
            <span class="task-text">${name}</span>
            <input type="checkbox" class="list-checkbox">
            <div class="list__remove-button"></div>
        `;
        if (task.done) {
            li.classList.add("done-task");
        }

        li.classList.add("list-item");
        li.innerHTML = innerLi;

        return li;
    };
    const renderTaskList = taskCollection => {
        taskList.innerHTML = "";

        taskCollection.forEach(item => {
            const listItem = renderTaskRow(item);

            taskList.append(listItem);
        });
    };
    // const updateStorage = (key, value) => {
    //     localStorage.setItem(key, value);
    // };

    /*Adding event handlers*/ 

    addTaskButton.addEventListener("click", () => {
        const inputField = document.querySelector(".task-input__field");
        const lowerCaseTaskName = inputField.value.toLowerCase();

        if (checkEmptyField(inputField)) {
            alert("empty field, please write your task.");
        } else {
            addTask(lowerCaseTaskName);
            renderTaskList(collectionOfTasks);
            inputField.value = "";
        }

    });

    clearTaskButton.addEventListener("click", () => {
        clearTaskList(collectionOfTasks);
    });

    taskList.addEventListener("click", ({target}) => {
        const taskRow = target.closest(".list-item");
        const taskName = taskRow.querySelector(".task-text").textContent.trim();

        if (target.classList.contains("list-checkbox")) {
            taskRow.classList.toggle("done-task");
            makeDoneTask(taskName);
        } else if (target.classList.contains("list__remove-button")) {
            taskRow.remove();
            removeTask(taskName);
            renderTaskList(collectionOfTasks);
        } else {
            return false;
        }
    });  

});