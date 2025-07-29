
  export const giftCardInfo = {
    giftAmount: '200',
    deliveryMethod: {
        email: 'By Email',
        print: 'Print at Home',
    },
    sendingOption: {
        now: 'Now',
        later: 'Later',
    },
    validCard:{
        cardNumber: '4000003560000008',
        expiryDate: '1230',
        cvv: '123',
    },
    invalidCard: {
        cardNumber: '4242424242424241',
        expiryDate: '1290',
        cvv: '12',
        lostCard: '4000000000009987',
        insufficientFunds: '4000000000009995',
    },
    cardWarningMessages: {
        cardNumber: 'Your card number is invalid.',
        cardExpiry: `Your card’s expiration year is invalid.`,
        lostCard: 'Your card was declined.',
        insufficientFunds: 'Your card has insufficient funds. Try a different card.',
        cardCvv: `Your card’s security code is incomplete.`
    },
    orderConfimationMessage: 'Your gift card purchase is complete!',
    corporateSalesPageHeading: 'Corporate and Partnership Inquiries ',
    warningMessages: {
        fullNameSender: 'Please enter your name',
        emailSender: 'Please enter your email',
        fullNameRecipient: "Please enter the recipient's name",
        emailRecipient: "Please enter a valid email address",
    },
  };

  export const webUrls = {
    pageUrl: 'https://www.freshdev.ca/gift',
    corporateSalesUrl: 'https://try.freshprep.ca/corporate/',
  };
  