import React from 'react';
import './../App.css';

const BillTable = ({  bills }) => {
    // console.log('Sent to component, bills:', bills);
    return (
        <React.Fragment>
            <table className="info">
                <thead>
                    <tr>
                        <th>Measure Number</th>
                        <th>Signed or Vetoed</th>
                        <th>Voter support</th>
                        <th>Date</th>
                        <th>Relating to clause</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((bill, index) => {
                        return (
                            <tr key={index}>
                                <td>{bill.measureNumber}</td>
                                <td>{bill.signedOrVetoed}</td>
                                <td>{bill.voterSupport}</td>
                                <td>{bill.date}</td>
                                <td>{bill.relatingToClause}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default BillTable;