import './App.css';
import MainPage from './components/page/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddForm from './components/page/AddForm';




function App() {


  return (
    <BrowserRouter  basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="add-form" element={<AddForm />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
