import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from './pages/NotFoundPage';

// CRUD OPERATIONS
import HotelzimmerListPage from "./pages/ZimmerListPage.jsx";
import ZimmerSinglePage, {hotelzimmerLoader} from "./pages/ZimmerSinglePage.jsx";
import ZimmerAddPage from './pages/ZimmerAddPage.jsx';
import ZimmerEditPage from './pages/ZimmerEditPage.jsx';

const App = () => {

    // CRUD OPERATIONS

    // CREATE
    const addHotelzimmer = async (newHotelzimmer) => {
        await fetch('http://localhost:8080/api/hotelzimmer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newHotelzimmer),
        });

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

    };

    // DELETE
    const deleteHotelzimmer = async (zimmernummer) => {
        await fetch(`http://localhost:8080/api/hotelzimmer/${zimmernummer}`, {
            method: 'DELETE',
        });

    };


    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path='/login' element={<LoginPage/>}/>

                {/*READ*/}
                <Route path='/hotelzimmer' element={<HotelzimmerListPage/>}/>

                {/*CREATE*/}
                <Route path='/add-hotelzimmer'
                       element={<ZimmerAddPage addHotelzimmerSubmit={addHotelzimmer}/>}
                       loader={hotelzimmerLoader}
                />

                {/*UPDATE*/}
                <Route
                    path='/edit-hotelzimmer/:zimmernummer'
                    element={<ZimmerEditPage updateHotelzimmerSubmit={updateHotelzimmer}/>}
                    loader={hotelzimmerLoader}
                />

                {/*DELETE*/}
                <Route
                    path='/hotelzimmer/:zimmernummer'
                    element={<ZimmerSinglePage deleteHotelzimmer={deleteHotelzimmer}/>}
                    loader={hotelzimmerLoader}
                />

                {/*404*/}
                <Route path='*' element={<NotFoundPage/>}/>
            </Route>
        )
    );

    return <RouterProvider router={router}/>;
};
export default App;
