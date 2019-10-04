import React from 'react';
import { Badge } from 'reactstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Label(props) {
    return (
        <div className="labels">
            <table>
                <tbody>
                    <tr >
                        {props.predictResults.map(result => (
                            <td key={result.id}>
                            <Badge pill color="success">
                            {result.name}
                            </Badge>
                            </td>
                        ))} 
                   </tr>
                </tbody>
            </table>
        </div>
    )
}