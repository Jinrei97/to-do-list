// classe che va a prendere i dati dagli elementi del DOM
export class GetFromDOM {
    constructor() {

    }

    getFormValues(content) {
        const cards = content.querySelectorAll("div");
        const values = [];
        cards.forEach(card => {
            values.push(card.querySelector("input, textarea").value);
        });
        return values;
    }
}