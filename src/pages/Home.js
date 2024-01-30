import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from '../config/firebase';
import { FetchAllTodos, DeleteTodo } from "../services";
import { useSelector, useDispatch } from 'react-redux';
import { setTodos } from "../store/Slices/todos/todo";

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allTodosInStore = useSelector((state) => state.todo.allTodos);

    const [allTodos, setAllTodos] = useState(allTodosInStore || []);

    const DeleteTodoFromDB = async (id) => {
        try {
            await DeleteTodo(id).finally(()=>{ window.location.reload(); })
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };
    
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                dispatch(setTodos([]));
                const todosData = await FetchAllTodos();
                dispatch(setTodos(todosData));
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };
        fetchTodos();
    }, []);

    return (
        <>
            <div className="headingContainer" >
                <h2 className="heading" >Todos</h2>
            </div>
            <div className="SubContainer" >
                <button className="btn" onClick={() => { navigate("/add-todo") }} >Add New Todo</button>
            </div>
            <div className="SubContainer" >
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allTodos.map((todo) => (
                                <tr key={todo.id} >
                                    <td>{todo.title}</td>
                                    <td>{todo.description}</td>
                                    <td className="actions">
                                        <button className="btn btn-edit" onClick={() => navigate(`/edit-todo/${todo.id}`)}>Edit</button>
                                        <button className="btn btn-delete" onClick={() => { DeleteTodoFromDB(todo.id); }}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Home;