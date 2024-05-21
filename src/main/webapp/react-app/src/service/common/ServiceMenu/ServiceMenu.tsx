import React from 'react';
import ServiceMenuOption, { ServiceMenuOptionProps } from '../ServiceMenuOption/ServiceMenuOption';
import './ServiceMenu.css';

interface ServiceMenuProps {
    title: string,
    options: ServiceMenuOptionProps[]
}

function ServiceMenu(props: ServiceMenuProps) {
    const { title, options } = props;

    return <div className='container'>
        <h2 className='title'>{title}</h2>
        <ul>
            {
                options.map(option => <li><ServiceMenuOption {...option} /></li>)
            }
        </ul>
    </div>

}

export default ServiceMenu;
