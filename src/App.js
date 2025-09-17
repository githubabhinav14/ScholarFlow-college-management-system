import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Personal from './components/personalcomponent/Personal';
import Marks from './components/Marks';
import WorkStation from './components/WorkStation';
import Buckets from './components/workstation/Buckets';
import RepositoryLayout from './components/workstation/Repository';
import Sidebar from './components/workstation/sidebar';
import TopBar from './components/workstation/Topbar';
import MyClassRoom from './components/workstation/page';
import { NotificationProvider } from './components/contextprovider/NotificationContext';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <TopBar />
        <div className="flex h-screen">
          <Sidebar />
          <Routes>
            <Route path="/" element={<RepositoryLayout />} />
            <Route path="/personal" element={<MyClassRoom />} />
            <Route path="/marks" element={<Marks />} />
            <Route path="/workstation" element={<WorkStation />} />
            <Route path="/buckets" element={<Buckets />} />
          </Routes>
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;
