import axios from 'axios'
import React, { useState } from 'react'
import '../styles/AddProduct.css'
const AddProduct = () => {
  const [name, SetName] = useState('')
  const [price, SetPrice] = useState('')
  const [category, SetCategory] = useState('')
  const [company, SetCompany] = useState('')
  const [err, SetErr] = useState(false)
  const addProduct = async () => {
    //CHECKING WHETHER FIELDS ARE EMPTY-->>
    if (!name || !price || !category || !company) {
      SetErr(true)
      return false
    }

    const userId = JSON.parse(localStorage.getItem('user')).data._id
    console.log(name, price, category, company, userId)
    axios
      .post('http://localhost:3000/add-product', {
        name: name,
        price: price,
        category: category,
        company: company,
        userId: userId,
      })
      .then((res) => {
        console.log(res)
        SetName('')
        SetCategory('')
        SetPrice('')
        SetCompany('')
        alert("Product added successfully")
      })
  }
  return (
    <>
      <h1>Add-Product</h1>
      <div className="product">
        <input
          type="text"
          placeholder="Enter product name"
          className="input-product"
          value={name}
          onChange={(e) => {
            SetName(e.target.value)
          }}
        />

        {err && !name && (
          <span className="span1 invalid-input">Enter correct name</span>
        )}
        <input
          type="number"
          placeholder="Enter product price"
          className="input-product"
          value={price}
          onChange={(e) => {
            SetPrice(e.target.value)
          }}
        />
        {err && !price && (
          <span className="span2 invalid-input">Enter correct price</span>
        )}
        <input
          type="text"
          placeholder="Enter product category"
          className="input-product"
          value={category}
          onChange={(e) => {
            SetCategory(e.target.value)
          }}
        />
        {err && !category && (
          <span className="span3 invalid-input">Enter correct category</span>
        )}
        <input
          type="text"
          placeholder="Enter product company"
          className="input-product"
          value={company}
          onChange={(e) => {
            SetCompany(e.target.value)
          }}
        />
        {err && !company && (
          <span className="span4 invalid-input">Enter correct company</span>
        )}
        <button className="btn " onClick={addProduct}>
          Add Product
        </button>
      </div>
    </>
  )
}

export default AddProduct
