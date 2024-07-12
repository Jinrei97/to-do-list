import * as css from "./index.css";

class ProjectList {
    constructor() {
        this.project_list = [];
    }
    addProject(title, dueDate, description) {
        this.project_list.push(new Project(title, dueDate, description));
        console.log(list.project_list);
    }
    removeProject(index) {
        this.project_list.splice(index, 1);
        console.log(list.project_list);
    }
}

class Project {
    constructor(title, dueDate, description) {
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.tasks = {};
    }
    addTask(taskGroup, dueDate, description, important) {
        if (Object.keys(this.tasks).includes(taskGroup)) {
            this.tasks[taskGroup].push(new Task(taskGroup, dueDate, description, important));
        } else {
            this.tasks[taskGroup] = [];
            this.tasks[taskGroup].push(new Task(taskGroup, dueDate, description, important));
        }
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
        this.dueDate = dueDate;
        this.description = description;
        this.important = important;
    }    
}

class DisplayController {
    constructor() {
        this.content = document.querySelector(".content");
    }
    refreshProjectSidebar(projectList) {
        const myProjects = document.querySelector(".projects");
        myProjects.replaceChildren();
        for (let project of projectList) {
            const li = document.createElement("li");
            li.textContent = project.title;
            myProjects.appendChild(li);
        } 
    }

    makeProjectCard(project) {
        const card = document.createElement("div");
        const header = document.createElement("div"); 
        const title = document.createElement("h3");
        const date = document.createElement("p");
        const description = document.createElement("p");
    
        title.textContent = project.title;
        date.textContent = project.dueDate;
        description.textContent = project.description;
        header.appendChild(title);
        header.appendChild(date);
        card.appendChild(header);
        card.appendChild(description);
        if(project.important) card.classList.toggle("important");
        return card;
    }
    loadProjectList(projectList) {
        this.content.classList.toggle("projectList"); 
        for (let project of projectList) {
            const card = this.makeProjectCard(project);
            this.content.appendChild(card); 
        }
        this.refreshProjectSidebar(projectList);
    }

    loadToday(){

    }
    loadUpcoming(){

    }
    loadUrgent() {

    }
    loadSingleProject() {

    }

}

const list = new ProjectList();
const control = new DisplayController(list);
list.addProject("Test", "12/05/2025", "prova");
list.addProject("Test", "12/05/2025", "prova");
list.addProject("Test", "12/05/2025", "prova");
list.addProject("Test", "12/05/2025", "prova");
list.addProject("Test", "12/05/2025", "prova");
list.addProject("Test", "12/05/2025", "prova");
list.addProject("Test", "12/05/2025", "prova");
list.project_list[0].addTask("test_task", "12/04/2025", "prova Task", false);
list.project_list[0].addTask("test_task", "12/04/2025", "prova Task", false);
list.project_list[0].addTask("test", "12/04/2025", "prova Task", false);
control.loadProjectList(list.project_list);