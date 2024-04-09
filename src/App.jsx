import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import HotelzimmerListPage from "./pages/ZimmerListPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ZimmerDetailPage, {hotelzimmerLoader} from "./pages/ZimmerDetailPage.jsx";


import ZimmerAddPage from './pages/ZimmerAddPage.jsx';
import ZimmerEditPage from './pages/ZimmerEditPage.jsx';

const App = () => {

    // CRUD

    // CREATE
    const addHotelzimmer = async (newHotelzimmer) => {
        await fetch('http://localhost:8080/api/hotelzimmer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newHotelzimmer),
        });
        return;
    };


    // UPDATE
    const updateHotelzimmer = async (hotelzimmer) => {
        await fetch(`http://localhost:8080/api/hotelzimmer`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(hotelzimmer),
        });
        return;
    };

    // DELETE
    const deleteHotelzimmer = async (zimmernummer) => {
        await fetch(`http://localhost:8080/api/hotelzimmer/${zimmernummer}`, {
            method: 'DELETE',
        });
        return;
    };



    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path='/login' element={<LoginPage/>}/>

                <Route path='/hotelzimmer' element={<HotelzimmerListPage/>}/>


                <Route path='/add-hotelzimmer'
                       element={<ZimmerAddPage addHotelzimmerSubmit={addHotelzimmer}/>}
                       loader={hotelzimmerLoader}
                />


                <Route
                    path='/edit-hotelzimmer/:zimmernummer'
                    element={<ZimmerEditPage updateHotelzimmerSubmit={updateHotelzimmer}/>}
                    loader={hotelzimmerLoader}
                />


                <Route
                    path='/hotelzimmer/:zimmernummer'
                    element={<ZimmerDetailPage deleteHotelzimmer={deleteHotelzimmer}/>}
                    loader={hotelzimmerLoader}
                />

                <Route path='*' element={<NotFoundPage/>}/>
            </Route>
        )
    );

    return <RouterProvider router={router}/>;
};
export default App;
