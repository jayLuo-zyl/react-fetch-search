import React from 'react';
import './../App.css';

const InfoTable = ({ infos }) => {
    console.log('Data from components:', infos)

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
                        {infos.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td colSpan={1}>{item.measureNumber}</td>
                                        <td colSpan={1}>{item.signedOrVetoed}</td>
                                        <td colSpan={1}>{item.voterSupport}</td>
                                        <td colSpan={1}>{item.date}</td>
                                        <td colSpan={1}>{item.relatingToClause}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </React.Fragment>
        )

}



export default InfoTable;