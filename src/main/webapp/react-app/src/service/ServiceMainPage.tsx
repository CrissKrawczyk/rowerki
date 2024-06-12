import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ServiceMainPage(props: { isAdmin: boolean }) {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/service/admin`;
    navigate(path);
  }

  if (props.isAdmin === undefined)
    return <></>

  return <>
    <li className="nav-item"><Link className="nav-link" to={"employee"} >Przejdź do strony pracownika</Link></li>
    {props.isAdmin && <li className="nav-item"><Link className="nav-link" to={"admin"} >Przejdź do strony admina</Link></li>}
  </>
}

export default ServiceMainPage;
