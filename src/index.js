import * as css from "./index.css";
import { ProjectList } from "./projectList.js";
import { DisplayController } from "./display.js";
import { Builder } from "./createElements.js";
import { GetFromDOM } from "./getData.js";
import { DateCalc } from "./dateCalc.js";

const todoList = new class List {
    constructor() {
        const dateCalculator = new DateCalc();
        this.dateCalc = dateCalculator;
        this.controller = new DisplayController(new Builder(dateCalculator), new GetFromDOM(), dateCalculator);
        this.projects = new ProjectList(dateCalculator);
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
        btn_upcoming.addEventListener("click", () => this.controller.loadUpcoming(this.projects.project_list,
            this.setupDateSelector.bind(this)
        ));
        btn_urgent.addEventListener("click", () => this.controller.loadUrgent(this.projects.project_list));
    }
    setupDateSelector() {
        const dateSelector = document.querySelector(".datePicker");
        const searchHistory = [dateSelector.value];
        dateSelector.addEventListener("change", e => {
            searchHistory.push(dateSelector.value);
            const today = this.dateCalc.format_mdy(new Date());
            const comparison = this.dateCalc.compareAsc(dateSelector.value, today);
            if (comparison === 1 || comparison === 0){
                const containerCards = document.querySelector(".projectCards");
                containerCards.replaceChildren();
                for (let project of this.projects.project_list) {
                    const card = this.controller.builder.makeTaskCards(project, dateSelector.value);
                    containerCards.appendChild(card); 
                }
            } else {
                alert("Pick a future date");
                dateSelector.value = searchHistory.at(-2);
            }
        })
    }

}

todoList.projects.addProject(["Test", "2025/03/12", "prova"]);
todoList.projects.addProject(["Test", "2025/05/12", "prova"]);
todoList.projects.addProject(["Test", "2025/03/12", "prova"]);
todoList.projects.addProject(["Test", "2025/05/12", "prova"]);
todoList.projects.addProject(["Test", "2025/03/12", "prova"]);
todoList.projects.addProject(["Test", "2025/05/12", "prova"]);
todoList.projects.addProject(["Test", "2025/03/12", "prova"]);
todoList.projects.project_list[0].addTask("test_task", "2025/05/12", "prova Task", false);
todoList.projects.project_list[0].addTask("test_task", "2025/04/12", "prova Task", false);
todoList.projects.project_list[0].addTask("test", "2025/03/12", "prova Task", false);
todoList.projects.project_list[0].addTask("test", "2025/03/14", "prova Task", false);
todoList.projects.project_list[1].addTask("test_1", "2024/07/14", "prova Task", false);
todoList.projects.project_list[1].addTask("test_2", "2024/07/14", "prova Task", false);
todoList.projects.project_list[0].addTask("test_1", "2024/07/14", "prova Task", false);
todoList.controller.loadProjectList(todoList.projects.project_list);