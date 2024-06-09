import React from 'react';
import ServiceMenu from '../../common/ServiceMenu/ServiceMenu';

function AdminPage() {
    return <ServiceMenu title='Panel admina' options={[
        {
            text: "Dodaj użytkownika",
            linkTo: "createUser"
        },
        { text: "Wyświetl Punkty", linkTo: "location" },
        { text: "Wyświetl Pojazdy", linkTo: "vehicle" },
        { text: "Wyświetl Rodzaje Pojazdów", linkTo: "vehicleKinds" }
    ]} />
}

export default AdminPage;
