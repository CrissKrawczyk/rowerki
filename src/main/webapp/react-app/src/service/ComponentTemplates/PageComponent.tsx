import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PageComponentProps {
    fetchLink: string;
    formLink: string;
    select: string[];
    colNames: string[];
    id: string;
}

function PageComponent<V>(props: PageComponentProps) {
    const [rows, setRows] = useState<V[]>([]);
    const [loading, setLoading] = useState(false);
    const navigator = useNavigate();

    useEffect(() => {
        setLoading(true);

        fetch('/api/' + props.fetchLink)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                data.forEach((row: any) => Object.keys(row).forEach((col) => props.select.includes(col) || delete row[col]));
                const sortData = data.map((row: any) => Object.fromEntries( Object.entries(row).sort( ([a,], [b, ]) => props.select.indexOf(a) - props.select.indexOf(b) ) ));
                console.log(sortData);
                setRows(sortData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    return (
        <table className="table table-hover table-bordered text-center align-middle">
            <thead>
                <tr className="align-middle">
                    {
                        props.colNames.map((col) => (<th scope="col">{col}</th>))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    rows.map((row) => (<tr onClick={() => navigator("../" + props.formLink + "/" + row[props.id as keyof V])}>{Object.values(row).map((val) => (<td>{typeof val == "boolean" ? String(val) : val}</td>))}</tr>))
                }
            </tbody>
        </table>);
}

export default PageComponent;