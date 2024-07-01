import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice.js";
import axios from "axios";
import {SetAllProduct, SetTotal} from "../redux/state-slice/product-slice.js";
import toast from "react-hot-toast";

const BaseURL="http://localhost:7000/api/v1";

export async function GetProductList(pageNo, perPage, searchKey) {
    store.dispatch(ShowLoader());
    let url = BaseURL + "/productList/" + pageNo + "/" + perPage + "/" + searchKey;
    try {
        const result = await axios.get(url);
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data['status'] === 'success') {
            if ((result.data['data'][0]['Rows']).length > 0) {
                store.dispatch(SetAllProduct(result.data['data'][0]['Rows']));
                store.dispatch(SetTotal(result.data['data'][0]['Total'][0]['count']))
            } else {
                store.dispatch(SetAllProduct([]));
                store.dispatch(SetTotal([]));
                toast.error("No data fount!")
            }

        }
    } catch (e) {
        store.dispatch(HideLoader());
    }
}