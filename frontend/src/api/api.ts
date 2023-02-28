import { PAYMENTS_ENDPOINT, USERS_ENDPOINT } from "../constants/constants";
import { Payment, User, ApiResponse } from "../types/types";

export const fetchPayment = async (): Promise<Payment> => {
  const request = await fetch(PAYMENTS_ENDPOINT);

  return request.json().then((res: ApiResponse<Payment>) => {
    return res.data;
  });
};

// ending previous intervals when we start a new one
export const clearIntervalIds = (intervalIdSet: Set<number>) => {
    for (const prevIntervalId of intervalIdSet) {
        clearInterval(prevIntervalId);
    }
    intervalIdSet.clear();
}

export const pollPayments = async (intervalIdSet: Set<number>, callback: (payment: Payment) => void) => {
  const timeoutFn = () => {
    return setInterval(async () => {
      const payment = await fetchPayment();

      callback(payment);
    }, 1000);
  };

  clearIntervalIds(intervalIdSet);

  const intervalId = timeoutFn();
  intervalIdSet.add(intervalId);
};

export const fetchUsers = (): Promise<User[]> => {
  return fetch(USERS_ENDPOINT)
    .then((res) => res.json())
    .then((res: ApiResponse<User[]>) => {
      return res.data;
    });
};

export const createPayment = async (payment: Payment): Promise<number> => {
  let response: Response;
  let retries = 0;
  const maxRetries = 100;
  
  do {
    response = await fetch(PAYMENTS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payment),
    });
    if (response.status === 503) {
      retries++;
      if (retries <= maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        break;
      }
    }
  } while (response.status === 503);

  return response.status;
}
