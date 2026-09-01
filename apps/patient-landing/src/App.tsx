import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PatientChannelPage from './pages/PatientChannelPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/patient/channels" element={<PatientChannelPage />} />
        
        {/* External Redirects - These act as bridges to your other apps */}
        <Route 
          path="/doctor/login" 
          element={<Navigate to="http://localhost:3001" replace={true} />} 
        />
        <Route 
          path="/patient/app" 
          element={<Navigate to="http://localhost:3002" replace={true} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;