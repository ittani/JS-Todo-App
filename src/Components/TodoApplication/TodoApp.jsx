import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import './TodoApp.css'; // You can keep your custom CSS for additional styling
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <HeaderComponent />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginComponent />} />
                    <Route path='/login' element={<LoginComponent />} />
                    <Route path='/Welcome/:username' element={<WelcomeComponent />} />
                    <Route path='*' element={<ErrorComponent />} />
                    <Route path='/todos' element={<ListTodoComponent />} />
                    <Route path='/logout' element={<LogoutComponent />} />
                </Routes>
            </BrowserRouter>
            <FooterComponent />
        </div>
    );
}

// Other components remain unchanged

function LoginComponent() {
    const [username, setUsername] = useState('ittani');
    const [password, setPassword] = useState('12345');
    const [SuccessfullMessage, setShowSuccessMessage] = useState(false);
    const [FailedMessage, setShowFailedMessage] = useState(false);
    const navigate = useNavigate();

    function hangleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function hanglePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit() {
        if (username === 'ittani' && password === '12345') {
            console.log('success');
            setShowSuccessMessage(true);
            setShowFailedMessage(false);
            navigate(`/welcome/${username}`);
        } else {
            console.log('Authentication failed, check your credentials and try again');
            setShowFailedMessage(true);
            setShowSuccessMessage(false);
        }
    }

    function SuccessfullMessageComponent() {
        if (SuccessfullMessage) {
            return <div className='alert alert-success'>Authentication successful</div>;
        }
        return null;
    }

    function ErrorMessageComponent() {
        if (FailedMessage) {
            return <div className="alert alert-danger">Authentication Failed. Please check your credentials and try again</div>;
        }
        return null;
    }

    return (
        <div className="Login">
            <SuccessfullMessageComponent />
            <ErrorMessageComponent />
            <div className="LoginForm">
                <h1>Log in</h1>
                <div>
                    <label>User name:</label>
                    <input type="text" name="username" value={username} onChange={hangleUsernameChange} className="form-control" />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={hanglePasswordChange} className="form-control" />
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit} className="btn btn-primary">Login</button>
                </div>
            </div>
        </div>
    );
}

// Other components remain unchanged
function WelcomeComponent() {
    const { username } = useParams();

    return (
        <>
            <HeaderComponent isAuthenticated={true} /> {/* Include HeaderComponent */}
            <div className="Welcome container">
                <h1 className="Welcome-heading">Welcome, {username}!</h1>
                <div className="Welcome-content">
                    <p>
                        We're glad to have you on board. Here, you can manage your todos and stay organized.
                    </p>
                    <p>
                        Explore the following features to get started:
                    </p>
                    <ul>
                        <li>Create new todos</li>
                        <li>Mark todos as complete</li>
                        <li>Delete completed todos</li>
                        <li>Update todos</li> {/* Added statement */}
                    </ul>
                    <p>
                        Ready to get started? <Link to="/todos" className="btn btn-primary">Go to your todos</Link>.
                    </p>
                </div>
            </div>
        </>
    );
}
function ErrorComponent(){

    return (
        <div className="ErrorComponent"> 
          <h1>We are really working hard!</h1>
          <div>
            Aplogies for 404 Error. Reach out to our team at maemoGlobals.com
          </div>
</div>
    )
}

function ListTodoComponent(){

    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDate());

    const [todos, setTodos] = useState([
        { id: 1, description: 'Learn AWS', done: false, targetDate: targetDate },
        { id: 2, description: 'Learn Docker', done: false, targetDate: targetDate },
        { id: 3, description: 'Learn Full-stack API', done: false, targetDate: targetDate },
        { id: 4, description: 'Learn DevOps', done: false, targetDate: targetDate }
    ]);
    const [newTodoDescription, setNewTodoDescription] = useState('');
    const [editTodo, setEditTodo] = useState(null);

    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleEdit = (id) => {
        const todoToEdit = todos.find(todo => todo.id === id);
        setEditTodo({
            id: todoToEdit.id,
            description: todoToEdit.description
        });
    };

    const handleUpdate = (id, updatedDescription) => {
        const index = todos.findIndex(todo => todo.id === id);
        const updatedTodos = [...todos];
        updatedTodos[index].description = updatedDescription;
        setTodos(updatedTodos);
        setEditTodo(null);
    };

    const handleAddTodo = () => {
        if (!newTodoDescription) return;
        const newTodo = {
            id: todos.length + 1,
            description: newTodoDescription,
            done: false,
            targetDate: targetDate
        };
        setTodos([...todos, newTodo]);
        setNewTodoDescription('');
    };

    const handleSubmitTodo = (e) => {
        e.preventDefault();
        handleAddTodo();
    };

    return (
        <div className="ListTodoComponent">
            <HeaderComponent isAuthenticated={true} />
            <h1 className="Todo-heading">Things You Want to Do</h1>
            <div className="Todo-actions">
                <button className="btn btn-primary" onClick={handleAddTodo}>Add Todo</button>
            </div>
            <form onSubmit={handleSubmitTodo} className="mt-3 mb-3">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter todo description"
                        value={newTodoDescription}
                        onChange={(e) => setNewTodoDescription(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
            </form>
            <div className="Todo-table">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map(todo => (
                            <tr key={todo.id}>
                                <td>{todo.id}</td>
                                <td>
                                    {editTodo && editTodo.id === todo.id ? (
                                        <input
                                            type="text"
                                            value={editTodo.description}
                                            onChange={(e) => handleUpdate(todo.id, e.target.value)}
                                            className="form-control"
                                        />
                                    ) : (
                                        todo.description
                                    )}
                                </td>
                                <td>{todo.done.toString()}</td>
                                <td>{todo.targetDate.toDateString()}</td>
                                <td>
                                    {editTodo && editTodo.id === todo.id ? (
                                        <button className="btn btn-primary">Save</button>
                                    ) : (
                                        <>
                                            <button className="btn btn-danger" onClick={() => handleDelete(todo.id)}>Delete</button>
                                            <button className="btn btn-primary" onClick={() => handleEdit(todo.id)}>Edit</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
}




function HeaderComponent({ isAuthenticated }) {
    if (!isAuthenticated) return null;

    return (
        <header className="header">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/welcome/ittani">Todo App</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="/todos">Todos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/logout">Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
}

function FooterComponent(){

  return (
      <footer className="footer"> 
        <div className='container'>
           Reach out to our team: ittani@gmail.com
        </div>
        </footer>
  )
}

function LogoutComponent() {
  const navigate = useNavigate();

  function handleLogout() {
    navigate('/login');
  }

  return (
    <div className="LogoutComponent">
      <div className="logout-message">
        <h2>We're sorry to see you leave!</h2>
        <p>Are you sure you want to log out?</p>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
}