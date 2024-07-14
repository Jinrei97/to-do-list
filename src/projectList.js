import { compareAsc, format } from "date-fns";

export class ProjectList {
    constructor() {
        this.project_list = [];
    }

    #sortProjects(a, b) {
        return compareAsc(a.dueDate, b.dueDate);
    }
    addProject([title, dueDate, description]) {
        this.project_list.push(new Project(title, dueDate, description));
        this.project_list.sort(this.#sortProjects);
        console.log(this.project_list);
    }
    removeProject(index) {
        this.project_list.splice(index, 1);
        console.log(this.project_list);
    }
}

class Project {
    constructor(title, dueDate, description) {
        this.title = title;
        this.dueDate = format(new Date(dueDate), "MM-dd-yyyy");
        this.description = description;
        this.tasks = [];
    }
    #sortTasks(a, b) {
        return compareAsc(a.dueDate, b.dueDate);
    }
    addTask(dueDate, description, important) {
        this.tasks.push(new Task(dueDate, description, important));
        this.tasks.sort(this.#sortTasks);
        console.log(this.tasks);
    }
    removeTask(group, index) {
        this.tasks[group].splice(index, 1);
        console.log(list.tasks[group]);
    }
}

class Task {
    constructor(title, dueDate, description, important) {
        this.title = title;
        this.dueDate = format(new Date(dueDate), "MM-dd-yyyy");
        this.description = description;
        this.important = important;
    }    
}