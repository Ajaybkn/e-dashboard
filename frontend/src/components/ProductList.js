import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../styles/ProductList.css'
import {
  FaRupeeSign,
  FaTrash,
  FaEdit,
  FaGripLinesVertical,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
const ProductList = () => {
  const [products, SetProducts] = useState([])
  useEffect(() => {
    getProducts()
  }, [])
  const getProducts = () => {
    axios.get('http://localhost:3000/products').then((res) => {
      //   console.log(res.data)
      SetProducts(res.data)
    })
  }
  const deleteProduct = (id) => {
    // console.log(id)
    axios.delete(`http://localhost:3000/product/${id}`).then((res) => {
      if (res) {
        getProducts()
        alert('Record deleted')
      }
    })
  }
  const handleSearch = (e) => {
    let key = e.target.value
    if (key) {
      axios.get(`http://localhost:3000/search/${key}`).then((res) => {
        if (res) {
          SetProducts(res.data)
        }
      })
    } else {
      getProducts()
    }
  }
  return (
    <div className="product-list">
      <h3>Products List</h3>
      <input
        className="input-box"
        type="text"
        placeholder="search items"
        onChange={handleSearch}
      />
      <ul>
        <li>S.no</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>
              <FaRupeeSign />
              {item.price}
            </li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
              <button className="butn" onClick={() => deleteProduct(item._id)}>
                <FaTrash />
              </button>
              <FaGripLinesVertical />
              <Link to={`/update/${item._id}`} className="edit">
                <FaEdit />
              </Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No results found</h1>
      )}
    </div>
  )
}

export default ProductList
