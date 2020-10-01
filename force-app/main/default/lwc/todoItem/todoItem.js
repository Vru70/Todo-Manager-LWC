import deleteTodo from '@salesforce/apex/ToDoController.deleteTodo';
import updateTodo from '@salesforce/apex/ToDoController.updateTodo';
import { LightningElement,api } from 'lwc';


export default class TodoItem extends LightningElement 
{
    @api todoId;
    @api done = false;
    @api todoName;


    updateHandler()
    {
        const todo ={
            todoId: this.todoId,
            todoName: this.todoName,
            done: !this.done
        }; 

        updateTodo({payload : JSON.stringify(todo)}).then(result =>{
            console.log('Item Updated Successfully');
        
        }).catch(error =>{
            console.error('Error in UPDATE', error );
        });
    }

    deleteHandler()
    {
        deleteTodo({todoId: this.todoId}).then(result =>{
            console.log('Item Deleted Successfully');
           
        }).catch(error =>{
            console.error('Error in Delete', error );
        });
    }

    get containerClass()
    {
        return this.done ? "todo completed" : "todo upcomming";
    }

    get iconName()
    {
        return this.done ? "utility:check" : "utility:add";
    }
}