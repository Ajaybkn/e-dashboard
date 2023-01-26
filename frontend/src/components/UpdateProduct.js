import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import '../styles/AddProduct.css'
const UpdateProduct = () => {
  const [name, SetName] = useState('')
  const [price, SetPrice] = useState('')
  const [category, SetCategory] = useState('')
  const [company, SetCompany] = useState('')
  const params = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    // console.log(params)
    getProductDetails()
  }, [])

  const getProductDetails = async () => {
    axios.get(`http://localhost:3000/product/${params.id}`).then((res) => {
      // console.log(res.data)
      SetName(res.data.name)
      SetPrice(res.data.price)
      SetCategory(res.data.category)

      SetCompany(res.data.company)
    })
  }
  const updateProduct = async () => {
    //CHECKING WHETHER FIELDS ARE EMPTY-->>
    axios
      .put(`http://localhost:3000/product/${params.id}`, {
        name,
        price,
        category,
        company,
      })
      .then((res) => {
        console.log(res)
        alert('updated successfully')
        navigate('/')
      })
  }
  return (
    <>
      <h1>Update-Product</h1>
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

        <input
          type="number"
          placeholder="Enter product price"
          className="input-product"
          value={price}
          onChange={(e) => {
            SetPrice(e.target.value)
          }}
        />

        <input
          type="text"
          placeholder="Enter product category"
          className="input-product"
          value={category}
          onChange={(e) => {
            SetCategory(e.target.value)
          }}
        />

        <input
          type="text"
          placeholder="Enter product company"
          className="input-product"
          value={company}
          onChange={(e) => {
            SetCompany(e.target.value)
          }}
        />

        <button className="btn " onClick={updateProduct}>
          Update
        </button>
      </div>
    </>
  )
}

export default UpdateProduct
