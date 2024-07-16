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

    // mostra un form per inserire un nuovo progetto
    loadProjectForm(projectList) {
        this.cleanContent();
        this.changeContentClass("addProject");
        this.content.appendChild(this.builder.createForm());
        this.refreshProjectSidebar(projectList.project_list);
    }

    loadProjectList(projectList, setupProjectCard) {
        this.cleanContent();
        this.changeContentClass("projectList"); 
        for (const [index, project] of projectList.entries()) {
            const card = this.builder.makeProjectCard(project);
            setupProjectCard(card, index);
            this.content.appendChild(card); 
        }
        this.refreshProjectSidebar(projectList);
    }
    // mostra le task di oggi
    loadToday(projectList, setupProjectCard){
        this.cleanContent();
        this.changeContentClass("today");
        const currentDate = this.dateCalc.format_mdy(new Date());
        for (const [index, project] of projectList.entries()) {
            const card = this.builder.makeTaskCards(project, currentDate);
            setupProjectCard(card, index);
            this.content.appendChild(card); 
        }
    }
    loadUpcoming(projectList, setupDateSelector, setupImportant, setupProjectCard,
        importantOnly = false,
        dateFilter = this.dateCalc.format_ymd(this.dateCalc.addWeeks(new Date(), 1)),
        impInitialValue = "false") {
        this.cleanContent();
        this.changeContentClass("upcoming");
        this.content.appendChild(this.builder.makeDateSelector(dateFilter));
        document.querySelector(".filter").appendChild(this.builder.makeImportantFilter());
        setupDateSelector();
        setupImportant(impInitialValue);
        const containerCards = document.createElement("div");
        containerCards.classList.toggle("projectCards");
        for (const [index, project] of projectList.entries()) {
            const card = this.builder.makeTaskCards(project, dateFilter, importantOnly);
            setupProjectCard(card, index);
            containerCards.appendChild(card); 
        }
        this.content.appendChild(containerCards);
    }
    loadSingleProject(project) {

    }

}