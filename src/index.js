import * as css from "./index.css";

class ProjectList {
    constructor() {
        this.project_list = [];
    }
    addProject(title, dueDate, description) {
        this.project_list.push(new Project(title, dueDate, description));
        console.log(list.project_list);
    }
}

class Project {
    constructor(title, dueDate, description) {
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.tasks = [];
    }
    addTask(title, dueDate, description, important) {
        this.tasks.push(new Task(title, dueDate, description, important));
        console.log(this.tasks);
    }
}

class Task {
    constructor(title, dueDate, description, important) {
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.important = important;
    }    
}

const list = new ProjectList();

list.addProject("Test", "12/05/2025", "prova");
list.project_list[0].addTask("test_task", "12/04/2025", "prova Task", false);
list.project_list[0].addTask("test_task", "12/04/2025", "prova Task", false);
list.project_list[0].addTask("test_task", "12/04/2025", "prova Task", false);