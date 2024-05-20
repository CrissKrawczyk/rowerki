import React from 'react';
import ServiceMenuOption, { ServiceMenuOptionProps } from '../ServiceMenuOption/ServiceMenuOption';
import './ServiceMenu.css';

interface ServiceMenuProps {
    title: string,
    options: ServiceMenuOptionProps[]
}

function ServiceMenu(props: ServiceMenuProps) {
    const { title, options } = props;

    return <div className='menuBody'>
        <h2 className='title'>{title}</h2>
        {
            options.map(option => <ServiceMenuOption {...option} />)
        }
    </div>

}

export default ServiceMenu;
