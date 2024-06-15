import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigator = useNavigate();
    return <div className="container col-3 text-center border border-primary border-3 p-3 mt-3 rounded bg-light">
        <a className="btn btn-success w-100" href="/login">Zaloguj
        </a>
    </div>
}

export default LandingPage;
