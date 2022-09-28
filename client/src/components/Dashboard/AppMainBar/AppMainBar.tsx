import React from 'react'
import AppBarDesktop from './AppBarDesktop'
import AppBarMobile from './AppBarMobile'

interface Props {
    drawerOpen: boolean
    handleDrawerToggle: () => void
}

const AppMainBar: React.FC<Props> = ({ drawerOpen, handleDrawerToggle }) => {
    return (
        <>
            <AppBarDesktop drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
            <AppBarMobile drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
        </>
    );
}

export default AppMainBar