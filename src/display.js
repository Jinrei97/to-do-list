
export class DisplayController {
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

    cleanContent() {
        this.content.replaceChildren();
    }
    changeContentClass(className) {
        if (!this.content.classList.contains(className)) {
            this.content.classList.toggle(className);
        };
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
        this.cleanContent();
        this.changeContentClass("projectList"); 
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