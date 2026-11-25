import './App.css'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { DartsListPage } from './Sites/DartsListPage';
import { DartSinglePage } from './Sites/DartsSinglePage';
import { DartsAddNewPage } from './Sites/DartsAddNewPage';
import { DartsUpdatePage } from './Sites/DartsUpdatePage';
import { DartsDeletePage } from './Sites/DartsDeletePage';

export const App = () => {

  return (
    <>
    <div className=''>
      <BrowserRouter>
        <nav className="navbar navbar-expand-sm navbar-light bg-light p-2">
          <NavLink to="/" className="p-2 m-1 text-decoration-none text-black">
            <i className="bi bi-building-fill"></i> Darts Játékosok
          </NavLink>
          <NavLink to="/darts/new-darts" className="p-2 m-1 text-decoration-none text-black">
            <i className="bi bi-plus-circle-fill"></i> Új Darts Játékos
          </NavLink>
        </nav>
        <Routes>
          <Route path='/' element={<DartsListPage/>}/>
          <Route path='/darts/:DartsId' element={<DartSinglePage/>}/>
          <Route path='/darts/new-darts' element={<DartsAddNewPage/>}/>
          <Route path='/mod-darts/:DartsId' element={<DartsUpdatePage/>}/>
          <Route path='/del-darts/:DartsId' element={<DartsDeletePage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
};
