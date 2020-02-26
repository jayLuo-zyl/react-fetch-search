import React from 'react';
import './../App.css';
// import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const BillTable = ({ bills }) => {
    console.log('Sent to component, bills:', bills);
    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Measure Number</TableCell>
                            <TableCell align="center">Signed or Vetoed</TableCell>
                            <TableCell align="center">Voter support</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Relating to clause</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>


                    </TableBody>
                </Table>
            </TableContainer>

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