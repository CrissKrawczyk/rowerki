import React, { useEffect, useState } from 'react';
import { Order } from '../../../interfaces';
import ServiceMenu from '../../common/ServiceMenu/ServiceMenu';

function CurrentOrdersList(props: { reloadPage: Function }) {

    const [orders, setOrders] = useState<Order[]>();

    useEffect(() => {
        setCurrentOrders()
    }, [])

    function setCurrentOrders() {
        fetch('/api/orders/currentOrders')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setOrders(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function finalizeOrder(orderId: number) {
        fetch('/api/orders/finalizeOrder/' + orderId)
            .then(setCurrentOrders)
    }

    function endWorkDay() {
        fetch('/api/workDay/endWorkDay', { method: "POST" })
            .then(() => props.reloadPage())
    }

    if (!orders)
        return "Loading"


    return <>
    <div className="row">
        <div className="col-9 px-2">
            <table className="table table-bordered text-center align-middle mx-2">
                <thead>
                    <tr className="align-middle">
                        <th>Numer zamówienia</th>
                        <th>Godzina rozpoczęcia</th>
                        <th>Godzina zakończenia</th>
                        <th>Cena</th>
                        <th>Zakończ</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => {
                        return <tr>
                            <td>{order.orderId}</td>
                            <td>{order.startTime}</td>
                            <td>{order.endTime}</td>
                            <td>{order.price}</td>
                            <td><button className="btn btn-danger" onClick={() => finalizeOrder(order.orderId)}>Zakończ przejazd</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
        <div className="col-3 px-2">
            <ServiceMenu title='Panel pracownika' options={[
                { text: "Rozpocznij przejazd", linkTo: "startOrder" },
                { text: "Zakończ dzień pracy", linkTo: "endWorkDay"}
            ]}/>
        </div>
    </div>
    </>
}

export default CurrentOrdersList;
