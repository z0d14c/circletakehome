import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Tooltip,
  } from "@mui/material";
  import { Payment } from "../types/types";
  
  interface PaymentTableProps {
    payments: Payment[];
  }
  
  const PaymentTableRow = ({ payment }: { payment: Payment }) => {
    const { id, date, sender, receiver, amount, currency, memo } = payment;
  
    return (
      <Tooltip title={`ID: ${id}\nDate: ${date}\nMemo: ${memo}`} arrow>
        <TableRow hover>
          <TableCell>{sender.name}</TableCell>
          <TableCell>{receiver.name}</TableCell>
          <TableCell>{amount}</TableCell>
          <TableCell>{currency}</TableCell>
        </TableRow>
      </Tooltip>
    );
  };
  
  // Table that displays 25 most recent payments
  // in material ui table
  // also is a controlled component and does not fetch data itself
  const PaymentTable = ({ payments }: PaymentTableProps) => {
    return (
      <Box width={"100%"} component={Paper}>
        <TableContainer sx={{ height: 400 }} component={Paper}>
          <Table size="small" aria-label="payment table">
            <TableHead>
              <TableRow>
                <TableCell>Sender</TableCell>
                <TableCell>Receiver</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Currency</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <PaymentTableRow key={payment.id} payment={payment} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };
  
  export default PaymentTable;
  