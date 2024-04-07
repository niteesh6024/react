import { useEffect, useState } from "react";
import { retriveTodosUsername, deleteTodoApi } from './api/TodoApiSerivce'
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";


export default 
function ListTodosComponent(){
    const today=new Date();
    const targetDate=new Date(today.getFullYear()+12,today.getMonth(),today.getDate())
    // const todos=[
                // {id:1,description:'learn aws',done:false,targetDate:targetDate},
                // {id:2,description:'learn dev',done:false,targetDate:targetDate},
                // {id:3,description:'learn gke',done:false,targetDate:targetDate}
            // ]

    const [todos,setTodo]=useState([])
    const [message,setMessasge]=useState(null)
    const authcontext=useAuth();
    const userName=authcontext.username
    const navigate=useNavigate()
    useEffect(
        () => refreshTodos(),[]
    )

    function refreshTodos(){
        retriveTodosUsername(userName)
        .then((response => 
                {
                    
                    setTodo(response.data)
                    console.log(todos)
                }
                ))
        .catch((error => console.log(error)))
    }
    function UpdateTodo(id){
        navigate(`/todo/${id}`)
    }
    function addNewTodo(){
        navigate(`/todo/-1`)
    }

    function deleteTodo(id){
        deleteTodoApi(userName,id)
        .then((response => 
                { 
                    setMessasge(`delete of todo with id = ${id} successful`)
                    refreshTodos()
                }
                ))
        .catch((error => console.log(error)))
    }

    return(
        <div className="container">
            <h1>todos</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>description</th>
                            <th>Is Done</th>
                            <th>Target Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                             todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        {/* <td>{todo.targetDate.toString()}</td> */}
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-success" onClick={() => UpdateTodo(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                    </tr>
                                )
                             )
                        }

                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
        </div>
    )
}