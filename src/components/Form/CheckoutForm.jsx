import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { Await } from 'react-router';


const CheckoutForm = ({totalPrice, closeModal, orderInfo, refetch}) => {
   const stripe = useStripe();
  const elements = useElements();
  const {user}=useAuth();
  const axiosSecure=useAxiosSecure()
  const [cardError, setCardError] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [clientSecret, setClientSecret] = useState('')

useEffect(()=>{
  const getClientSecret=async()=>{
    const {data}=await axiosSecure.post('/create-payment-intent',{
        quantity: orderInfo?.quantity,
        plantId: orderInfo?.plantId,
    })
     setClientSecret(data?.clientSecret)
   
  }
  getClientSecret()
}, [orderInfo, axiosSecure])

  const handleSubmit = async (event) => {
      
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
       setCardError(null)
    }
    const result=await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card,
      }
    })
    if(result?.error){
       setCardError(result?.error?.message)
      return
    }
     if (result?.paymentIntent?.status === 'succeeded'){
      orderInfo.transactionId = result?.paymentIntent?.id
try{
  const {data}=await axiosSecure.post('/order',orderInfo)
  if(data?.insertedId){
    toast.success('Order Placed Successfully!')
  }
  const{data:result}=await axiosSecure.patch(  `/quantity-update/${orderInfo?.plantId}`,{
    quantityToUpdate: orderInfo?.quantity, status: 'decrease'

  })
   refetch()
    console.log(result)
}catch(err){
  console.log(err)
}finally{
   setProcessing(false)
        setCardError(null)
        closeModal()
}
     }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
       {cardError && <p className='text-red-500 mb-6'>{cardError}</p>}
      <div className='flex justify-between'>
        <button
          className='px-3 py-1 bg-green-400 rounded cursor-pointer'
          type='submit'
          disabled={!stripe || processing}
        >
          {processing ? (
            <ClipLoader size={24} className='mt-2' />
          ) : (
            `Pay ${totalPrice}$`
          )}
        </button>
        <button
          onClick={closeModal}
          className='px-3 py-1 bg-red-400 rounded cursor-pointer'
          type='button'
        >
          Cancel
        </button>
      </div>
    </form>
    );
};

export default CheckoutForm;