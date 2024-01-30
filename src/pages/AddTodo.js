import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';

const AddTodo = () => {

    const navigate = useNavigate();

    const randomStringForFirebaseID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const [addTodo, setTodo] = useState({ id: randomStringForFirebaseID, title: "", description: "" });

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        if (addTodo.title && addTodo.description) {
            try {
                await db
                    .collection("Todos")
                    .doc(addTodo.id.toString())
                    .set({
                        title: addTodo.title,
                        description: addTodo.description,
                    }).then(() => {
                        alert("Document successfully written!");
                    })
                    .catch((error) => {
                        alert("Error writing document: ", error);
                    })
                    .finally(() => {
                        setTodo({
                            title: "",
                            description: "",
                        });
                    });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        } else {
            alert("Title and Description cannot be blank");
        }
    }

    return (
        <>
            <h1>Add Todo</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={addTodo.title}
                        onChange={(e) => setTodo({ ...addTodo, title: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={addTodo.description}
                        onChange={(e) => setTodo({ ...addTodo, description: e.target.value })}
                        rows={10}
                        className="form-control"
                    />
                </div>
                <div className="form-group" >
                    <a className="backBtn" onClick={() => { navigate("/") }} >Back</a>
                    <button type="submit" className="btn btn-primary">
                        Add Todo
                    </button>
                </div>
            </form>
        </>
    );
}

export default AddTodo;
