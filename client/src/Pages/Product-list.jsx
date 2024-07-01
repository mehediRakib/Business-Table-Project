import React, {Fragment, useEffect, useState} from 'react';
import {GetProductList} from "../ApiRequest/ApiRequest.js";
import {useSelector} from "react-redux";
import ReactPaginate from "react-paginate";
import {Toaster} from "react-hot-toast";

const ProductList = () => {

    let [searchKey, setSearchKey] = useState('0')
    let [perPage, setPerPage] = useState(5);
    useEffect(() => {
        GetProductList(1, perPage, searchKey)
    }, []);
    let AllProduct = useSelector((state) => (state.products.AllProduct));
    console.log("All Product: ", AllProduct);
    let Total = useSelector((state) => (state.products.Total));

    const handlePageClick=(e)=>{
        GetProductList(e.selected+1,perPage,searchKey);
    }

    const pageKeyOnChange=(e)=>{
        setPerPage(parseInt(e.target.value));
        GetProductList(1,e.target.value,searchKey);
    }
    const searchOnChange=(e)=>{
        setSearchKey(e.target.value);
        if((e.target.value).length===0){
            setSearchKey('0');
            GetProductList(1,perPage,'0');
        }
    }
    const searchData=()=>{
        GetProductList(1,perPage,searchKey);
    }
    return (
        <Fragment>
            <div className="container my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-6">
                                            <h5>My product List</h5>
                                        </div>
                                        <div className="col-2">
                                            <select
                                                className="form-control mx-2 form-select-sm form-select form-control-sm " onChange={pageKeyOnChange}>
                                                <option value="5">5 Per Page</option>
                                                <option value="10">10 Per Page</option>
                                                <option value="15">15 Per Page</option>
                                                <option value="20">20 Per Page</option>
                                                <option value="30">30 Per Page</option>
                                                <option value="50">50 Per Page</option>
                                                <option value="100">100 Per Page</option>
                                            </select>

                                        </div>
                                        <div className="col-4">
                                            <div className="input-group mb-3">
                                                <input className="form-control form-control-sm" placeholder="Search.."
                                                       aria-level="Recipient's username"
                                                       onChange={searchOnChange}
                                                       aria-describedby="button-addon2"/>
                                                <button className="btn btn-sm btn-outline-primary mb-0"
                                                      onClick={searchData}
                                                        type="button">Search
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-responsive data-table">
                                                <table className="table">
                                                    <thead className="sticky-top bg-white">
                                                    <tr>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Product</th>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Price</th>
                                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Stock</th>
                                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Code</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        AllProduct.map((item, i) => (
                                                                <tr key={i}>
                                                                    <td>
                                                                        <div className="d-flex px-2 py-1">
                                                                            <div>
                                                                                <img src={item.image}
                                                                                     className="avatar me-3"/>
                                                                            </div>
                                                                            <div
                                                                                className="d-flex flex-column justify-content-center ">
                                                                                <h6 className="mb-0 text-xs">{item.title}</h6>
                                                                                <p className="text-xs text-secondary mb-0">{item.category}</p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <p className="text-xs font-weight-bold mb-0">{item.brand}</p>
                                                                        <p className="text-xs text-secondary mb-0">{item.price} Take</p>
                                                                    </td>
                                                                    <td>
                                                                        <p className="badge bg-gradient-success">{item.stock}</p>
                                                                    </td>
                                                                    <td>
                                                                        <span className="text-secondary text-xs font-weight-bold">{item.product_code}</span>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )
                                                    }
                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>

                                        <div className="col-12 mt-5">
                                            <nav aria-level="Page navigation example">
                                                <ReactPaginate
                                                    previousLabel="< "
                                                    nextLabel=" > "
                                                    pageClassName="page-item"
                                                    pageLinkClassName="page-link"
                                                    previousClassName="page-item"
                                                    previousLinkClassName="page-link"
                                                    nextClassName="page-item"
                                                    nextLinkClassName="page-link"
                                                    breakLabel="....."
                                                    breakClassName="page-item"
                                                    breakLinkClassName="page-link"
                                                    pageCount={Total/perPage}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={5}
                                                    onPageChange={handlePageClick}
                                                    containerClassName="pagination"
                                                    activeClassName="active"


                                                        />
                                            </nav>
                                        </div>


                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <Toaster position="bottom-center"/>

</Fragment>
)
    ;
};

export default ProductList;