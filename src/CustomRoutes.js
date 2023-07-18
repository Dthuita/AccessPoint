import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage.js';
import PokePage from './pages/PokePage.js';
import NotFound from './pages/NotFound.js';


const CustomRoutes = () => (
    <Routes>
        <Route path="*" element={<NotFound />} />
        <Route exact path='/' element={<Homepage/>}/>
        <Route exact path='/pokemon' element={<PokePage/>}/>  {/* might throw error */}
    </Routes>
);

export default CustomRoutes;