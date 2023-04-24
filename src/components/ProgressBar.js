import React from 'react'

function ProgressBar(props) {
    const { completed } = props;

    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: "#61dafb",
        borderRadius: 'inherit',
        textAlign: 'right'
    }
    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }
  return (
      <div className='progressbar-container'>
          <div style={fillerStyles} >
            <span style={labelStyles} >{`${completed}`}</span>
          </div>
      </div>
  )
}

// El truco está aquí en poner el truco con las variables para ir llenando según el número
export default ProgressBar