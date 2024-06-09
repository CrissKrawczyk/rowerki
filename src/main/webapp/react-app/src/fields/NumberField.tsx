import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormField } from '../service/ComponentTemplates/FormComponent';


interface NumberFieldProps {
    field: FormField;
    value: number;
    onChange: (value: number) => void
}

function NumberField(props: NumberFieldProps) {
    const { field, value, onChange } = props;
    const [innerValue, setValue] = useState<number>(value)

    function onFieldChange(newValue: string) {
        const parseNum = (str: string) => +str.replace(/[^.\d]/g, '');
        setValue(parseNum(newValue));
    }

    useEffect(() => {
        onChange(innerValue)
    }, [innerValue])

    return (<div className="row mb-2">
        {field.caption && <p>{field.caption}</p>}
        <div className="col">
            <TextField
                className={`form-control`}
                placeholder={field.placeholder}
                id={field.idn}
                value={value}
                onChange={e => onFieldChange(e.target.value)}
            />
        </div>
    </div>
    )
}
export default NumberField;