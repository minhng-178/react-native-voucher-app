import { router } from 'expo-router';
import { createPayment } from '../api/payment';
import { createContext, useContext, useState } from 'react';

const PaymentUrlContext = createContext();

const PaymentUrlProvider = ({ children }) => {
  const [paymentUrl, setPaymentUrl] = useState(null);

  const handleCheckout = async order => {
    const responsePayment = await createPayment(order._id);
    if (responsePayment && responsePayment.data) {
      setPaymentUrl(responsePayment.data.url_payment);
      router.push('/payment');
    }
  };

  return (
    <PaymentUrlContext.Provider value={{ paymentUrl, handleCheckout }}>
      {children}
    </PaymentUrlContext.Provider>
  );
};

export default PaymentUrlProvider;

export const usePaymentUrl = () => useContext(PaymentUrlContext);
