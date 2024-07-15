export class DisplayController {
    constructor(builder, getDOM, dateCalc) {
        this.content = document.querySelector(".content");
        this.builder = builder;
        this.getDOM = getDOM;
        this.dateCalc = dateCalc;
    }
    refreshProjectSidebar(projectList) {
        const myProjects = document.querySelector(".projects");
        myProjects.replaceChildren();
        this.builder.populateMyProjects(myProjects, projectList);
    }

    cleanContent() {
        this.content.replaceChildren();
    }
    changeContentClass(className) {
        this.content.classList = ["content"];
        this.content.classList.toggle(className);
    }

    loadProjectList(projectList) {
        this.cleanContent();
        this.changeContentClass("projectList"); 
        for (let project of projectList) {
            const card = this.builder.makeProjectCard(project);
            this.content.appendChild(card); 
        }
        this.refreshProjectSidebar(projectList);
    }
    // mostra un form per inserire un nuovo progetto
    loadProjectForm(projectList) {
        this.cleanContent();
        this.changeContentClass("addProject");
        this.content.appendChild(this.builder.createForm());
        this.refreshProjectSidebar(projectList.project_list);
    }

    // mostra le task di oggi
    loadToday(projectList){
        this.cleanContent();
        this.changeContentClass("today");
        const currentDate = this.dateCalc.format_mdy(new Date());
        for (let project of projectList) {
            const card = this.builder.makeTaskCards(project, currentDate);
            this.content.appendChild(card); 
        }
    }
    loadUpcoming(projectList, setupDateSelector){
        this.cleanContent();
        this.changeContentClass("upcoming");
        const currentDate = this.dateCalc.format_mdy(new Date());
        const nextWeek = this.dateCalc.format_mdy(this.dateCalc.addWeeks(currentDate, 1));
        this.content.appendChild(this.builder.makeDateSelector());
        setupDateSelector();
        const containerCards = document.createElement("div");
        containerCards.classList.toggle("projectCards");
        for (let project of projectList) {
            const card = this.builder.makeTaskCards(project, nextWeek);
            containerCards.appendChild(card); 
        }
        this.content.appendChild(containerCards);
    }
    loadUrgent() {

    }
    loadSingleProject() {

    }

}