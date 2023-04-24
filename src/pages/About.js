import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

function About() {
    const location = useLocation();
    // console.log('location :>> ', location);
  return (
      <div>
          {location.pathname.includes("dev") || location.pathname.includes("content") ?
          <Outlet/> :
              <>
          <h1>About Page Working good</h1>
              </>
        }
      </div>
  )
}

export default About