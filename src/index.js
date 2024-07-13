import * as css from "./index.css";
import { ProjectList } from "./projectList.js";
import { DisplayController } from "./display.js";
import { Builder } from "./createElements.js";
import { GetFromDOM } from "./getData.js";

const todoList = new class List {
    constructor() {
        this.controller = new DisplayController(new Builder(), new GetFromDOM());
        this.projects = new ProjectList();
        this.initializeTab();
    }
    initializeTab() {
        const tabs = [document.querySelector(".tabs").children];
        const btn_add = tabs[0][0];
        const btn_home = tabs[0][1];
        const btn_today = tabs[0][2];
        const btn_upcoming = tabs[0][3];
        const btn_urgent = tabs[0][4];

        btn_add.addEventListener("click", () => this.controller.loadProjectForm(this.projects));
        btn_home.addEventListener("click", () => this.controller.loadProjectList(this.projects.project_list));
        btn_today.addEventListener("click", () => this.controller.loadToday(this.projects.project_list));
        btn_upcoming.addEventListener("click", () => this.controller.loadUpcoming(this.projects.project_list));
        btn_urgent.addEventListener("click", () => this.controller.loadUrgent(this.projects.project_list));
    }
}

todoList.controller.loadProjectList(todoList.projects.project_list);
todoList.projects.addProject(["Test", "12/05/2025", "prova"]);
todoList.projects.addProject(["Test", "12/05/2025", "prova"]);
todoList.projects.addProject(["Test", "12/05/2025", "prova"]);
todoList.projects.addProject(["Test", "12/05/2025", "prova"]);
todoList.projects.addProject(["Test", "12/05/2025", "prova"]);
todoList.projects.addProject(["Test", "12/05/2025", "prova"]);
todoList.projects.addProject(["Test", "12/05/2025", "prova"]);
todoList.projects.project_list[0].addTask("test_task", "12/04/2025", "prova Task", false);
todoList.projects.project_list[0].addTask("test_task", "12/04/2025", "prova Task", false);
todoList.projects.project_list[0].addTask("test", "12/04/2025", "prova Task", false);
