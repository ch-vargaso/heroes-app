import React, {useContext} from 'react'
import { AuthContext } from '../contexts/AuthContext'


function Dev() {
  // const values = useContext(AuthContext);
  // const user = values.user;
  // const test = values.test;
// para resumir todo lo de arriba se hace lo siguiente: 
  const { user } = useContext(AuthContext);

  return (
      <div>
          <h1>Dev Working good</h1>
    </div>
  )
}

export default Dev