import addTodo from '@salesforce/apex/ToDoController.addTodo';
import getcurrentTodos from '@salesforce/apex/ToDoController.getcurrentTodos';
import {LightningElement,track} from 'lwc';

export default class TodoManager extends LightningElement 
{
    @track time = "8:10 PM";
    @track greeting = "Evening";
    @track todos= [];





    connectedCallback()
    {
        this.getTime();

        this.fetchTodos();


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
            
            todoName: inputBox.value,
            done: false 
        }


        addTodo({payload : JSON.stringify(todo)}).then(response =>{
            console.log('Item Inserted Successfully');
            this.fetchTodos();
        }).catch(error =>{
            console.error('Error in insertig TODO item' + error );
        });



        // this.todos.push(todo);
        inputBox.value = "";
    }


    get upcomingTask()
    {
        return this.todos && this.todos.length ? this.todos.filter( todo => !todo.done) : [];
    }

    get completedTask()
    {
        return this.todos && this.todos.length ? this.todos.filter( todo => todo.done) : [];
    }

    fetchTodos()
    {
        getcurrentTodos().then(result =>{
            if(result){
                console.log('retrived from server',result.length);
                this.todos = result;
            }
            

        }).catch(error =>{
            console.error('Error in fetchings TODO ' + error );
        });
    }
}

//1:19:00 -> PointerVLC