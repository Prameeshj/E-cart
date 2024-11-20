import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../slice/wishlistSlice'
import { addToCart } from '../slice/cartSlice'

const View = () => {
  const userCart = useSelector(state=>state.cartReducer)
  const dispatch = useDispatch()
  const userWishlist = useSelector(state=>state.wishlistReducer)
  const [products,setproducts] = useState({})
  const {id} = useParams()
  // console.log(id);
  // console.log(products);
  

  useEffect(()=>{
     if(sessionStorage.getItem("allproducts")){
      const allProducts =JSON.parse(sessionStorage.getItem("allproducts"))
      setproducts(allProducts.find(item=>item.id==id))
     }

  },[])

  const handleWishlists= ()=>{
    const existingProduct = userWishlist?.find(item=>item?.id==id)
    if(existingProduct){
      alert("Product already in your wishlist!!!")
    }else{
      alert("Product added to your wishlist")
      dispatch(addToWishlist(products))
    }
  }

  const handleCart= ()=>{
    dispatch(addToCart(products))
    const existingProduct = userCart?.find(item=>item?.id==id)
    if(existingProduct){
      alert("Product quantity is incrementing in your Cart!!!")
    }else{
      alert("Product added to your Cart")
    }
  }

  return (
    <>
      <Header/>
      <div className='mx-5'>
        <div className='grid grid-cols-2 items-center h-screen'>
        <div>
            <img className='ml-32' width={'300px'} height={'170px'} src={products?.thumbnail} alt="" />
            <div className="flex justify-between mt-6 p-5">
                <button onClick={handleWishlists} className='bg-blue-600 rounded text-white p-2'>ADD TO WISHLIST</button>
                <button onClick={handleCart} className='bg-green-600 rounded text-white p-2'>ADD TO CART</button>
              </div>
        </div>
          <div>  
            <h3 className='font-bold'>PID : {products?.id}</h3>
            <h3 className=' text-4xl font-bold'>{products?.title}</h3>
            <h4 className='font-bold text-red-600 text-2xl'>$ {products?.price}</h4>
            <h4>Brand : {products?.brand}</h4>
            <h4>Category : {products?.category}</h4>
            <p>
            <span className='font-bold'>Description</span> : {products?.description}
            </p>
            <h3 className="font-bold mt-3">Client Reviews : </h3>
            {
               products?.reviews?.length>0?
               products?.reviews?.map(item=>(
                <div key={item.date} className="shadow border rounded p-2 mb-2">
                  <h5>
                    <span className='font-bold'>{item?.reviewerName}</span> : <span> {item?.comment}</span>
                  </h5>
                  <p>Rating : {item?.rating} <i className="fa-solid fa-star text-yellow-600"></i></p>
                </div>
               ))
               :
               <div className="font-bold text-red-600">No Reviwes yett!!!</div>

            }
          </div>
          </div>

      </div>
    </>
  )
}

export default View