import { giftLocators } from '../locators/gift_locators.js';
import { expect } from '@playwright/test';
import { generateRandomFullName, generateRandomEmail, generateRandomText } from '../utils/helpers.js';


export class GiftPage {
  constructor(page) {
    this.page = page;
    this.senderFullName = generateRandomFullName();
    this. senderEmail = generateRandomEmail();
    this.recepientFullName = generateRandomFullName();
    this.recepientEmail = generateRandomEmail();
    this.text = generateRandomText();
  }



  async selectGiftAmount(amount){
    await this.page.locator(giftLocators.giftCardAmount(amount)).click();
  }

  async selectDeliveryMethod(method){
    this.deliveryMethod = method;
    await this.page.locator(giftLocators.deliveryMethod(method)).click();
  }

  async enterSenderDetails(){
    await this.page.locator(giftLocators.senderFullNameInput).fill(this.senderFullName);
    await this.page.locator(giftLocators.senderEmailInput).fill(this.senderEmail);

  }


  async enterRecipientDetails(){
    await this.page.locator(giftLocators.recepientFullNameInput).fill(this.recepientFullName);
    if (this.deliveryMethod?.toLowerCase().includes('email')) {
    await this.page.locator(giftLocators.recepientEmailInput).fill(this.recepientEmail);
    }

  }

  async selectSendingOption(text){
    this.sendingOp = text;
    await this.page.locator(giftLocators.sendingTime(this.sendingOp)).click();
  }

  async enterMessageText(){
    await this.page.locator(giftLocators.messageTextArea).fill(this.text);

  }

   async continueToPayment(){
    await this.page.locator(giftLocators.continueButton).click();
  }

  async enterCardDetails(cardNumber, expiry, cvv) {
    const frames = this.page.frameLocator('iframe[name^="__privateStripeFrame"]');
    await frames.nth(0).locator(giftLocators.cardNumberInput).fill(cardNumber);
    await frames.nth(0).locator(giftLocators.cardExpiryInput).fill(expiry);
    await frames.nth(0).locator(giftLocators.cardCvvInput).fill(cvv);
  }

  async clickPurchaseButton() {
    await this.page.locator(giftLocators.purchaseButton).click();
    await this.page.waitForTimeout(2000);
  }

  async assertGiftCardConfirmationMessage(amount, orderMessage) {
    let expectedMessage; 

    if (this.sendingOp?.toLowerCase().includes('now')) {
        const today = new Date().toISOString().split('T')[0]; 
        expectedMessage = `${this.recepientFullName} will receive a $${amount} gift card from ${this.senderEmail} on ${today}`;
    } 
    else if(this.sendingOp?.toLowerCase().includes('later')) {
         const nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1); 
        const formattedNextDay = nextDay.toISOString().split('T')[0];
        expectedMessage = `${this.recepientFullName} will receive a $${amount} gift card from ${this.senderEmail} on ${formattedNextDay}`;
    }
    else{
        expectedMessage = `Your $${amount} gift card has been emailed to ${this.senderEmail} for you to print at home.`;
    }
    
    const confirmation = this.page.locator(giftLocators.confirmationMessage);

    await expect(this.page.locator(giftLocators.orderCompleteMessage)).toHaveText(orderMessage, { timeout: 10000 });
    await expect(confirmation).toHaveText(expectedMessage, { timeout: 10000 });
}


  async  selectNextDay() {
  this.page.locator(giftLocators.datePicker).click();
  const nextDayElement = this.page.locator(giftLocators.nextDayButton).first();
  await nextDayElement.click();
}

async clickCorporateGiftLink() {
  await this.page.locator(giftLocators.corporateGiftLink).click();
  await this.page.waitForURL('**/corporate/**');
}

async validatePageUrl(expectedUrl) {
    const currentUrl = await this.page.url();
    await expect(currentUrl).toBe(expectedUrl);
}

async validatePageHeading(expectedText) {
    await expect(this.page.locator(giftLocators.inquiriesText)).toHaveText(expectedText);
}

async assertFieldWarning(fullNameWarningS, emailWarningS, fullNameWarningR, emailWarningR) {
        await expect(this.page.locator(giftLocators.fieldWarning('Full Name'))).toHaveText(fullNameWarningS);
        await expect(this.page.locator(giftLocators.fieldWarning('Email'))).toHaveText(emailWarningS);
        await expect(this.page.locator(giftLocators.fieldWarning("Recipient's Name"))).toHaveText(fullNameWarningR);
        await expect(this.page.locator(giftLocators.fieldWarning("Recipient's Email"))).toHaveText(emailWarningR);
}

async clickOtherAmountButton() {
  await this.page.locator(giftLocators.otherAmountButton).click();
}

async enterAmount(){
    await this.page.locator(giftLocators.otherAmountInput).fill('1');
}

async assertOtherAmountWarning() {
  await expect(this.page.locator(giftLocators.otherAmountWarning)).toHaveText('The minimum amount for a gift card is $20');  
}

async enterInvalidSenderEmail() {
  await this.page.locator(giftLocators.senderEmailInput).fill('invalid-email')

}

async assertSenderEmailWarning(emailWarningS) {
        await expect(this.page.locator(giftLocators.fieldWarning('Email'))).toHaveText(emailWarningS);
}

async enterInvalidRecipientEmail() {
  await this.page.locator(giftLocators.recepientEmailInput).fill('invalid-email');
}

async assertRecipientEmailWarning() {
  await expect(this.page.locator(giftLocators.fieldWarning("Recipient's Email"))).toHaveText('Please enter a valid email address');
}

async assertCardWarning(text) {
    const frames = this.page.frameLocator('iframe[name^="__privateStripeFrame"]');
    await expect(frames.nth(0).locator(giftLocators.cardNumberWarning)).toHaveText(text);

}

async assertCardDateWarning(text) {
    const frames = this.page.frameLocator('iframe[name^="__privateStripeFrame"]');
    await expect(frames.nth(0).locator(giftLocators.cardExpiryWarning)).toHaveText(text);

}

async assertCardCvvWarning(text) {
    const frames = this.page.frameLocator('iframe[name^="__privateStripeFrame"]');
    await expect(frames.nth(0).locator(giftLocators.cardCvvWarning)).toHaveText(text);

}

}