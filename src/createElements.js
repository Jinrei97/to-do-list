import { format } from "date-fns";

export class Builder {
    constructor() { }

    populateMyProjects(ul, elements) {
        for (let element of elements) {
            const li = document.createElement("li");
            li.textContent = element.title;
            ul.appendChild(li);
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
    
    createForm() {
        const form = document.createElement("form");

        const card_list = [];
        card_list.push(this.#createLabelInput("input", "title", "title", "text", "", true, "Title (richiesto)"));
        card_list.push(this.#createLabelInput("input", "dueDate", "dueDate", "date", "", true, "Scadenza (richiesto)"));
        card_list.push(this.#createLabelInput("textarea", "description", "description", "text", "", false, "Descrizione"));
        for (let card of card_list) form.appendChild(card);

        const btn_submit = document.createElement("button");
        btn_submit.className = "submitProject";
        btn_submit.type = "submit";
        btn_submit.textContent = "Add project";
        form.appendChild(btn_submit);
        return form;
    }

    #makeTaskCard(task) {
        const card = document.createElement("div");
        const title = document.createElement("h4");
        const description = document.createElement("p");
    
        title.textContent = task.title;
        description.textContent = task.description;
        card.appendChild(title);
        card.appendChild(description);
        if(task.important) card.classList.toggle("important");
        return card;
    }
    makeTodayCard(project) {
        const currentDate = format(new Date(), "MM-dd-yyyy");
        const projectCard = this.makeProjectCard(project);

        const taskListTitle = document.createElement("p");
        taskListTitle.textContent = `Tasks for today (${currentDate}): `;
        projectCard.appendChild(taskListTitle);
        const todayTasks = [];
        for (let task of project.tasks) {
            if (task.dueDate === currentDate) {
                todayTasks.push(task);
            }
        }
        if (todayTasks.length > 0) {
            for (let task of todayTasks) {
                const taskCard = this.#makeTaskCard(task);
                projectCard.appendChild(taskCard);
            }
        } else {
            const div = document.createElement("div");
            div.textContent = "No tasks today";
            projectCard.appendChild(div);
        }
        return projectCard;
        

    }
    // today
    makeTodayCards() {
        console.log(`current date: ${currentDate}`);

    }
}
