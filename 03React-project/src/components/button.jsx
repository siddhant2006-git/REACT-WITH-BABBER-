import React from 'react'


function button(props) {
  return (
    <div>
      <button>
        {props.children}
        <button onClick={props.onhandler}>
          {props.text}
        </button>
      </button>

    </div>
  )
}

export default button