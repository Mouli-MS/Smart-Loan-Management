// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;



// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import UserDashboard from './components/UserDashboard';
// import LoanApplicationForm from './components/LoanApplicationForm';
// import SignUp from './components/Auth/SignUp';
// import Login from './components/Auth/Login';

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/user-dashboard" element={<UserDashboard />} />
//                 <Route path="/loan-application" element={<LoanApplication />} />
//                 <Route path="/signup" element={<SignUp />} />
//                 <Route path="/login" element={<Login />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;
