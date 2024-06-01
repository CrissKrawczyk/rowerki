import { TextField } from '@mui/material';
import React from 'react';
import { FormField } from '../service/ComponentTemplates/FormComponent';


interface TextFieldProps {
    field: FormField;
    value: string;
    onChange: (value: string) => void
}

function TextFieldComp(props: TextFieldProps) {
    const { field, value, onChange } = props;

    return (<div className="row mb-2">
        <div className="col">
            <TextField className={`form-control`}
                placeholder={field.placeholder}
                id={field.idn}
                value={value}
                onChange={e => onChange(e.target.value)} />
        </div>
    </div>
    )
}
export default TextFieldComp;