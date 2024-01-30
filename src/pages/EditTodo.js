import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FetchTodo, UpdateTodo } from '../services'

const EditTodo = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [editTodo, setEditTodo] = useState({});

    const FetchTodoFromDB = async () => {
        try {
            const todoData = await FetchTodo(id);
            setEditTodo({
                title: todoData.title,
                description: todoData.description,
                id: todoData.id
            });
        } catch (e) {
            console.log(e);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (editTodo.title && editTodo.description) {
            try {
                await UpdateTodo(id, editTodo);
                navigate("/");
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        } else {
            alert("Title and Description cannot be blank");
        }
    }

    useEffect(() => {
        FetchTodoFromDB();
    }, []);

    return (
        <>
            <h1>Edit Todo</h1>
            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={editTodo.title}
                        onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={editTodo.description}
                        onChange={(e) => setEditTodo({ ...editTodo, description: e.target.value })}
                        rows={10}
                        className="form-control"
                    />
                </div>
                <div className="form-group" >
                    <a className="backBtn" onClick={() => { navigate("/") }} >Back</a>
                    <button type="submit" className="btn btn-primary">
                        Edit Todo
                    </button>
                </div>
            </form>
        </>
    )
}

export default EditTodo;