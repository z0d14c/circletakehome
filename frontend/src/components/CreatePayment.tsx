import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { currencies } from "../constants/constants";
import { User, Payment } from "../types/types";
import { createPayment } from "../api/api";

interface CreatePaymentProps {
  users: User[];
  onCreatePayment: (payment: Payment) => void;
}

const CreatePayment = ({ users = [], onCreatePayment }: CreatePaymentProps) => {
  const [senderId, setSenderId] = useState<number | string>("");
  const [receiverId, setReceiverId] = useState<number | string>("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("GBP");
  const [memo, setMemo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [userOptions, setUserOptions] = useState<
    { label: string; value: number }[]
  >([]);

  useEffect(() => {
    setUserOptions(
      users.map((user) => ({
        value: user.id,
        label: user.name,
      }))
    );
  }, [users]);

  const validateInput = () => {
    if (senderId === receiverId) {
      return "Sender and receiver must be different";
    }
    if (!senderId || !senderName) {
      return "Invalid sender";
    }
    if (!receiverId || !receiverName) {
      return "Invalid receiver";
    }
    if (!amount) {
      return "Amount is required";
    }
    if (isNaN(parseFloat(amount))) {
      return "Amount must be a valid number";
    }
    if (!currency) {
      return "Currency is required";
    }
    return "";
  };

  const handleCreatePayment = async () => {
    const error = validateInput();
    if (error) {
      console.log(error);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    const payment: Payment = {
      id: uuid(),
      date: new Date().toISOString(),
      sender: { id: senderId as number, name: senderName },
      receiver: { id: receiverId as number, name: receiverName },
      amount,
      currency,
      memo,
    };
    const status = await createPayment(payment);

    setIsLoading(false);

    if (status === 201) {
      onCreatePayment(payment);
      setSenderId("");
      setReceiverId("");
      setAmount("");
      setCurrency("");
      setMemo("");
      console.log("Payment created successfully!");
    } else {
      console.log("Payment creation failed. Please try again.");
    }
  };

  useEffect(() => {
    const sender = users.find((user) => user.id === senderId);
    if (sender) {
      setSenderName(sender.name);
    } else {
      setSenderName("");
    }
  }, [senderId, users]);

  useEffect(() => {
    const receiver = users.find((user) => user.id === receiverId);
    if (receiver) {
      setReceiverName(receiver.name);
    } else {
      setReceiverName("");
    }
  }, [receiverId, users]);

  return (
    <Box component={Paper} padding={4}>
      <Typography variant="h6" gutterBottom>
        Create a Payment
      </Typography>
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel id="sender-label">Sender</InputLabel>
        <Select
          labelId="sender-label"
          value={senderId}
          onChange={(event) => setSenderId(event.target.value)}
          label="Sender"
        >
          {userOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{senderName}</FormHelperText>
      </FormControl>
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel id="receiver-label">Receiver</InputLabel>
        <Select
          labelId="receiver-label"
          value={receiverId}
          onChange={(event) => setReceiverId(event.target.value)}
          label="Receiver"
        >
          {userOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{receiverName}</FormHelperText>
      </FormControl>
      <TextField
        label="Amount"
        value={amount}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setAmount(event.target.value)
        }
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel id="currency-label">Currency</InputLabel>
        <Select
          labelId="currency-label"
          value={currency}
          onChange={(event) => setCurrency(event.target.value)}
          label="Currency"
        >
          {currencies.map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Memo"
        value={memo}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setMemo(event.target.value)
        }
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        disabled={isLoading}
        onClick={handleCreatePayment}
      >
        {isLoading ? "Creating Payment..." : "Create Payment"}
      </Button>
    </Box>
  );
};

export default CreatePayment;
