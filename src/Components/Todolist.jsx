import React, { useState, useEffect } from "react";
import dataJson from "../../data.json";
import "./Todolist.css";

const Posts = () => {
  // states
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState([]);
  const [data, setData] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [editConfirmation, setEditConfirmation] = useState(null);
  const [editData, setEditData] = useState("");

  // add Functiom 
  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleClick = () => {
    setText([...text, data]);
    setData("");
  };

  // handle Update and Delete
  const handleDelete = async (post) => {
    setDeleteConfirmation(post);
  };

  const handleEdit = (post) => {
    setEditData(post.title);
    setEditConfirmation(post);
  };

  const handleDelete1 = (e) => {
    setDeleteConfirmation(e)
  };

  const handleEdit1 = (e) => {
    setEditData(e);
    setEditConfirmation(e);
  };

  // confirm to update and delete
  const confirmDelete = () => {
    setTodos(todos.filter((p) => p.id !== deleteConfirmation.id));
    setText(text.filter((t) => t.id !== deleteConfirmation.id));
    setDeleteConfirmation(null);
  };

  const confirmUpdate = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editConfirmation.id) {
        return { ...todo, title: editData };
      }
      return todo;
    });

    setTodos(updatedTodos);

    const updatedText = text.map((t) => {
      if (t.id === editConfirmation.id) {
        return editData;
      }
      return t;
    });

    setText(updatedText);
    setEditConfirmation(null);
    setEditData("");
  };

  // Cencel update and delete
  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  const cancelUpdate = () => {
    setEditConfirmation(null);
    setEditData("");
  };

  // data
  useEffect(() => {
    setTodos(dataJson.todos);
  }, []);

  return (
    <div className="App">
      <div className="baseMain">
        <br />
        <br />
        <input value={data} type="text" placeholder=""
          className="inputSearch"
          onChange={handleChange}
        />
        <button onClick={handleClick} className="addButton">Add</button>
        <div>
          <div className="main-menu">
            {text.map((e, index) => (
              <p key={index}>{e}
                <div>
                  <button className="edit" onClick={() => handleEdit1(e)}>edit</button>
                  <button className="delete" onClick={() => handleDelete1(e)}>delete</button>
                </div>
              </p>
            ))}
            {todos && todos.map((e) => (
                <div key={e.id}><p>{e.title}
                    <div>
                      <button className="edit" onClick={() => handleEdit(e)}>edit</button>
                      <button className="delete" onClick={() => handleDelete(e)}>delete</button>
                    </div>
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
      {deleteConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this item?</p>
            <div>
              <button onClick={confirmDelete} className="delete-confirm">Yes</button>
              <button onClick={cancelDelete} className="delete-cancel">No</button>
            </div>
          </div>
        </div>
      )}
      {editConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Update</h2>
            <p>Are you sure you want to update this item?</p>
            <div>
              <input type="text" value={editData} onChange={(e) => setEditData(e.target.value)}/>
              <br />
              <button onClick={confirmUpdate} className="update-confirm">Save</button>
              <button onClick={cancelUpdate} className="update-cancel">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;