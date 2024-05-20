import React from 'react';
import ServiceMenu from '../../common/ServiceMenu/ServiceMenu';

function AdminPage() {
    return <ServiceMenu title='Panel admina' options={[
        {
            text: "Dodaj użytkownika",
            linkTo: "createUser"
        }
    ]} />
}

export default AdminPage;
