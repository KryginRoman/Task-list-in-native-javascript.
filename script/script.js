document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    const taskList = document.querySelector(".list");
    const addTaskButton = document.querySelector(".task-input__add");
    const clearTaskButton = document.querySelector(".task-input__clear");
    const doneAllTaskButton = document.querySelector(".task-input__done");
    let collectionOfTasks = [];
    let storageTasks = JSON.parse(localStorage.getItem("storageTasks"));
    const updateStorage = () => {
        localStorage.setItem("storageTasks", JSON.stringify(collectionOfTasks));
        storageTasks = JSON.parse(localStorage.getItem("storageTasks"));
    };

    storageTasks 
        ? collectionOfTasks = [...storageTasks] 
        : updateStorage();
    
    /*Functionality*/

    const validateInput = inp => {
        const inpValue = inp.value.trim().toLowerCase();

        return !(/[A-Za-z]{1,10}/.test(inpValue));
    };
    const addTask = (name, taskCollection) => {
        if (hasTask(name, taskCollection)) return;

        taskCollection.push({name, done: false});
        updateStorage();
        renderTaskList(storageTasks);
    };
    const removeTask = (task, taskCollection) => {
        const indexTask = taskCollection.findIndex(item => (item.name === task));

        taskCollection.splice(indexTask, 1);
        updateStorage();
        renderTaskList(storageTasks);
    };
    const doneTask = (indexTask, taskCollection) => {
        taskCollection[indexTask].done = true;
    };
    const unfulfilledTask = (indexTask, taskCollection) => {
        taskCollection[indexTask].done = false;
    };
    const changeStateTask = (task, taskCollection) => {  
        taskCollection.forEach((item, index) => item.name === task ? (item.done ? unfulfilledTask(index, taskCollection) : doneTask(index, taskCollection)) : item.name);
        updateStorage();
        renderTaskList(storageTasks);
    };
    const makeDoneAllTasks = taskCollection => {
        taskCollection.forEach((item, index) => doneTask(index, taskCollection));
        updateStorage();
        renderTaskList(storageTasks);
    };
    const hasTask = (taskName, taskCollection) => {
        return taskCollection.findIndex(item => (item.name === taskName)) != -1;
    };
    const clearTaskList = taskCollection => {
        taskCollection.splice(0, taskCollection.length);
        updateStorage();
        renderTaskList(storageTasks);
    };
    const renameTask = (taskName, newName, taskCollection) => {
        taskCollection.forEach(item => item.name === taskName ? item.name = newName : item.name);
    }
    const editTaskName = (taskRow, taskCollection) => {
        if (taskRow.querySelector(".editor")) return;

        const editField = document.createElement("input");
        const taskName = taskRow.textContent.trim();

        editField.type = "text";
        editField.value = taskName;
        editField.classList.add("editor");
        taskRow.innerHTML = "";
        taskRow.append(editField);

        editField.addEventListener("blur", ({target}) => {
            renameTask(taskName, target.value, taskCollection);
            updateStorage();
            renderTaskList(storageTasks);
        });
    }
    const renderTaskRow = ({name, done}) => {
        const li = document.createElement("li");
        const innerLi = `
            <label class="label-checkbox"><input type="checkbox" class="list-checkbox" id="list-checkbox"></label>
            <span class="task-text">${name}</span>
            <div class="list__remove-button"></div>
        `;
        if (done) li.classList.add("done-task");

        li.classList.add("list-item");
        li.innerHTML = innerLi;

        return li;
    };
    const renderTaskList = taskCollection => {
        taskList.innerHTML = "";

        taskCollection.forEach(item => taskList.append(renderTaskRow(item)));
    };

    /*List initialization*/

    renderTaskList(storageTasks);

    /*Adding event handlers*/

    addTaskButton.addEventListener("click", () => {
        const inputField = document.querySelector(".task-input__field");
        // const lowerCaseTaskName = inputField.value.toLowerCase();!lowerCaseTaskName || lowerCaseTaskName.length > 10

        if (validateInput(inputField)) {
            alert("empty field or longer than 10 characters.(use only letters)");
            inputField.classList.add("task-input__field_invalid");
        } else {
            addTask(inputField.value.trim().toLowerCase(), collectionOfTasks);
            inputField.value = "";
            inputField.classList.remove("task-input__field_invalid");
        }

    });

    clearTaskButton.addEventListener("click", () => {
        clearTaskList(collectionOfTasks);
    });

    doneAllTaskButton.addEventListener("click", () => {
        makeDoneAllTasks(collectionOfTasks);
    });

    taskList.addEventListener("click", ({target}) => {
        const taskRow = target.closest(".list-item");
        const taskName = taskRow.querySelector(".task-text").textContent.trim();

        if (target.classList.contains("list-checkbox")) {
            taskRow.classList.toggle("done-task");
            changeStateTask(taskName, collectionOfTasks);
        } else if (target.classList.contains("list__remove-button")) {
            removeTask(taskName, collectionOfTasks);
        } else if (target.classList.contains("task-text")) {
            editTaskName(target, collectionOfTasks);
        } else {
            return;
        }

    });  

});