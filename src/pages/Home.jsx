import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../slice/productSlice'

const Home = () => {
  const dispatch = useDispatch()
  const { allProducts, loading, errorMsg } = useSelector(state => state.productReducer)
  // console.log(allProducts, loading, errorMsg);

  const [currentPage,setcurrentPage] =useState(1)
  const productsPerPage =8
  const totalPages = Math.ceil(allProducts?.length/productsPerPage)
  const currentPageProductLastIndex = currentPage * productsPerPage
  const currentPageProductFirstIndex = currentPageProductLastIndex-productsPerPage
  const visibleAllProducts = allProducts?.slice(currentPageProductFirstIndex,currentPageProductLastIndex)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const navPrevPage =()=>{
    if(currentPage!=1){
      setcurrentPage(currentPage-1)
    }
  }

  const navNextPage =()=>{
    if(currentPage!=totalPages){
      setcurrentPage(currentPage+1)
    }
  }

  return (
    <>
      <Header insideHome={true} />
      <div style={{ paddingTop: '100px' }} className='container px-4 mx-auto'>
        {
          loading ?
            <div className="flex justify-center items-center my-5 text-lg">
              <img height={'100px'} width={'100px'} src="https://camo.githubusercontent.com/bfb2b63eeb7b21626c1a896e6e58a55838135977ce8b5d7ee13a60080b56a1e7/68747470733a2f2f6173736574732d76322e6c6f7474696566696c65732e636f6d2f612f30336364633665302d313138622d313165652d626630382d3037643838613934316362642f696969774730764a514e2e676966" alt="" />
              Loading
            </div>
            :
            <>
              <div className="grid grid-cols-4 gap-4">
                {
                  allProducts?.length > 0 ?
                  visibleAllProducts?.map(product => (
                      <div key={product?.id} className="bg-gray-200 rounded border p-2 shadow-lg">
                        <img width={'100%'} height={'200px'} src={product?.thumbnail} alt="" />
                        <div className="text-center">
                          <h3 className='text-xl font-bold'>{product?.title}</h3>
                          <Link to={`/${product?.id}/view`} className='bg-amber-950 rounded p-1 mt-3 text-white inline-block'>View More...</Link>
                        </div>
                      </div>
                    ))
                    :
                    <div className="flex justify-center items-center font-bold texy-red-600 my-5 text-lg">
                      Produts Not Found
                    </div>
                }
              </div>
              <div className="text-2xl text-center font-bold mt-20">
                <span onClick={navPrevPage} className="cursor-pointer"><i className="fa-solid fa-backward me-5"></i></span>
                <span> {currentPage} of {totalPages} </span>
                <span onClick={navNextPage} className="cursor-pointer"><i className="fa-solid fa-forward ms-5"></i></span>

              </div>

            </>
        }
      </div>
    </>

  )
}

export default Home