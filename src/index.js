import * as css from "./index.css";

class ProjectList {
    constructor(controller) {
        this.project_list = [];
        this.controller = controller;
        this.initializeTab();
    }
    initializeTab() {
        const tabs = [document.querySelector(".tabs").children];
        const btn_add = tabs[0][0];
        const btn_home = tabs[0][1];
        const btn_today = tabs[0][2];
        const btn_upcoming = tabs[0][3];
        const btn_urgent = tabs[0][4];

        btn_add.addEventListener("click", () => this.controller.loadProjectForm(this.project_list));
        btn_home.addEventListener("click", () => this.controller.loadProjectList(this.project_list));
        btn_today.addEventListener("click", () => this.controller.loadToday(this.project_list));
        btn_upcoming.addEventListener("click", () => this.controller.loadUpcoming(this.project_list));
        btn_urgent.addEventListener("click", () => this.controller.loadUrgent(this.project_list));
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
    checkContentClass(className) {
        return this.content.classList.contains(className);
    }
    loadProjectList(projectList) {
        if (!this.checkContentClass("projectList")) {
            this.content.classList.toggle("projectList"); 
            for (let project of projectList) {
                const card = this.makeProjectCard(project);
                this.content.appendChild(card); 
            }
            this.refreshProjectSidebar(projectList);
        }
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

const control = new DisplayController();
const list = new ProjectList(control);
list.addProject("Test", "12/05/2025", "prova");
list.addProject("Test", "12/05/2025", "prova");
list.addProject("Test", "12/05/2025", "prova");
list.addProject("Test", "12/05/2025", "prova");
list.controller.loadProjectList(list.project_list);
list.addProject("Test", "12/05/2025", "prova");
list.addProject("Test", "12/05/2025", "prova");
list.addProject("Test", "12/05/2025", "prova");
list.project_list[0].addTask("test_task", "12/04/2025", "prova Task", false);
list.project_list[0].addTask("test_task", "12/04/2025", "prova Task", false);
list.project_list[0].addTask("test", "12/04/2025", "prova Task", false);
