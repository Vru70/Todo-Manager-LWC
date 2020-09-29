import {LightningElement,track} from 'lwc';

export default class TodoManager extends LightningElement 
{
    @track time = "8:10 PM";
    @track greeting = "Evening";
    @track todos= [];





    connectedCallback()
    {
        this.getTime();

        setInterval(() => {
            this.getTime();
            //console.log("Set interval called....");
        }, 1000);
    }


    getTime() {
        const date = new Date();
        const hour =  date.getHours();
        const min =  date.getMinutes();
        const sec = date.getSeconds();

        this.time =`${this.getHour(hour)}:${this.getDoubleDigit(min)}:${this.getDoubleDigit(sec)} ${this.getMidDay(hour)}`;
        this.getGriteeing(hour);
    }

    getHour(hour) {
        return hour === 0 ? 12 : hour > 12 ? (hour - 12) : hour;
    }
    
    getMidDay(hour)
    {
        return hour >=12 ? "PM" : "AM";

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


    // todo handeler on click event of add buttn
    addTodoHandler()
    {
        const  inputBox = this.template.querySelector("lightning-input");
        console.log('Current value :', inputBox.value);
        const todo ={
            todoId: this.todos.length,
            todoName: inputBox.value,
            done: false,
            todoDate: new Date()
        }
         
        this.todos.push(todo);
        inputBox.value = "";
    }
}

//45:00 -> PointerVLC