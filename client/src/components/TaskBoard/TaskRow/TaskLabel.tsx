import React from 'react'
import styled from 'styled-components'

interface Props {
    label: string
    color?: string
}

const Label = styled.button`
    background-color: ${(props) => (props.color ? props.color : '')};
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 12px;
    height: 16px;
    display: inline;
    margin-right: 5px;
`

const TaskLabel: React.FC<Props> = ({ label }) => {
    return <Label color='orange'>{label}</Label>
}

export default TaskLabel
