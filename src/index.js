import * as css from "./index.css";
import { ProjectList } from "./projectList.js";
import { DisplayController } from "./display.js";
import { Builder } from "./createElements.js";
import { GetFromDOM } from "./getData.js";
import { DateCalc } from "./dateCalc.js";

const todoList = new class List {
    constructor() {
        const dateCalculator = new DateCalc();
        this.getDOM = new GetFromDOM();
        this.dateCalc = dateCalculator;
        this.controller = new DisplayController(new Builder(dateCalculator), new GetFromDOM(), dateCalculator);
        this.projects = new ProjectList(dateCalculator);
        this.initializeTab();

        this.refreshList = {
            "projectList": () => this.controller.loadProjectList(
                                    this.projects.project_list,
                                    this.setupProjectCard.bind(this)
            ) ,
            "today": () => this.controller.loadToday(
                            this.projects.project_list,
                            this.setupProjectCard.bind(this)
            ) ,
            "upcoming": () => this.controller.loadUpcoming(this.projects.project_list,
                            this.setupDateSelector.bind(this),
                            this.setupImportant.bind(this),
                            this.setupProjectCard.bind(this)
            ) ,
        };
        console.log(this.refreshList["projectList"]);
        console.log(this.refreshList["today"]);
        console.log(this.refreshList["upcoming"]);
    }
    initializeTab() {
        const tabs = [document.querySelector(".tabs").children];
        const btn_add = tabs[0][0];
        const btn_home = tabs[0][1];
        const btn_today = tabs[0][2];
        const btn_upcoming = tabs[0][3];

        btn_add.addEventListener("click", () => {
            this.controller.loadProjectForm(this.projects);
            this.setupSubmitButton.call(this); 
        });
        btn_home.addEventListener("click", () => this.refreshList["projectList"]());
        btn_today.addEventListener("click", () => this.refreshList["today"]());
        btn_upcoming.addEventListener("click", () => this.refreshList["upcoming"]());
    }
    setupSubmitButton(){
        const btn_submit = document.querySelector(".submitProject");
        btn_submit.addEventListener("click", (e) => {
            e.preventDefault();
            this.projects.addProject(this.getDOM.getFormValues(this.controller.content));
            this.controller.loadProjectList(this.projects.project_list);
        });
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
                for (const [index, project] of this.projects.project_list.entries()) {
                    const card = this.controller.builder.makeTaskCards(project, dateSelector.value);
                    this.setupProjectCard(card, index);
                    containerCards.appendChild(card); 
                }
            } else {
                alert("Pick a future date");
                dateSelector.value = searchHistory.at(-2);
            }
        })
    }
    setupImportant(initialValue = "false") {
        const impInput = document.querySelector("#impOnly");
        impInput.value = initialValue;
        impInput.checked = (initialValue === "false") ? false : true;
        impInput.addEventListener("change", () => {
            impInput.value = (impInput.value === "false") ? "true" : "false";
            const datePicker = document.querySelector(".datePicker"); 
            this.controller.loadUpcoming(this.projects.project_list,
                this.setupDateSelector.bind(this),
                this.setupImportant.bind(this),
                this.setupProjectCard.bind(this),
                ((impInput.value === "true") ? true : false),
                datePicker.value,
                impInput.value
            );
        });
    }
    #setupRemoveBtn(btn, projectIndex) {
        btn.classList.add("RemoveProjectBtn");
        btn.classList.add(`${projectIndex}`);
        btn.textContent = "Delete Project";
        btn.addEventListener("click", e => {
            this.projects.removeProject(projectIndex);
            const contentState = this.controller.content.classList[1];
            this.refreshList[contentState]();
        })
    }
    #setupLoadProjectBtn(btn, projectIndex) {
        btn.classList.add("loadProjectBtn");
        btn.classList.add(`${projectIndex}`);
        btn.textContent = "Load Project Page";
        btn.addEventListener("click", e => {
            this.controller.loadSingleProject(projectIndex);
        })
    }
    setupProjectCard(card, projectIndex) {
        const loadProjectBtn = document.createElement("button");
        this.#setupLoadProjectBtn(loadProjectBtn, projectIndex);
        const removeProjectBtn = document.createElement("button"); 
        this.#setupRemoveBtn(removeProjectBtn, projectIndex);
        card.querySelector("div").appendChild(loadProjectBtn);
        card.querySelector("div").appendChild(removeProjectBtn);

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
todoList.projects.project_list[1].addTask("test_1", "2024/07/14", "prova Task", true);
todoList.projects.project_list[1].addTask("test_2", "2024/07/14", "prova Task", false);
todoList.projects.project_list[0].addTask("test_1", "2024/07/14", "prova Task", true);
todoList.controller.loadProjectList(todoList.projects.project_list,
    (card, projectIndex) => todoList.setupProjectCard(card, projectIndex));