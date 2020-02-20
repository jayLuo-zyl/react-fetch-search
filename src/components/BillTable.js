import React from 'react';
import './../App.css';

const BillTable = ({ allBills, searched, realTimeSearched }) => {
    // console.log('Data sent to components:', allBills)
    // Return default 25 bills from all
    let bills = [];
    if (searched.length === 1) { bills = searched }
    else if ( realTimeSearched.length >= 1 && realTimeSearched.length < 25){
        bills = realTimeSearched
    }
    else if (allBills.length > 25) {
        bills = allBills.slice(0, 25);
    }
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