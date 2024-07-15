export class ProjectList {
    constructor(dateCalc) {
        this.project_list = [];
        this.dateCalc = dateCalc;
    }

    #sortProjects(a, b) {
        return this.dateCalc.compareAsc(a.dueDate, b.dueDate);
    }
    addProject([title, dueDate, description]) {
        this.project_list.push(new Project(title, dueDate, description, this.dateCalc));
        this.project_list.sort(() => this.#sortProjects);
        console.log(this.project_list);
    }
    removeProject(index) {
        this.project_list.splice(index, 1);
        console.log(this.project_list);
    }
}

class Project {
    constructor(title, dueDate, description, dateCalc) {
        this.title = title;
        this.dateCalc = dateCalc;
        this.dueDate = this.dateCalc.format_mdy(new Date(dueDate));
        this.description = description;
        this.tasks = [];
    }
    #sortTasks(a, b) {
        return this.dateCalc.compareAsc(a.dueDate, b.dueDate);
    }
    addTask(title, dueDate, description, important) {
        this.tasks.push(new Task(title, dueDate, description, important, this.dateCalc.format_mdy));
        this.tasks.sort(() => this.#sortTasks);
        console.log(this.tasks);
    }
    removeTask(group, index) {
        this.tasks[group].splice(index, 1);
        console.log(list.tasks[group]);
    }
}

class Task {
    constructor(title, dueDate, description, important, format_mdy) {
        this.title = title;
        this.dueDate = format_mdy(new Date(dueDate));
        this.description = description;
        this.important = important;
    }    
}

