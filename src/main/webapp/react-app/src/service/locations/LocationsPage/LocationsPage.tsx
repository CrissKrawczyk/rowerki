import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

    interface Location {
        locationId: number;
        city: string;
        name: string;
        street: string;
    }

    function LocationsPage(){
            const [locations, setLocations] = useState<Location[]>([]);
            const [loading, setLoading] = useState(false);

            const navigator = useNavigate();

            useEffect(() => {
                setLoading(true);

                fetch('/api/locations')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        setLocations(data);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                        setLoading(false); // Upewnij się, że zawsze ustawiasz loading na false, nawet w przypadku błędu.
                    });
            }, []);

    return (<div className="container">
                 <h2 className="text-center m-3"> Punkty</h2>
                 <button className="btn btn-primary m-2" onClick = {()=>navigator("../LocationForm")}>Dodaj Lokację</button>
                 <table className="table table-hover table-bordered text-center align-middle">
                   <thead>
                     <tr className="align-middle">
                       <th scope="col">Id</th>
                       <th scope="col">Miasto</th>
                       <th scope="col">Nazwa</th>
                       <th scope="col">Ulica</th>
                     </tr>
                   </thead>
                   <tbody>
                     {locations.map((location) => (
                       <tr onClick={()=>navigator("../LocationForm/" + location.locationId)}>
                         <td scope="row">{location.locationId}</td>
                         <td>{location.city}</td>
                         <td>{location.name}</td>
                         <td>{location.street}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>);
    }

export default LocationsPage;