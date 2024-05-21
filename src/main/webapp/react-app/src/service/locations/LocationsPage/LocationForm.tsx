import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';

function LocationForm(){
        const {id} = useParams();

        const [loading, setLoading] = useState(false);

        const [city, setCity] = useState("");
        const [name, setName] = useState("");
        const [street, setStreet] = useState("");

        const navigator = useNavigate();

        useEffect(()=>{
            if(!id) return;
            fetch("/api/locations/" + id)
                .then(response => {
                     if (!response.ok) {
                         throw new Error('Network response was not ok');
                     }
                     return response.json();
                 })
                 .then(data => {
                     setCity(data.city);
                     setName(data.name);
                     setStreet(data.street);
                     setLoading(false);
                 })
                 .catch(error => {
                     console.error('Error fetching data:', error);
                     setLoading(false); // Upewnij się, że zawsze ustawiasz loading na false, nawet w przypadku błędu.
                 });
            },[]);

        function addLocation(putposter: string){
                const newLocation = {
                        city,
                        name,
                        street
                    }
                console.log(newLocation);
                console.log(JSON.stringify(newLocation));
                fetch(`/api/locations${id ? "/" + id : ""}`, {method: putposter, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newLocation)})
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        navigator(-1);
                        return response.json();
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                        setLoading(false); // Upewnij się, że zawsze ustawiasz loading na false, nawet w przypadku błędu.
                    });
            }

        function deleteLocation(){
                fetch('/api/locations/' + id, {method: "DELETE"})
                  .then(response => {
                      if (!response.ok) {
                          throw new Error('Network response was not ok');
                      }
                      navigator(-1);
                      return response.json();
                  })
                  .catch(error => {
                      console.error('Error fetching data:', error);
                      setLoading(false); // Upewnij się, że zawsze ustawiasz loading na false, nawet w przypadku błędu.
                  });
        }

        return(
            <div className="container border border-primary border-3 p-3 mt-3 rounded">
                     <div className="row mb-2">
                       <div className="col">
                         <input
                           type="text"
                           className={`form-control`}
                           placeholder="Nazwa punktu"
                           id="name"
                           value={name}
                           onChange={(e)=>setName(e.target.value)}
                         />
                       </div>
                     </div>
                     <div className="row mb-2">
                       <div className="col">
                         <input
                           type="text"
                           className={`form-control`}
                           placeholder="Miejscowość"
                           id="city"
                           value={city}
                           onChange={(e)=>setCity(e.target.value)}
                         />
                       </div>
                       <div className="col">
                         <input
                           type="text"
                           className={`form-control`}
                           placeholder="Ulica"
                           id="street"
                           value={street}
                           onChange={(e)=>setStreet(e.target.value)}
                         />
                       </div>
                       </div>
                        <div className="row mb-2">
                          <div className="col">
                            <button className="btn btn-primary w-100" onClick={()=>addLocation(id ? "PUT" : "POST")}>Dodaj</button>
                          </div>
                          {id && <div className="col"><button className="btn btn-danger w-100" onClick={()=>deleteLocation()} >Usuń</button></div>}
                        </div>
                   </div>);
    }
export default LocationForm;