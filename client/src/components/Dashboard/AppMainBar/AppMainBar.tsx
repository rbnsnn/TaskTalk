import React from 'react'
import AppMainBarDesktop from './AppMainBarDesktop'
import AppMainBarMobile from './AppMainBarMobile'

interface Props {
    drawerOpen: boolean
    handleDrawerToggle: () => void
}

const AppMainBar: React.FC<Props> = ({ drawerOpen, handleDrawerToggle }) => {
    return (
        <>
            <AppMainBarDesktop
                drawerOpen={drawerOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
            <AppMainBarMobile
                drawerOpen={drawerOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
        </>
    )
}

export default AppMainBar
