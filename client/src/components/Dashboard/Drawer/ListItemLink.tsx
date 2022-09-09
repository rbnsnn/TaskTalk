import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useLocation, useNavigate } from 'react-router-dom'

interface Props {
    to: string
    text: string,
    icon: React.ReactElement
}


const ListItemLink: React.FC<Props> = ({ to, text, icon }) => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const routeMatch = pathname.split('/')[1] === to.split('/')[1]

    const handleNavigate = () => {
        navigate(to)
    }

    return (
        <ListItem button disablePadding selected={routeMatch}>
            <ListItemButton onClick={handleNavigate} >
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </ListItem>
    )
}

export default ListItemLink