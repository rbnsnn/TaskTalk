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
    cursor: pointer;
    &:hover {
        box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.2);
    }
`

const TaskLabel: React.FC<Props> = ({ label }) => {
    return <Label color='green'>{label}</Label>
}

export default TaskLabel
