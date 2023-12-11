import React from 'react';

const Card = ({ user }) => {

    const ImgUser = user.img

    return (

        <div className='cardUser'>
            <div>
                <div className='imgUser' style={{ backgroundImage: `url(${ImgUser})`, width: '220px', height: '220px', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                    {/* TODO Img redering In CSS */}
                </div>
            </div>
            <h2>{user.name}</h2>
            <h6 style={{ width: '15ch', textAlign: 'center' }}>{user.rol}</h6>
        </div>
    );
}

export default Card;
