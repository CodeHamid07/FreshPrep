import { test, expect } from '@playwright/test';
import { GiftPage } from '../pages/gift_page';
import { giftCardInfo, webUrls  } from '../utils/testData';

let giftPage;

test.beforeEach(async ({ page }) => {
  
  giftPage = new GiftPage(page);

  await page.goto(webUrls.pageUrl);
});

test('TC-01 Purchase valid gift card with email delivery and now option', async ({ page }) => {
  await giftPage.selectGiftAmount(giftCardInfo.giftAmount);
  await giftPage.selectDeliveryMethod(giftCardInfo.deliveryMethod.email);
  await giftPage.enterSenderDetails();
  await giftPage.enterRecipientDetails();
  await giftPage.enterMessageText();
  await giftPage.selectSendingOption(giftCardInfo.sendingOption.now);
  await giftPage.continueToPayment();
  await giftPage.enterCardDetails(
    giftCardInfo.validCard.cardNumber, 
    giftCardInfo.validCard.expiryDate, 
    giftCardInfo.validCard.cvv
);
await giftPage.enterCountry();
    await giftPage.clickPurchaseButton();
    await giftPage.assertGiftCardConfirmationMessage(giftCardInfo.giftAmount, giftCardInfo.orderConfimationMessage);
});


test('TC-02 Purchase valid gift card with email delivery and later option', async ({ page }) => {
  await giftPage.selectGiftAmount(giftCardInfo.giftAmount);
  await giftPage.selectDeliveryMethod(giftCardInfo.deliveryMethod.email);
  await giftPage.enterSenderDetails();
  await giftPage.enterRecipientDetails();
  await giftPage.enterMessageText();
  await giftPage.selectSendingOption(giftCardInfo.sendingOption.later);
  await giftPage.selectNextDay();
  await giftPage.continueToPayment();
  await giftPage.enterCardDetails(
    giftCardInfo.validCard.cardNumber, 
    giftCardInfo.validCard.expiryDate, 
    giftCardInfo.validCard.cvv
);
await giftPage.enterCountry();
    await giftPage.clickPurchaseButton();
    await giftPage.assertGiftCardConfirmationMessage(giftCardInfo.giftAmount, giftCardInfo.orderConfimationMessage);
});


test('TC-03 Purchase valid gift card with print delivery option', async ({ page }) => {
  await giftPage.selectGiftAmount(giftCardInfo.giftAmount);
  await giftPage.selectDeliveryMethod(giftCardInfo.deliveryMethod.print);
  await giftPage.enterSenderDetails();
  await giftPage.enterRecipientDetails();
  await giftPage.enterMessageText();
  await giftPage.continueToPayment();
  await giftPage.enterCardDetails(
    giftCardInfo.validCard.cardNumber, 
    giftCardInfo.validCard.expiryDate, 
    giftCardInfo.validCard.cvv
);
await giftPage.enterCountry();
    await giftPage.clickPurchaseButton();
    await giftPage.assertGiftCardConfirmationMessage(giftCardInfo.giftAmount, giftCardInfo.orderConfimationMessage);
});

test('TC-04 Validate corporate sales can navigate to corporate partnership inquiries form', async ({ page }) => {
  await giftPage.clickCorporateGiftLink();
  await giftPage.validatePageUrl(webUrls.corporateSalesUrl);
  await giftPage.validatePageHeading(giftCardInfo.corporateSalesPageHeading);
});

test('TC-05 Validate warning of mandatory fields', async ({ page }) => {
  await giftPage.continueToPayment();
  await giftPage.assertFieldWarning(
    giftCardInfo.warningMessages.fullNameSender,
    giftCardInfo.warningMessages.emailSender,
    giftCardInfo.warningMessages.fullNameRecipient,
    giftCardInfo.warningMessages.emailRecipient
  );
});

test('TC-06 Negative - Validate other amount should give warning when user enter below $20', async ({ page }) => {
  await giftPage.clickOtherAmountButton();
  await giftPage.enterAmount();
  await giftPage.assertOtherAmountWarning();
  
});


test('TC-07 Negative - Enter invalid email in sender email and validate it should give warning', async ({ page }) => {
  await giftPage.enterInvalidSenderEmail();
  await giftPage.continueToPayment();
  await giftPage.assertSenderEmailWarning(giftCardInfo.warningMessages.emailSender);
  
});

test('TC-08 Negative - Enter invalid email in recipient email and validate it should give warning', async ({ page }) => {
  await giftPage.enterInvalidRecipientEmail();
  await giftPage.continueToPayment();
  await giftPage.assertRecipientEmailWarning();

});

test('TC-09 Negative - Enter invalid card number and validate warning text', async ({ page }) => {
  await giftPage.selectGiftAmount(giftCardInfo.giftAmount);
  await giftPage.selectDeliveryMethod(giftCardInfo.deliveryMethod.email);
  await giftPage.enterSenderDetails();
  await giftPage.enterRecipientDetails();
  await giftPage.enterMessageText();
  await giftPage.selectSendingOption(giftCardInfo.sendingOption.now);
  await giftPage.continueToPayment();
  await giftPage.enterCardDetails(
    giftCardInfo.invalidCard.cardNumber, 
    giftCardInfo.validCard.expiryDate, 
    giftCardInfo.validCard.cvv
);
    await giftPage.assertCardWarning(giftCardInfo.cardWarningMessages.cardNumber);
});

test('TC-10 Negative - Enter lost card number and validate warning text', async ({ page }) => {
  await giftPage.selectGiftAmount(giftCardInfo.giftAmount);
  await giftPage.selectDeliveryMethod(giftCardInfo.deliveryMethod.email);
  await giftPage.enterSenderDetails();
  await giftPage.enterRecipientDetails();
  await giftPage.enterMessageText();
  await giftPage.selectSendingOption(giftCardInfo.sendingOption.now);
  await giftPage.continueToPayment();
  await giftPage.enterCardDetails(
    giftCardInfo.invalidCard.lostCard, 
    giftCardInfo.validCard.expiryDate, 
    giftCardInfo.validCard.cvv
);
await giftPage.enterCountry();
    await giftPage.clickPurchaseButton();
    await giftPage.assertCardWarning(giftCardInfo.cardWarningMessages.lostCard);
});


test('TC-11 Negative - Enter insufficient balance card number and validate warning text', async ({ page }) => {
  await giftPage.selectGiftAmount(giftCardInfo.giftAmount);
  await giftPage.selectDeliveryMethod(giftCardInfo.deliveryMethod.email);
  await giftPage.enterSenderDetails();
  await giftPage.enterRecipientDetails();
  await giftPage.enterMessageText();
  await giftPage.selectSendingOption(giftCardInfo.sendingOption.now);
  await giftPage.continueToPayment();
  await giftPage.enterCardDetails(
    giftCardInfo.invalidCard.insufficientFunds, 
    giftCardInfo.validCard.expiryDate, 
    giftCardInfo.validCard.cvv
);
await giftPage.enterCountry();
    await giftPage.clickPurchaseButton();
    await giftPage.assertCardWarning(giftCardInfo.cardWarningMessages.insufficientFunds);
});

test('TC-12 Negative - Enter invalid expiry date and validate warning text', async ({ page }) => {
  await giftPage.selectGiftAmount(giftCardInfo.giftAmount);
  await giftPage.selectDeliveryMethod(giftCardInfo.deliveryMethod.email);
  await giftPage.enterSenderDetails();
  await giftPage.enterRecipientDetails();
  await giftPage.enterMessageText();
  await giftPage.selectSendingOption(giftCardInfo.sendingOption.now);
  await giftPage.continueToPayment();
  await giftPage.enterCardDetails(
    giftCardInfo.validCard.cardNumber, 
    giftCardInfo.invalidCard.expiryDate, 
    giftCardInfo.validCard.cvv
);
await giftPage.enterCountry();
    await giftPage.clickPurchaseButton();
    await giftPage.assertCardDateWarning(giftCardInfo.cardWarningMessages.cardExpiry);
});


test('TC-13 Negative - Enter invalid CVV number and validate warning text', async ({ page }) => {
  await giftPage.selectGiftAmount(giftCardInfo.giftAmount);
  await giftPage.selectDeliveryMethod(giftCardInfo.deliveryMethod.email);
  await giftPage.enterSenderDetails();
  await giftPage.enterRecipientDetails();
  await giftPage.enterMessageText();
  await giftPage.selectSendingOption(giftCardInfo.sendingOption.now);
  await giftPage.continueToPayment();
  await giftPage.enterCardDetails(
    giftCardInfo.validCard.cardNumber, 
    giftCardInfo.validCard.expiryDate, 
    giftCardInfo.invalidCard.cvv
);
await giftPage.enterCountry();
    await giftPage.clickPurchaseButton();
    await giftPage.assertCardCvvWarning(giftCardInfo.cardWarningMessages.cardCvv);
});




