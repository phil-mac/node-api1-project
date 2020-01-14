import React, {useState, useEffect} from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  },[])
  
  const getUsers = () => {
    axios.get('http://localhost:8001/api/users')
      .then(res => {
        console.log(res);
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const deleteUser = (id) => {
    axios.delete(`http://localhost:8001/api/users/${id}`)
    .then(res => {
      console.log(res);
      getUsers();
    })
    .catch(err => {
      console.log(err);
    })
  }

  const addUser = (id, user) => {
    axios.delete(`http://localhost:8001/api/users/${id}`)
    .then(res => {
      console.log(res);
      getUsers();
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        Users:
        {users.map(user => (
          <div key={user.id} style={{background: 'grey', margin:'5px', padding:'0 20px'}}>
            <p>{user.id}: {user.name}</p>
            <p>{`  ${user.bio}`}</p>
            <button onClick={() => deleteUser(user.id)} style={{background: 'red', color:'white', margin:'10px'}}>X</button>
          </div>
        ))}
        Add or edit user:
        <form style={{display: 'flex', flexDirection: 'column', width: '200px', background: 'grey'}}>
          <input type='text' placeholder='name'/>
          <input type='text' placeholder='bio'/>
          <button>Add</button>
          <br/>
          <input type='number' placeholder='user id (for editting only)'/>
          <button>Update</button>
        </form>
      </header>
    </div>
  );
}

export default App;
