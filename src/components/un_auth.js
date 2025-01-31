import React from 'react'

const Unauthorized = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <h1>Доступ запрещён</h1>
            <p>У вас нет прав для доступа к этой странице.</p>
        </div>
    )
}

export default Unauthorized