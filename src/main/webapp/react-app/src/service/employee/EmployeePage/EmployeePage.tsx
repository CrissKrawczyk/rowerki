import React from 'react';
import ServiceMenu from '../../common/ServiceMenu/ServiceMenu';

function EmployeePage() {
    return <ServiceMenu title='Panel pracownika' options={[
        {text: "Wyświetl Punkty", linkTo: "../location"},
        {text: "Wyświetl Pojazdy", linkTo: "../vehicle"}
        ]}
        />
}

export default EmployeePage;
