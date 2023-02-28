import { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import "./App.css";
import { clearIntervalIds, fetchUsers, pollPayments } from "./api/api";
import PaymentTable from "./components/PaymentTable";
import CreatePayment from "./components/CreatePayment";
import { Payment, User } from "./types/types";
import RainbowTitle from "./components/RainbowTitle";
import FilterSearch from "./components/FilterSearch";

const intervalIds = new Set<number>();

function App() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);

  const safelySetPayment = (payment: Payment) => {
    if (
      payments.findIndex(
        (existingPayment) => existingPayment.id === payment.id
      ) === -1
    ) {
      setPayments((payments) => [payment, ...payments].slice(0, 25));
    }
  };

  useEffect(() => {
    pollPayments(intervalIds, (payment: Payment) => {
      safelySetPayment(payment);
    });

    return () => {
      clearIntervalIds(intervalIds);
    };
  }, []);

  useEffect(() => {
    fetchUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    const filteredPayments = payments.filter((payment) => {
      const paymentToFilter = {
        ...payment,
        senderName: payment.sender.name,
        senderId: payment.sender.id,
        receiverName: payment.receiver.name,
        receiverId: payment.receiver.id,
      };
      
      return Object.values(paymentToFilter).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredPayments(filteredPayments);
  }, [payments, searchTerm]);

  const onCreatePayment = useCallback((payment: Payment) => {
    safelySetPayment(payment);
  }, []);

  const handleSearch = useCallback((searchInput: string) => {
    setSearchTerm(searchInput);
  }, []);

  return (
    <Box className="App">
      <RainbowTitle text="Circle Payments" variant="h1" />
      <FilterSearch searchInput={searchTerm} handleSearch={handleSearch} />
      <PaymentTable payments={filteredPayments} />
      <CreatePayment onCreatePayment={onCreatePayment} users={users} />
    </Box>
  );
}

export default App;
