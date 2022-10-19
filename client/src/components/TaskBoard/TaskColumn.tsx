import React from 'react'
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import ColumnTitle from './ColumnTitle'

const TaskColumn: React.FC = () => {
    return (
        <Card
            sx={{
                height: 'fit-content',
            }}
        >
            <ColumnTitle />
            {/* <CardContent></CardContent> */}
        </Card>
    )
}

export default TaskColumn
