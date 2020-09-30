import { LightningElement,api } from 'lwc';

export default class TodoItem extends LightningElement 
{
    @api todoId;
    @api done = false;
    @api todoName;



    get containerClass()
    {
        return this.done ? "todo completed" : "todo upcomming"
    }

}