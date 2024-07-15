import { compareAsc, format, addWeeks } from "date-fns";

export class DateCalc {
    constructor() {
        this.compareAsc = compareAsc;
        this.format = format;
        this.addWeeks = addWeeks;
    }
    format_mdy(date) {
        return format(date, "MM-dd-yyyy");
    }
    format_ymd(date) {
        return format(date, "yyyy-MM-dd");
    }
}