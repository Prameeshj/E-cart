import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProducts } from '../slice/productSlice'

const Header = ({insideHome}) => {
  const dispatch = useDispatch()
  const userCart = useSelector(state=>state.cartReducer)
  const userWishlist = useSelector(state=>state.wishlistReducer)
  return (
   <nav className='flex bg-teal-600 fixed w-full p-5 text-white font-bold' >
    <Link className='text-2xl font-bold' to={'/'}><i className="fa-solid fa-truck-fast"></i> Daily Cart</Link>

    <ul className='flex-1 text-right'>
      { 
      insideHome && <li onChange={e=>dispatch(searchProducts(e.target.value.toLowerCase()))} className='list-none inline-block px-5'><input style={{width:'300px',color:"black"}} className='rounded p-1' type="text" placeholder='Search Products here...' /></li>
      }
      <li className='list-none inline-block px-5' ><Link to={'/wishlist'}><i  className="fa-solid fa-heart text-red-800 pr-2 text-xl"></i>Wishlist <span className='bg-black text-white rounded p-1'>{userWishlist?.length}</span></Link></li>
      <li className='list-none inline-block px-5'><Link to={'/cart'}><i className="fa-solid fa-cart-shopping text-green-500 pr-2 text-xl"></i>Cart <span className='bg-black text-white rounded p-1'>{userCart?.length}</span></Link></li>
    </ul>

  </nav>
  )
}

export default Header