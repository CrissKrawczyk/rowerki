import React from 'react';
import { FormField } from '../service/ComponentTemplates/FormComponent';


interface BooleanFieldProps {
    field: FormField;
    value: boolean;
    onChange: (value: boolean) => void
}

function BooleanField(props: BooleanFieldProps) {
    const { field, value, onChange } = props;

    return (<div>
        <div>
            <input
                type={'checkbox'}
                placeholder={field.placeholder}
                id={field.idn}
                checked={value}
                onClick={e => onChange(!value)}
            />
        </div>
    </div>
    )
}
export default BooleanField;