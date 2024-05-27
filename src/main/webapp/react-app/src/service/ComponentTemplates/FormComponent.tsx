import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';


interface FormComponentProps{
    fetchLink: string;
    createForm: string[];
    inputs: string[];
}


function FormComponent<V extends object>(props: FormComponentProps){
    const {id} = useParams();
    const [row, setRow] = useState<V>();
    const [loading, setLoading] = useState(false);

    const navigator = useNavigate();

    useEffect(()=>{
        if(!id){
            const newRow = Object.fromEntries(props.createForm.map(form=>[form, '']));
            setRow({...newRow, ...row});
            return;
        }
        fetch(`/api/${props.fetchLink}/` + id)
            .then(response => {
                 if (!response.ok) {
                     throw new Error('Network response was not ok');
                 }
                 return response.json();
             })
             .then(data => {
                 Object.keys(data).forEach((key)=>{props.createForm.includes(key) || delete data[key]});
                 setRow(data);
                 setLoading(false);
             })
             .catch(error => {
                 console.error('Error fetching data:', error);
                 setLoading(false);
             });
        },[]);

    function addLocation(putposter: string){
            console.log(row);
            console.log(JSON.stringify(row));
            fetch(`/api/${props.fetchLink}${id ? "/" + id : ""}`, {method: putposter, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(row)})
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    navigator(-1);
                    return response.json();
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });
        }

    function deleteLocation(){
            fetch(`/api/${props.fetchLink}/` + id, {method: "DELETE"})
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  navigator(-1);
                  return response.json();
              })
              .catch(error => {
                  console.error('Error fetching data:', error);
                  setLoading(false);
              });
    }

    return(
        <div>
            {Object.entries(row || {}).map(([key,value])=>(
               <div className="row mb-2">
                   <div className="col">
                       <input
                       type="text"
                       className={`form-control`}
                       placeholder={props.inputs[props.createForm.indexOf(key)]} //Do poprawienia xD
                       id={key}
                       value={value as string}
                       onChange={(e)=>setRow({...row, [key]: e.target.value})}
                       />
                   </div>
                </div>
               ))}
            <div className="row mb-2">
                <div className="col">
                    <button className="btn btn-primary w-100" onClick={()=>addLocation(id ? "PUT" : "POST")}>{!id ? 'Dodaj' : 'Edytuj'}</button>
                </div>
                {id && <div className="col"><button className="btn btn-danger w-100" onClick={()=>deleteLocation()} >Usuń</button></div>}
            </div>
        </div>
            );
    }
export default FormComponent;