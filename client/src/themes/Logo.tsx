import React from 'react';
import appLogo from '../assets/logo.png'


const Logo: React.FC = () => {
    return (
        <div>
            <img src={appLogo} alt='TaskTalk Logo' />
        </div>
    )
}

export default Logo