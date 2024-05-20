import React from 'react';
import { Link } from 'react-router-dom';

export interface ServiceMenuOptionProps {
    text: string,
    linkTo: string
}

function ServiceMenuOption(props: ServiceMenuOptionProps) {
    const { text, linkTo } = props;

    return <Link to={linkTo}>{text}</Link>

}

export default ServiceMenuOption; 
