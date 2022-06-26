import './App.css';
import DashboardPage from './routes/DashboardPage.js';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

function App() {
  return (
    <div className="app">
        <nav>Notifications</nav>
        <DashboardPage socket={socket}/>
    </div>
  );
}

export default App;
