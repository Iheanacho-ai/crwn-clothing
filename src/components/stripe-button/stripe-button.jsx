import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton =({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51Hn9nPAAD8YpQrNF176eLy9IFVV7SR59Tb94tFzYzhar88KV2Ik2kIo1gEPsQEr8R0SaQXRnC2Js2iihNcr3cdcM00hUK4OhfY';

    const onToken = token => {
        console.log( token );
        alert('Payment successful' );
    }

    return (
        <StripeCheckout
           label ='Pay Now'
           name =  'CRWN Clothing Ltd.'
           billingAddress
           shippingAddress
           image = 'https://svgshare.com/i/CUz.svg'
           description = {`Your total is $${ price }`}
           amount= { priceForStripe }
           panelLabel = 'Pay Now'
           token = { onToken }
           stripeKey={ publishableKey }
        />
    )
}

export default StripeCheckoutButton;