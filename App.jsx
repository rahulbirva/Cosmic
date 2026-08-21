import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'; // Imports your new dark theme
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import MyDiary from './pages/MyDiary';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/diary" element={<MyDiary />} />
      </Routes>
    </BrowserRouter>
  );
}