export class Builder {
    constructor(dateCalc) {
        this.dateCalc = dateCalc;
    }

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

    makeDateSelector() {
        const container = document.createElement("div");
        const datePicker = document.createElement("input");
        datePicker.type = "date";
        datePicker.setAttribute("value", this.dateCalc.format(this.dateCalc.addWeeks(new Date(), 1), "yyyy-MM-dd"));
        datePicker.classList.toggle("datePicker");
        container.appendChild(datePicker);
        return container;
    }

    #makeTaskCard(task) {
        const card = document.createElement("div");
        const header = document.createElement("div");
        const title = document.createElement("h4");
        const date = document.createElement("p");
        const description = document.createElement("p");
    
        title.textContent = task.title;
        date.textContent = task.dueDate;
        description.textContent = task.description;
        header.classList.toggle("cardTask");
        header.appendChild(title);
        header.appendChild(date);
        card.appendChild(header);
        card.appendChild(description);
        if(task.important) card.classList.toggle("important");
        return card;
    }
    makeTaskCards(project, targetDate) {
        const projectCard = this.makeProjectCard(project);

        const taskListTitle = document.createElement("p");
        taskListTitle.textContent = `Tasks until ${targetDate}: `;
        projectCard.appendChild(taskListTitle);
        const todayTasks = [];
        for (let task of project.tasks) {
            const comparison = this.dateCalc.compareAsc(task.dueDate, targetDate);
            if (comparison === -1 || comparison === 0) {
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
}