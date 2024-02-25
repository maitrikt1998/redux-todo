import { useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, editTodo, deleteTodo } from './todoSlice';

function App() {
  const [ text, setText ] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  
  const handleAddTodo = () =>{
    if( text.trim !== ''){
      dispatch(addTodo(text));
      setText('');
    }
  }

  const handleEditStart = (id, text) =>{
    setEditId(id);
    setEditText(text);
  }

  const handleEditCancel = () => {
    setEditId(null);
    setEditText('');
  }

  const handleEditSave = () => {
    if (editText.trim() !== '') { 
      dispatch(editTodo({id:editId, newtext:editText}))
    }
    setEditId(null);
    setEditText('');
  }
  

  return (
    <div className="App">
      <input type='text' value={text} onChange={ e=> setText(e.target.value) } placeholder='Enter a New Todo' />
      <button onClick= {handleAddTodo} >Add Todo</button>
      <ul>
        {todos.map(todo=>(
          <li key={todo.id}>
            {editId === todo.id ? (
                <>
                <input type='text' value={editText} onChange={e=> setEditText(e.target.value)} />
                <button onClick={handleEditSave}>Save</button>
                <button onClick={handleEditCancel}>Cancel</button>
                </>
              ):(
                <>
                <input type='checkbox' checked={todo.completed} onChange={()=>dispatch(toggleTodo(todo.id))} />
                <span style={{ textDecoration: todo.completed ? 'line-through': 'none' }}>
                  {todo.text}
                </span>
                <button onClick={()=> handleEditStart(todo.id, todo.text)}>Edit</button>
                <button onClick={()=> dispatch(deleteTodo(todo.id))}>Delete</button>
                </>
              )
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
