import React, {Fragment} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductList from "./Pages/Product-list.jsx";

const App = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProductList/>}/>
                </Routes>
            </BrowserRouter>
            
        </Fragment>
    );
};

export default App;