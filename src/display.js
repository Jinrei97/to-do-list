
export class DisplayController {
    constructor(builder, getDOM) {
        this.content = document.querySelector(".content");
        this.builder = builder;
        this.getDOM = getDOM;
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
    #setupSubmitButton(projectList){
        const btn_submit = document.querySelector(".submitProject");
        btn_submit.addEventListener("click", (e) => {
            e.preventDefault();
            projectList.addProject(this.getDOM.getFormValues(this.content));
            this.loadProjectList(projectList.project_list);
        });
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
        this.#setupSubmitButton(projectList);
        this.refreshProjectSidebar(projectList.project_list);
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