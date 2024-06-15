import React, { useState } from 'react';
import FormComponent from '../../ComponentTemplates/FormComponent';
import { User } from '../../../interfaces';

function CreateUserPage() {

    return (
        <div className="container border border-primary border-3 p-3 mt-3 rounded bg-light">
            <FormComponent<User> fetchLink="users" fields={[{
                idn: "email",
                type: "string",
                caption: "Email"
            }, {
                idn: "firstName",
                type: "string",
                caption: "Imię",
            }, {
                idn: "lastName",
                type: "string",
                caption: "Nazwisko",
            }, {
                idn: "login",
                type: "string",
                caption: "Login",
            }, {
                idn: "password",
                type: "string",
                caption: "Hasło",
            }, {
                idn: "isAdmin",
                type: "boolean",
                caption: "Admin?",
            }]} />
        </div>
    );
}

export default CreateUserPage;
