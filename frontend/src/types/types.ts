export interface User {
    id: number;
    name: string;
  }
  
  export interface ApiResponse<T> {
    data: T;
  }
  
  export interface Payment {
    id: string; //"stringified long number",
    date: string; // "stringified ISO-8601 timestamp",
    sender: User;
    receiver: User;
    amount: string; // "stringified decimal number",
    currency: string; // "stringified ISO-4217 currency code",
    memo: string; // "string"
  }