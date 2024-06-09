import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { FormField } from '../service/ComponentTemplates/FormComponent';


interface SelectFieldProps {
    field: FormField;
    value?: number | string;
    onChange: (value: number | string) => void
}

function SelectField(props: SelectFieldProps) {
    const { field, value, onChange } = props;

    return (<div className="row mb-2">
        {field.caption && <p>{field.caption}</p>}
        <div className="col">
            <FormControl fullWidth>
                <InputLabel id={field.idn + "-label"}>{field.caption}</InputLabel>
                <Select
                    labelId={field.idn + "-label"}
                    id={field.idn}
                    value={value}
                    label={field.placeholder}
                    onChange={e => onChange(e.target.value)}
                >
                    {field.selectValues.map(item => <MenuItem value={item.idn}>{item.caption}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
    </div>
    )
}
export default SelectField;