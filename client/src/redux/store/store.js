import {configureStore} from "@reduxjs/toolkit";
import productReducer from '../state-slice/product-slice.js';
import settingReducer from '../state-slice/settings-slice.js';

export default configureStore({
    reducer:{
        products:productReducer,
        settings:settingReducer
    }

})