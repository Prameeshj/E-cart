import React from 'react'
import Header from '../components/Header'
import { useSelector, useDispatch } from 'react-redux'
import {removeItem} from '../slice/wishlistSlice'
import { addToCart } from '../slice/cartSlice'


const Wishlist = ()=>{
  const userCart = useSelector(state=>state.cartReducer)  
  const dispatch= useDispatch()
  const userWishlist = useSelector(state=>state.wishlistReducer)
  
  const handleCart= (products)=>{
    dispatch(removeItem(products.id))
    dispatch(addToCart(products))
    const existingProduct = userCart?.find(item=>item?.id==products.id)
    if(existingProduct){
      alert("Product quantity is incrementing in your Cart!!!")
    }else{
      alert("Product added to your Cart")
    }
  }


  return (
    <>
      <Header/>
      <div style={{paddingTop:'100px'}} className='px-5'>
       { 
       userWishlist?.length>0?
        <>
        <h1 className='text-4xl text-amber-800 font-bold'>My WishList</h1>
        <div className="grid grid-cols-4 gap-4 mt-4">
      {
        userWishlist?.map(products=>(
        <div className="bg-amber-100 rounded border p-2 shadow-lg">
        <img width={'100%'} height={'200px'} src={products?.thumbnail} alt="" />
        <div className="text-center">
          <h3 className='text-xl font-bold'>{products?.title}</h3>
          <div className="flex justify-evenly mt-3">
           <button onClick={()=>dispatch(removeItem(products?.id))}  className='text-xl'> <i class="fa-solid fa-heart-circle-xmark text-red-500"></i></button>
           <button onClick={()=>handleCart(products)} className='text-xl'><i class="fa-solid fa-cart-plus text-green-500"></i></button>
          </div>
        </div>
      </div>
      ))
      }
    </div>
        </>
        
      :
      <div className="flex justify-center items-center h-screen">
        <img src="https://w7.pngwing.com/pngs/675/43/png-transparent-empty-cart-illustration-thumbnail.png" alt="" />
        <h1 className="text-3xl text-red-600">Your wishlist is Empty!!!</h1>
         </div>
}
      </div>
    </>
    
  )
}

export default Wishlist                             