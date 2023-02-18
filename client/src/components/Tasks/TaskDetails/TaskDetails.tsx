import React from 'react'
import { Slide, Box, Tab, Tabs, Paper } from '@mui/material'
import { TaskData } from '../../../types/task-data.type'
import TaskDetailsInfo from './TaskDetailsInfo/TaskDetailsInfo'

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    )
}

interface Props {
    data: TaskData
}

const TaskDetails: React.FC<Props> = ({ data }) => {
    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }
    return (
        <Slide
            direction='down'
            in={true}
        >
            <Paper sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label='basic tabs example'
                    >
                        <Tab label='Task Details' />
                        <Tab label='Comments' />
                        <Tab label='Changes history' />
                    </Tabs>
                </Box>
                <TabPanel
                    value={value}
                    index={0}
                >
                    <TaskDetailsInfo data={data} />
                </TabPanel>
                <TabPanel
                    value={value}
                    index={1}
                >
                    Comments
                </TabPanel>
                <TabPanel
                    value={value}
                    index={2}
                >
                    Change history
                </TabPanel>
            </Paper>
        </Slide>
    )
}

export default TaskDetails
