import React from 'react';

export default function Label(props) {
    return (
        <div className="labels">
            <table>
                <tbody>
                    <tr >
                        {props.predictResults.map(result => (
                            <td key={result.id}>{result.name}</td>
                        ))} 
                   </tr>
                </tbody>
            </table>
        </div>
    )
}