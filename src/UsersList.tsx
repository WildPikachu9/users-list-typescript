import { useState } from 'react';
import React from 'react';
import './UsersList.css';

const UsersList = () => {

    type User = {
        username: string;
        email: string;
        usertype: string;
        id: string | number;
    }

    const [formData, setFormData] = useState<User>({
        username: '',
        email: '',
        usertype: 'Admin',
        id: ''
    });
    const [users, setUsers] = useState<User[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target;
        const name = target.name;
        setFormData(prevDataForm => {
            return {...prevDataForm, [name]: target.value}
        })
    };

    const setUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUsers((prevUsers) => [
          ...prevUsers,
          { ...formData, id: Date.now() },
        ]);
    };

    const removeUser = (id: string | number) => {
        const filteredUsers = users.filter(user => user.id !== id);
        setUsers(filteredUsers);
    }
    
    return (
        <div className="usersList">
            <form onSubmit={setUser}>
                <label htmlFor="username">user name</label>
                <input type="text" name="username" id="username" placeholder="username" onChange={handleInputChange} value={formData.username} />
                <label htmlFor="email">e-mail</label>
                <input type="email" name="email" id="email" placeholder="email" onChange={handleInputChange} value={formData.email} />
                <label htmlFor="usertype">user type</label>
                <select id='usertype' name='usertype' onChange={handleInputChange} value={formData.usertype} >
                    <option value='User'>User</option>
                    <option value='Admin'>Admin</option>
                </select>
                <button>save</button>
            </form>
            <div className='list'>
                {users.map((user) => {
                     return (<div className='userItem' key={user.id} onClick={() => removeUser(user.id)} >
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                        <p>{user.usertype}</p>
                     </div>
                    );
                })}
            </div>
        </div>
    )
}

export default UsersList;