import React from 'react'
import { Link } from 'react-router-dom'

export default function RedirectLogin() {
  return (
    <>
<div className="redirectLogin">
    <img src="https://www.ivacy.com/wp-content/uploads/2020/04/Untitled-1.svg" alt="" />
    <div className="messages">
        <h1>Your Account Has Been Created</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores vero eaque cupiditate quos.<br/> Quas reiciendis corrupti ad deleniti aliquid perferendis<br/>sit voluptatem quae dolorum optio!</p>
        <Link to='/' className='link'>Login</Link>
    </div>
</div>
    </>
  )
}
