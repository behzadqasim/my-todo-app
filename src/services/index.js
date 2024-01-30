import { db } from "../config/firebase";

const FetchAllTodos = async () => {
    try {
        const response = await db.collection("Todos").get();
        const data = response.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));
        // console.log(data);
        return data;
    } catch (e) {
        alert("Error fetching todos: ", e);
    }
};

const DeleteTodo = async (id) => {
    try {
        await db.collection("Todos").doc(id).delete().
            then(() => {
                alert("Todo successfully deleted!");
            })
            .catch((error) => {
                alert("Error deleting Todo: ", error);
            });
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
}

const FetchTodo = async (id) => {
    try {
        const response = await db.collection("Todos").doc(id).get();
        const data = {
            ...response.data(),
            id: response.id
        };
        return data;
    } catch (e) {
        alert("Error fetching todo: ", e);
    }
}

const UpdateTodo = async (id, todo) => {
    try {
        await db.collection("Todos").doc(id).set(todo)
        .then(() => {
            alert("Todo successfully updated!");
        }
        )
        .catch((error) => {
            alert("Error updating todo: ", error);
        });
    } catch (e) {
        alert("Error updating todo: ", e);
    }
}

export {
    FetchAllTodos,
    DeleteTodo,
    FetchTodo,
    UpdateTodo   
}