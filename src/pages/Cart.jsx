import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { decrementQuantity, emptyCart, incrementQuantity, removeCartItem } from '../slice/cartSlice'

const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userCart = useSelector(state => state.cartReducer)
    const [cartTotal,setcartTotal] =useState(0)

    useEffect(()=>{
        if(userCart?.length>0){
            setcartTotal(userCart?.map(item=>item.totalPrice).reduce((a,b)=>a+b))
        }
    },[userCart])

    const handleDecrementQuantity = (products)=>{
        if(products?.quantity>1){
            dispatch(decrementQuantity(products.id))
        }else{
            dispatch(removeCartItem(products.id))
        }
    }

    const checkOut =()=>{
        dispatch(emptyCart())
        alert("Order Confirmed.....Thank you!!!! ")
        // to redirect to home page
        navigate("/")
    }

    return (
        <>
            <header />
            <div style={{ paddingTop: "100px" }} className='px-5'>
                {
                    userCart?.length>0 ?

                    <>
                    <h1 style={{fontFamily:'-moz-initial'}} className='text-5xl font-bold text-blue-600'>Cart Summary</h1>
                    <div className="grid grid-cols-3 gap-4 mt-5">
                        <div className='col-span-2 border rounded p-5 shadow'>
                            <table className="table-auto w-full">
                                <thead>
                                    <tr>
                                        <td className="font-semibold">#</td>
                                        <td className="font-semibold">Name</td>
                                        <td className="font-semibold">Image</td>
                                        <td className="font-semibold">Quantity</td>
                                        <td className="font-semibold">Price</td>
                                        <td className="font-semibold">...</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userCart?.map((products,index)=>(

                                            <tr>
                                            <td>{index+1}</td>
                                            <td>{products?.title}</td>
                                            <td>
                                                <img width={'70px'} height={'70px'} src={products?.thumbnail} alt="" />
                                            </td>
                                            <td>
                                                <div className="flex">
                                                    <button onClick={()=>handleDecrementQuantity(products)} className="font-bold">-</button>
                                                    <input style={{ width: '40px' }} type="text" className='border p-1 rounded mx-2' value={products?.quantity} readOnly />
                                                    <button onClick={()=>dispatch(incrementQuantity(products?.id))} className='font-bold'>+</button>
                                                </div>
                                            </td>
                                            <td>$ {products?.totalPrice}</td>
                                            <td><button onClick={()=>dispatch(removeCartItem(products?.id))} className='text-red-600'><i className="fa-solid fa-trash"></i>
                                            </button></td>
                                        </tr>
 
                                        ))
                                    }
                                   
                                </tbody>
                            </table>
                            <div className="float-right mt-5">
                                <button onClick={()=>dispatch(emptyCart())} className='bg-red-600 rounded p-2 text-white'>EMPTY CART</button>
                                <Link to={'/'} className="bg-blue-600 rounded ms-3 text-white p-2">SHOP MORE</Link>
                            </div>

                        </div>
                        <div className="col-span-1">
                            <div className="border rounded shadow p-5">
                                <h2 className='text-2xl font-bold my-5'>Total Amount : <span className='text-red-600'>$ {cartTotal}</span></h2>
                                <hr />
                                <button onClick={checkOut} className='bg-green-600 rounded p-2 text-xl text-white w-full mt-4'>CHECK OUT</button>
                            </div>
                        </div>
                    </div>
                </>
                :
                <div className="flex justify-center items-center h-screen">
        <img src="https://w7.pngwing.com/pngs/675/43/png-transparent-empty-cart-illustration-thumbnail.png" alt="" />
        <h1 className="text-3xl text-red-600">Your Cart is Empty!!!</h1>
         </div>
                }
            </div>
        </>
    )
}

export default Cart
