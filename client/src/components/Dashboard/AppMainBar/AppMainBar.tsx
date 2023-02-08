import React from 'react'
import AppBarDesktop from './AppMainBarDesktop'
import AppBarMobile from './AppMainBarMobile'

interface Props {
    drawerOpen: boolean
    handleDrawerToggle: () => void
}

const AppMainBar: React.FC<Props> = ({ drawerOpen, handleDrawerToggle }) => {
    return (
        <>
            <AppBarDesktop
                drawerOpen={drawerOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
            <AppBarMobile
                drawerOpen={drawerOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
        </>
    )
}

export default AppMainBar
