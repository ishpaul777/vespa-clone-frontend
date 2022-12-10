import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Motorcycles from './pages/Motorcycles';
import AddMotorcycle from './pages/AddMotorcycle';
import DeleteMotorcycle from './pages/DeleteMotorcycle';
import MyReservations from './pages/MyReservations';
import Reserve from './pages/Reserve';
import Sidebar from './components/Sidebar';


const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Motorcycles />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/myReservations" element={<MyReservations />} />
          <Route path="/deleteMotorcycle" element={<DeleteMotorcycle />} />
          <Route path="/addMotorcycle" element={<AddMotorcycle />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
