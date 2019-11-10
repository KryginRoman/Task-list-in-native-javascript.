document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    const taskList = document.querySelector(".list");
    const addTaskButton = document.querySelector(".task-input__add");
    const clearTaskButton = document.querySelector(".task-input__clear");
    const doneAllTaskButton = document.querySelector(".task-input__done");
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
    const doneTask = (indexTask) => {
        collectionOfTasks[indexTask].done= true;
    };
    const unfulfilledTask = (indexTask) => {
        collectionOfTasks[indexTask].done= false;
    };
    const changeStateTask = task => {  
        collectionOfTasks.forEach((item, index) => {
            if (item.name === task) {
                item.done ? unfulfilledTask(index) : doneTask(index);
            }
        });
    };
    const makeDoneAllTasks = () => {
        collectionOfTasks.forEach((item, index) => {
            doneTask(index);
        });
        renderTaskList(collectionOfTasks);
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
    const renameTask = (taskName, newName) => {
        collectionOfTasks.forEach(item => {
            if (item.name === taskName) {
                item.name = newName;
            }
        });
    }
    const editTaskName = taskRow => {
        const hasEditField = taskRow.querySelector(".editor");

        if (hasEditField) return;

        const editField = document.createElement("input");
        const taskName = taskRow.textContent.trim();

        editField.type = "text";
        editField.value = taskName;
        editField.classList.add("editor");
        taskRow.innerHTML = "";
        taskRow.append(editField);

        editField.addEventListener("blur", ({target}) => {
            renameTask(taskName, target.value);
            renderTaskList(collectionOfTasks);
        });
    }
    const renderTaskRow = task => {
        const {name} = task;
        const li = document.createElement("li");
        const innerLi = `
            <label class="label-checkbox"><input type="checkbox" class="list-checkbox" id="list-checkbox"></label>
            <span class="task-text">${name}</span>
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

    doneAllTaskButton.addEventListener("click", () => {
        makeDoneAllTasks();
    });

    taskList.addEventListener("click", ({target}) => {
        const taskRow = target.closest(".list-item");
        const taskName = taskRow.querySelector(".task-text").textContent.trim();

        if (target.classList.contains("list-checkbox")) {
            taskRow.classList.toggle("done-task");
            changeStateTask(taskName);
        } else if (target.classList.contains("list__remove-button")) {
            removeTask(taskName);
            renderTaskList(collectionOfTasks);
        } else if (target.classList.contains("task-text")) {
            editTaskName(target);
        } else {
            return;
        }

    });  

});