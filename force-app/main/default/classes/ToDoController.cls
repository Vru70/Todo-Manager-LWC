public with sharing class ToDoController 
{
    @AuraEnabled
    public static string addTodo(String payload)
    {
        ToDo payloadObject = (ToDo) JSON.deserialize(payload, ToDo.class);
        SObject tsk =(SObject) Type.forName('ToDo__c').newInstance();
        tsk.put('Name', payloadObject.todoName);
        tsk.put('Done__c', payloadObject.done);

        insert tsk;

        return String.valueOf(tsk.Id);
    }

    @AuraEnabled
    public static void updateTodo(String payload)
    {
        ToDo payloadObject = (ToDo) JSON.deserialize(payload, ToDo.class);
        SObject tsk =(SObject) Type.forName('ToDo__c').newInstance();
        tsk.put('Id', payloadObject.todoId);
        tsk.put('Name', payloadObject.todoName);
        tsk.put('Done__c', payloadObject.done);
        

        update tsk;
    }

    @AuraEnabled
    public static void deleteTodo(String payload)
    {
        
        SObject tsk =(SObject) Type.forName('ToDo__c').newInstance();
        tsk.put('Id', todoId);
        
        delete tsk;
    }


    @AuraEnabled(Callable=true)
    public static List<ToDo> getAllTodos(String payload)
    {
        List<SObject> tsks = Database.query('Select Id, Name, CreatedDate, Done__c FROM ToDo__c WHERE CreatedDate = LAST_N_DAYS:7 ORDERD BY CreatedDate DESC');
        return getToDos(tsks);
    }
    @AuraEnabled
    public static List<ToDo> getcurrentTodos(String payload)
    {
        List<SObject> tsks = Database.query('Select Id, Name, CreatedDate, Done__c FROM ToDo__c WHERE CreatedDate = TODAY ORDERD BY CreatedDate DESC');
        return getToDos(tsks);
    }

    public static List<ToDo> getToDos(List<SObject> tsks)
    {
        List<ToDo> todos = new List<ToDo>();
        for (SObject tsk : tsks)
        {
            ToDo todo = new ToDo();
            todo.todoId = tsk.Id;
            todo.todoName = String.valueOf(tsk.get('Name'));
            todo.todoDate = Date.valueOf(tsk.get('CreatedDate'));
            todo.done = Boolean.valueOf(tsk.get('Done__c'));
            todos.add(todo);
        } 
        return todos;
    }


    class ToDo{
        @AuraEnabled
        public  string todoId;

        @AuraEnabled
        public  string todoName;

        @AuraEnabled
        public  Date todoDate;

        @AuraEnabled
        public  Boolean done;
    }
    
}
