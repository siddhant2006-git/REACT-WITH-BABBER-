import React from 'react'

function UserCard(props) {
  return (
    <div className='user-container'>
      <p id='name'>{ props.name}</p>
      <img id="userimage" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYp8jCvHylhVmLVN5aioFJieHxIAFTcOwaMQ&s' alt='love'></img>
      <p id='discription'>{ props.discription}</p>

    </div>
  )
}

export default UserCard