import React from 'react'
import { useNavigate } from 'react-router-dom'

function Error404() {
  const navigate = useNavigate()
  return (
      <div>
      <h1>Error404 Page not found </h1>
      <h2>Esta es la pagina actual</h2>
      <img className='error-img' src="images/robot404.png" alt="errorimg"/>
      <button onClick={()=> navigate(-1, {replace:true})}>Go Back...</button>
    </div>
  ) 
}
// existe otra opcion haciendo un countdown pero la verdad no quiero hacerlo... se encuentra en Spike 18 segundo video minuto 13.
export default Error404