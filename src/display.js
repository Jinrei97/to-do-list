
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
        this.content.classList = ["content"];
        this.content.classList.toggle(className);
    }

    #makeProjectCard(project) {
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
            const card = this.#makeProjectCard(project);
            this.content.appendChild(card); 
        }
        this.refreshProjectSidebar(projectList);
    }
    // mostra un form per inserire un nuovo progetto
    #createLabelInput(inputElement, attrName, name, type, placeholder, req, labelMessage, order=1) {
        const label = document.createElement("label");
        const input = document.createElement(inputElement);
    
        label.setAttribute("for", attrName);
        label.classList.add(attrName);
        label.textContent = labelMessage;
    
        input.setAttribute("id", attrName);
        input.setAttribute("name", name);
        input.setAttribute("type", type);
        input.setAttribute("placeholder", placeholder);
        if (req) input.required = true;
    
        const card = document.createElement("div");
        if (order === 1) {
            card.appendChild(label);
            card.appendChild(input);
        } else if (order === 2) {
            card.appendChild(input);
            card.appendChild(label);
        }
        return card;
    }
    
    #createForm(projectList) {
        const form = document.createElement("form");

        const card_list = [];
        card_list.push(this.#createLabelInput("input", "title", "title", "text", "", true, "Title (richiesto)"));
        card_list.push(this.#createLabelInput("input", "dueDate", "dueDate", "date", "", true, "Scadenza (richiesto)"));
        card_list.push(this.#createLabelInput("textarea", "description", "description", "text", "", false, "Descrizione"));
        for (let card of card_list) form.appendChild(card);

        const btn_submit = document.createElement("button");
        btn_submit.addEventListener("click", (e) => {
            e.preventDefault();
            projectList.addProject(this.#getFormValues());
            this.loadProjectList(projectList.project_list);
        });
        btn_submit.type = "submit";
        btn_submit.textContent = "Add project";
        form.appendChild(btn_submit);
        return form;
    }
    #getFormValues() {
        const cards = this.content.querySelectorAll("div");
        const values = [];
        cards.forEach(card => {
            values.push(card.querySelector("input, textarea").value);
        });
        return values;
    }

    loadProjectForm(projectList) {
        this.cleanContent();
        this.changeContentClass("addProject");
        this.content.appendChild(this.#createForm(projectList));
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