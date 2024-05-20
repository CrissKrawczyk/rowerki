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
    <Link to={"employee"} >Przejdź do strony pracownika</Link>
    {props.isAdmin && <Link to={"admin"} >Przejdź do strony admina</Link>}
  </>
}

export default ServiceMainPage;
