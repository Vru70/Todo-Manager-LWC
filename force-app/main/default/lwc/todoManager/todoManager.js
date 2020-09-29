import {LightningElement,track} from 'lwc';

export default class TodoManager extends LightningElement {
    time = "8:10 PM";
    greeting = "Evening";

    connectedCallback()
    {
        this.getTime();
    }


    getTime() {
        const date = new Date();
        const hour =  date.getHours();
        const min =  date.getMinutes();

        this.time =`${this.getHour(hour)}:${this.getDoubleDigit(min)} ${this.getMidDay(hour)}`;
        this.getGriteeing(hour);
    }

    getHour(hour) {
        return hour === 0 ? 12 : hour > 12 ? (hour - 12) : hour;
    }
    
    getMidDay(hour)
    {
        return hour >= 12 ? "AM" : "PM";

    }
    getDoubleDigit(digit)
    {
        return digit < 10 ? "0"+digit : digit;
    }
    


    getGriteeing(hour) 
    {
        if (hour < 12) 
        {

            this.greeting = "Good Morining";
        } else if (hour >= 12 && hour < 17) 
        {
            this.greeting = "Good Afternoon";

        } else 
        {
            this.greeting = "Good Evening";
        }
    }
}

//23:38 