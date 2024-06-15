import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BooleanField from '../../fields/BooleanField';
import NumberField from '../../fields/NumberField';
import SelectField from '../../fields/SelectField';
import TextField from '../../fields/TextFieldComp';


interface FormComponentProps {
    fetchLink: string;
    fields: FormField[];
}

export interface FormField {
    type: "string" | "number" | "boolean" | "select",
    placeholder?: string,
    caption?: string,
    idn: string,
    defaultValue?: any
    selectValues?: SelectValue[]
}

interface SelectValue {
    idn: string | number,
    caption: string
}

function getDefaultValue(field: FormField) {
    if (field.defaultValue !== undefined)
        return field.defaultValue
    switch (field.type) {
        case "string":
            return ''
        case "number":
            return 0
        case "boolean":
            return false
        case "select":
            return undefined
    }
}

function getValue<V>(object: object, key: string): V {
    const keyTyped = key as keyof typeof object;
    const value = object[keyTyped]
    if (value != undefined)
        return value as V
    return undefined
}

function FormComponent<V extends object>(props: FormComponentProps) {
    const { id } = useParams();
    const [row, setRow] = useState<V>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const navigator = useNavigate();

    useEffect(() => {
        if (!id) {
            const newRow = Object.fromEntries(props.fields.map(field => [field.idn, getDefaultValue(field)]));
            setRow(newRow as V);
            return;
        }
        fetch(`/api/${props.fetchLink}/` + id)
            .then(response => {
                if (!response.ok) {
                    return response.text();
                }
                return response.json();
            })
            .then((data: V | string) => {
                if (typeof data == 'string')
                    setError(data)
                else {
                    setRow(data);
                    setError(undefined);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    function addLocation(putposter: string) {
        fetch(`/api/${props.fetchLink}${id ? "/" + id : ""}`, { method: putposter, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(row) })
            .then(response => {
                if (!response.ok) {
                    return response.text();
                }
                setError(undefined)
                navigator(-1);
                return response.json();
            })
            .then((error: string) => {
                if (error)
                    setError(error)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }

    function deleteLocation() {
        fetch(`/api/${props.fetchLink}/` + id, { method: "DELETE" })
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

    function getField(field: FormField) {
        switch (field.type) {
            case "string":
                return <TextField field={field} value={getValue(row, field.idn)} onChange={value => setRow({ ...row, [field.idn]: value })} />
            case "number":
                return <NumberField field={field} value={getValue(row, field.idn)} onChange={value => setRow({ ...row, [field.idn]: value })} />
            case "boolean":
                return <BooleanField field={field} value={getValue(row, field.idn)} onChange={value => setRow({ ...row, [field.idn]: value })} />
            case "select":
                return <SelectField field={field} value={getValue(row, field.idn)} onChange={value => setRow({ ...row, [field.idn]: value })} />
        }
    }

    if (!row)
        return <></>

    return (
        <div>
            {props.fields.map(field => getField(field))}
            <div className="row mb-2">
                <div className="col">
                    <button className="btn btn-success w-100" onClick={() => addLocation(id ? "PUT" : "POST")}>{!id ? 'Dodaj' : 'Edytuj'}</button>
                </div>
                {id && <div className="col"><button className="btn btn-danger w-100" onClick={() => deleteLocation()} >Usuń</button></div>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
}
export default FormComponent;