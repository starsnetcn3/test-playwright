const { test, chromium, expect, devices } = require("@playwright/test");
const tablet = devices["iPad Pro 11"];
const mobile = devices["iPhone 14"];
import goToPage from "../../utils/goToPage";
import screenshotNoTime from "../../utils/screenshotNoTime";
import addCSV from "../../utils/addCSV";
import { name } from "../../playwright.config";

let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async ({ browser }) => {
  await page.close();
});
// 头部组件根底部组件也可以更换 通过改组件名
const hearder = {
  name: "HeaderThree",
  data: {
    title: "Team Aplus Coaching Limited",
    link1: "https://baidu.com/",
    link2: "https://www.google.com/",
    imageUrl: "images/logo_white.png",
    altText: "Baidu",
    buttonText: "Get the App",
  },
};
const footer = {
  name: "Footer",
  data: {

    caption: "©2025 Team Aplus Coaching Limited",
    address: "Room E, G/F, Kin Yip Court, 22 Lin Shing Road, Chai Wan, Hong Kong",
    link1: "https://www.google.com/",
    link2: "https://www.baidu.com/",
    link3: "https://www.google.com/",
  },
};
// Registration
const registration = {
  title: "Congratulations Clara!",
  caption: "You have finished setting up your new account",
  buttonText: "Start Your First Campaign",
  link: "https://baidu.com/",
  contentText:
    "Warmly welcome you to join us!  Let us bravely move towards the future and create our own wonderful stories together!",
};
// Login2FAVerificationCode
const Login2FAVerificationCode = {
  title: "John Doe",
  caption: "Nothing",
  code: "9rhRZZtL6BuGFY4F6wfw",
  buttonText: "Access Your Account",
  link: "https://baidu.com/",
  contentText:
    "Congratulations on activating your account! Now, enjoy exploring the many exciting features and opportunities we have prepared for you.",
};
//   Forget Password
const ResetOrForgetPasswordOrAccount = {
  title: "Forgot Your Password?",
  caption:
    "Don't worry about forgetting your password! It happens to even the best of us.",
  buttonText: "Reset My Password",
  link: "https://baidu.com/",
  contentText:
    "Callously piranha however moronic selfless more because spitefully dear some far forward where mounted underneath however feeling out less alas.",
};
//   Reset Password
const ResetOrForgetPasswordOrAccount1 = {
  title: "Reset Your Password?",
  caption:
    "Resetting your password is like pressing the refresh button on your digital life,take the opportunity to create a new, strong password.",
  buttonText: "Reset My Password",
  link: "https://baidu.com/",
  contentText:
    "Callously piranha however moronic selfless more because spitefully dear some far forward where mounted underneath however feeling out less alas.",
};
//   Change Email
const ResetOrForgetPasswordOrAccount2 = {
  title: "Change Your Email?",
  caption:
    "Changing your email is a breeze! Updating your contact info ensures you won't miss any important updates or notifications.",
  buttonText: "Change My Email",
  link: "https://baidu.com/",
  contentText:
    "Callously piranha however moronic selfless more because spitefully dear some far forward where mounted underneath however feeling out less alas.",
};
// Message
const Message = {
  title: "You Have a New Message",
  caption: "According inanimate immutable much far assisted",
  buttonText1: "Reply to Message",
  buttonText2: "Delete Message",
  link1: "https://baidu.com/",
  link2: "https://www.google.com/",
  productTitle: "Hot Items Right Now",
  contentText: "Callously piranha however moronic selfless more because spitefully dear some far forward where mounted underneath however feeling out less alas.",
  messageContent: {
    name: "Flossie Wade ",
    state: "Offline",
    time: "12:20pm   Wednesday, Apr 5 2018",
    rowOne: "Hello,",
    rowTwo: "As impatiently lorikeet far barring rarely great wow where more onto and goodness unbridled amidst hideously amiably gosh goat lantern.",
    rowThree: "Affable falcon past cumulative a one hello less murkily opposite.",
    imgs: [{
      src: "images/thumb_84.jpg",
      link: "https://google.com"
    },
    {
      src: "images/thumb_84.jpg",
      link: "https://google.com"
    }],
  }
}
// 其他静态页面
const pathsData = [
  // {
  //   path: `http://localhost:3000?components.0.name=${hearder.name}&components.0.data.title=${hearder.data.title}&components.0.data.link1=${hearder.data.link1}&components.0.data.link2=${hearder.data.link2}&components.0.data.imageUrl=${hearder.data.imageUrl}&components.0.data.altText=${hearder.data.altText}&components.0.data.buttonText=${hearder.data.buttonText}&components.1.name=RegistrationSuccess&components.1.data.title=${registration.title}&components.1.data.caption=${registration.caption}&components.1.data.buttonText=${registration.buttonText}&components.1.data.link=${registration.link}&components.1.data.contentText=${registration.contentText}&components.2.name=${footer.name}&components.2.data.caption=${footer.data.caption}&components.2.data.address=${footer.data.address}&components.2.data.link1=${footer.data.link1}&components.2.data.link2=${footer.data.link2}&components.2.data.link3=${footer.data.link3}&`,
  //   name: "l_01",
  //   title: "Authentication Integrations - Registration Confirmation",
  //   category: "Notification System",
  // },
  // {
  //   path: `http://localhost:3000?components.0.name=${hearder.name}&components.0.data.title=${hearder.data.title}&components.0.data.link1=${hearder.data.link1}&components.0.data.link2=${hearder.data.link2}&components.0.data.imageUrl=${hearder.data.imageUrl}&components.0.data.altText=${hearder.data.altText}&components.0.data.buttonText=${hearder.data.buttonText}&components.1.name=Login2FAVerificationCode&components.1.data.title=${Login2FAVerificationCode.title}&components.1.data.caption=${Login2FAVerificationCode.caption}&components.1.data.code=${Login2FAVerificationCode.code}&components.1.data.buttonText=${Login2FAVerificationCode.buttonText}&components.1.data.link=${Login2FAVerificationCode.link}&components.1.data.contentText=${Login2FAVerificationCode.contentText}&components.2.name=${footer.name}&components.2.data.caption=${footer.data.caption}&components.2.data.address=${footer.data.address}&components.2.data.link1=${footer.data.link1}&components.2.data.link2=${footer.data.link2}&components.2.data.link3=${footer.data.link3}&`,
  //   name: "l_02",
  //   title: "Authentication Integrations - Account Activation",
  //   category: "Notification System",
  // },
  // {
  //   path: `http://localhost:3000?components.0.name=${hearder.name}&components.0.data.title=${hearder.data.title}&components.0.data.link1=${hearder.data.link1}&components.0.data.link2=${hearder.data.link2}&components.0.data.imageUrl=${hearder.data.imageUrl}&components.0.data.altText=${hearder.data.altText}&components.0.data.buttonText=${hearder.data.buttonText}&components.1.name=ResetOrForgetPasswordOrAccount&components.1.data.title=${ResetOrForgetPasswordOrAccount.title}&components.1.data.caption=${ResetOrForgetPasswordOrAccount.caption}&components.1.data.buttonText=${ResetOrForgetPasswordOrAccount.buttonText}&components.1.data.link=${ResetOrForgetPasswordOrAccount.link}&components.1.data.contentText=${ResetOrForgetPasswordOrAccount.contentText}&components.2.name=${footer.name}&components.2.data.caption=${footer.data.caption}&components.2.data.address=${footer.data.address}&components.2.data.link1=${footer.data.link1}&components.2.data.link2=${footer.data.link2}&components.2.data.link3=${footer.data.link3}&`,
  //   name: "l_03",
  //   title: "Authentication Integrations - Forget Password",
  //   category: "Notification System",
  // },
  // {
  //   path: `http://localhost:3000?components.0.name=${hearder.name}&components.0.data.title=${hearder.data.title}&components.0.data.link1=${hearder.data.link1}&components.0.data.link2=${hearder.data.link2}&components.0.data.imageUrl=${hearder.data.imageUrl}&components.0.data.altText=${hearder.data.altText}&components.0.data.buttonText=${hearder.data.buttonText}&components.1.name=ResetOrForgetPasswordOrAccount&components.1.data.title=${ResetOrForgetPasswordOrAccount1.title}&components.1.data.caption=${ResetOrForgetPasswordOrAccount1.caption}&components.1.data.buttonText=${ResetOrForgetPasswordOrAccount1.buttonText}&components.1.data.link=${ResetOrForgetPasswordOrAccount1.link}&components.1.data.contentText=${ResetOrForgetPasswordOrAccount1.contentText}&components.2.name=${footer.name}&components.2.data.caption=${footer.data.caption}&components.2.data.address=${footer.data.address}&components.2.data.link1=${footer.data.link1}&components.2.data.link2=${footer.data.link2}&components.2.data.link3=${footer.data.link3}&`,
  //   name: "l_04",
  //   title: "Authentication Integrations - Reset Password",
  //   category: "Notification System",
  // },
  // {
  //   path: `http://localhost:3000?components.0.name=${hearder.name}&components.0.data.title=${hearder.data.title}&components.0.data.link1=${hearder.data.link1}&components.0.data.link2=${hearder.data.link2}&components.0.data.imageUrl=${hearder.data.imageUrl}&components.0.data.altText=${hearder.data.altText}&components.0.data.buttonText=${hearder.data.buttonText}&components.1.name=ResetOrForgetPasswordOrAccount&components.1.data.title=${ResetOrForgetPasswordOrAccount2.title}&components.1.data.caption=${ResetOrForgetPasswordOrAccount2.caption}&components.1.data.buttonText=${ResetOrForgetPasswordOrAccount2.buttonText}&components.1.data.link=${ResetOrForgetPasswordOrAccount2.link}&components.1.data.contentText=${ResetOrForgetPasswordOrAccount2.contentText}&components.2.name=${footer.name}&components.2.data.caption=${footer.data.caption}&components.2.data.address=${footer.data.address}&components.2.data.link1=${footer.data.link1}&components.2.data.link2=${footer.data.link2}&components.2.data.link3=${footer.data.link3}&`,
  //   name: "l_05",
  //   title: "Authentication Integrations - Change Email",
  //   category: "Notification System",
  // },
  {
    path: `http://localhost:3000?components.0.name=${hearder.name}&components.0.data.title=${hearder.data.title}&components.0.data.title=${hearder.data.title}&components.0.data.link1=${hearder.data.link1}&components.0.data.link2=${hearder.data.link2}&components.0.data.imageUrl=${hearder.data.imageUrl}&components.0.data.altText=${hearder.data.altText}&components.0.data.buttonText=${hearder.data.buttonText}&components.1.name=PaymentSuccessConfirmation&components.1.data.title=Order Confirmation&components.1.data.caption=That thus much less heron other hello&components.1.data.buttonText=Track My Order&components.1.data.link=https://baidu.com/&components.1.data.orderName=Hello, Clara Palmer&components.1.data.orderCaption=Thank you for ordering from SimpleApp. You can track your shipment status using our mobile tracking. See your order confirmation below.&components.1.data.orderId=1111&components.1.data.orderTime=Placed on March 14, 2018 1:20:32 PM FET&components.1.data.listText=Order Summary&components.1.data.billDetails.name=Clara Palmer1&components.1.data.billDetails.methods=Check / money order&components.1.data.billDetails.addressOne=3333 Poplar Street1111&components.1.data.billDetails.addressTwo=Chicago, IL 60603&components.1.data.billDetails.addressThree=United States&components.1.data.shippingInformation.name=Clara Palmer111&components.1.data.shippingInformation.methods=Check / money order&components.1.data.shippingInformation.addressOne=3333 Poplar Street&components.1.data.shippingInformation.addressTwo=Chicago, IL 60603&components.1.data.shippingInformation.addressThree=United States&components.1.data.contentText=Callously piranha however moronic selfless more because spitefully dear some far forward where mounted underneath however feeling out less alas.&components.1.data.productItems.0.name=Awesome Product Title3&components.1.data.productItems.0.caption=Stingy yikes enchantingly rebuilt&components.1.data.productItems.0.link=https://baidu.com/&components.1.data.productItems.0.price=900&components.1.data.productItems.0.color=white&components.1.data.productItems.0.size=m&components.1.data.productItems.0.quantity=1&components.1.data.productItems.1.name=Awesome Product Title2&components.1.data.productItems.1.caption=Stingy yikes enchantingly&components.1.data.productItems.1.link=https://baidu.com/&components.1.data.productItems.1.price=900&components.1.data.productItems.1.color=white&components.1.data.productItems.1.size=m&components.1.data.productItems.1.quantity=1&components.1.data.productItems.2.name=Awesome Product Title1&components.1.data.productItems.2.caption=Stingy yikes enchantingly&components.1.data.productItems.2.link=https://baidu.com/&components.1.data.productItems.2.price=900&components.1.data.productItems.2.color=white&components.1.data.productItems.2.size=m&components.1.data.productItems.2.quantity=1&components.1.data.subtotal=$4,050 USD&components.1.data.shipping=$2,000 USD&components.1.data.totalDue=$2,000 USD&components.2.name=${footer.name}&components.2.data.caption=${footer.data.caption}&components.2.data.address=${footer.data.address}&components.2.data.link1=${footer.data.link1}&components.2.data.link2=${footer.data.link2}&components.2.data.link3=${footer.data.link3}&`,
    name: "E06",
    title: "Order Management Function - Orders are emailed directly to customers",
    // category: "Notification System",
  },
  // {
  //   path: `http://localhost:3000?components.0.name=${hearder.name}&components.0.data.title=${hearder.data.title}&components.0.data.link1=${hearder.data.link1}&components.0.data.link2=${hearder.data.link2}&components.0.data.imageUrl=${hearder.data.imageUrl}&components.0.data.altText=${hearder.data.altText}&components.0.data.buttonText=${hearder.data.buttonText}&components.1.name=PaymentSuccessConfirmation&components.1.data.title=Order Confirmation&components.1.data.caption=That thus much less heron other hello&components.1.data.buttonText=Track My Order&components.1.data.link=https://baidu.com/&components.1.data.orderName=Hello, Clara Palmer&components.1.data.orderCaption=Thank you for ordering from SimpleApp. You can track your shipment status using our mobile tracking. See your order confirmation below.&components.1.data.orderId=1111&components.1.data.orderTime=Placed on March 14, 2018 1:20:32 PM FET&components.1.data.listText=Order Summary&components.1.data.billDetails.name=Clara Palmer1&components.1.data.billDetails.methods=Check / money order&components.1.data.billDetails.addressOne=3333 Poplar Street1111&components.1.data.billDetails.addressTwo=Chicago, IL 60603&components.1.data.billDetails.addressThree=United States&components.1.data.shippingInformation.name=Clara Palmer111&components.1.data.shippingInformation.methods=Check / money order&components.1.data.shippingInformation.addressOne=3333 Poplar Street&components.1.data.shippingInformation.addressTwo=Chicago, IL 60603&components.1.data.shippingInformation.addressThree=United States&components.1.data.contentText=Callously piranha however moronic selfless more because spitefully dear some far forward where mounted underneath however feeling out less alas.&components.1.data.productItems.0.name=Awesome Product Title3&components.1.data.productItems.0.caption=Stingy yikes enchantingly rebuilt&components.1.data.productItems.0.link=https://baidu.com/&components.1.data.productItems.0.price=900&components.1.data.productItems.0.color=white&components.1.data.productItems.0.size=m&components.1.data.productItems.0.quantity=1&components.1.data.productItems.1.name=Awesome Product Title2&components.1.data.productItems.1.caption=Stingy yikes enchantingly&components.1.data.productItems.1.link=https://baidu.com/&components.1.data.productItems.1.price=900&components.1.data.productItems.1.color=white&components.1.data.productItems.1.size=m&components.1.data.productItems.1.quantity=1&components.1.data.productItems.2.name=Awesome Product Title1&components.1.data.productItems.2.caption=Stingy yikes enchantingly&components.1.data.productItems.2.link=https://baidu.com/&components.1.data.productItems.2.price=900&components.1.data.productItems.2.color=white&components.1.data.productItems.2.size=m&components.1.data.productItems.2.quantity=1&components.1.data.subtotal=$4,050 USD&components.1.data.shipping=$2,000 USD&components.1.data.totalDue=$2,000 USD&components.2.name=${footer.name}&components.2.data.caption=${footer.data.caption}&components.2.data.address=${footer.data.address}&components.2.data.link1=${footer.data.link1}&components.2.data.link2=${footer.data.link2}&components.2.data.link3=${footer.data.link3}&`,
  //   name: "l_07",
  //   title: "Ecommerce Integrations - Order Status Updates",
  //   category: "Notification System",
  // },
  // {
  //   path: `http://localhost:3000?components.0.name=${hearder.name}&components.0.data.title=${hearder.data.title}&components.0.data.link1=${hearder.data.link1}&components.0.data.link2=${hearder.data.link2}&components.0.data.imageUrl=${hearder.data.imageUrl}&components.0.data.altText=${hearder.data.altText}&components.0.data.buttonText=${hearder.data.buttonText}&components.1.name=Invoice&components.1.data.title=Thank You for Your Business!&components.1.data.caption=Lemming returned cuffed capable unwound some withdrew goodness much so underneath insincerely on gazelle.&components.1.data.buttonText=Contact Support&components.1.data.link=https://baidu.com/&components.1.data.billDetails.name=Clara Palmer1&components.1.data.billDetails.email=clara.palmer@customservice.eu&components.1.data.billDetails.phone=555-555-5555&components.1.data.billDetails.addressOne=3333 Poplar Street&components.1.data.billDetails.addressTwo=Chicago, IL 60603&components.1.data.billDetails.addressThree=United States&components.1.data.invoiceDetails.number=VR726541&components.1.data.invoiceDetails.poNumber=UIX398431&components.1.data.invoiceDetails.date= March 16, 2018 &components.1.data.invoiceDetails.paymentDue=June 25, 2017&components.1.data.invoiceDetails.amountDue=$2,051 USD&components.1.data.contentText=Callously piranha however moronic selfless more because spitefully dear some far forward where mounted underneath however feeling out less alas.&components.1.data.invoiceItems.0.name=Jubilantly Goodness&components.1.data.invoiceItems.0.caption=Gazelle bucolically the this sour far dear the after among gradually far mongoose militant and blanched much.&components.1.data.invoiceItems.0.link=https://baidu.com/&components.1.data.invoiceItems.0.price=900&components.1.data.invoiceItems.0.quantity=1&components.1.data.invoiceItems.1.name=Awesome Product Title&components.1.data.invoiceItems.1.caption=Stingy yikes enchantingly&components.1.data.invoiceItems.1.link=https://baidu.com/&components.1.data.invoiceItems.1.price=900&components.1.data.invoiceItems.1.quantity=1&components.1.data.invoiceItems.2.name=Awesome Product Title&components.1.data.invoiceItems.2.caption=Stingy yikes enchantingly&components.1.data.invoiceItems.2.link=https://baidu.com/&components.1.data.invoiceItems.2.price=900&components.1.data.invoiceItems.2.quantity=1&components.1.data.subtotal=$4,050 USD&components.1.data.deposit=$2,000 USD&components.1.data.totalDue=$2,000 USD&components.2.name=${footer.name}&components.2.data.caption=${footer.data.caption}&components.2.data.address=${footer.data.address}&components.2.data.link1=${footer.data.link1}&components.2.data.link2=${footer.data.link2}&components.2.data.link3=${footer.data.link3}&`,
  //   name: "l_08",
  //   title: "Ecommerce Integrations - Order Receipts",
  //   category: "Notification System",
  // },
  // {
  //   path: `http://localhost:3000?components.0.name=${hearder.name}&components.0.data.title=${hearder.data.title}&components.0.data.link1=${hearder.data.link1}&components.0.data.link2=${hearder.data.link2}&components.0.data.imageUrl=${hearder.data.imageUrl}&components.0.data.altText=${hearder.data.altText}&components.0.data.buttonText=${hearder.data.buttonText}&components.1.name=PaymentSuccessConfirmation&components.1.data.title=Order Confirmation&components.1.data.caption=That thus much less heron other hello&components.1.data.buttonText=Track My Order&components.1.data.link=https://baidu.com/&components.1.data.orderName=Hello, Clara Palmer&components.1.data.orderCaption=Thank you for ordering from SimpleApp. You can track your shipment status using our mobile tracking. See your order confirmation below.&components.1.data.orderId=1111&components.1.data.orderTime=Placed on March 14, 2018 1:20:32 PM FET&components.1.data.listText=Order Summary&components.1.data.billDetails.name=Clara Palmer1&components.1.data.billDetails.methods=Check / money order&components.1.data.billDetails.addressOne=3333 Poplar Street1111&components.1.data.billDetails.addressTwo=Chicago, IL 60603&components.1.data.billDetails.addressThree=United States&components.1.data.shippingInformation.name=Clara Palmer111&components.1.data.shippingInformation.methods=Check / money order&components.1.data.shippingInformation.addressOne=3333 Poplar Street&components.1.data.shippingInformation.addressTwo=Chicago, IL 60603&components.1.data.shippingInformation.addressThree=United States&components.1.data.contentText=Callously piranha however moronic selfless more because spitefully dear some far forward where mounted underneath however feeling out less alas.&components.1.data.productItems.0.name=Awesome Product Title3&components.1.data.productItems.0.caption=Stingy yikes enchantingly rebuilt&components.1.data.productItems.0.link=https://baidu.com/&components.1.data.productItems.0.price=900&components.1.data.productItems.0.color=white&components.1.data.productItems.0.size=m&components.1.data.productItems.0.quantity=1&components.1.data.productItems.1.name=Awesome Product Title2&components.1.data.productItems.1.caption=Stingy yikes enchantingly&components.1.data.productItems.1.link=https://baidu.com/&components.1.data.productItems.1.price=900&components.1.data.productItems.1.color=white&components.1.data.productItems.1.size=m&components.1.data.productItems.1.quantity=1&components.1.data.productItems.2.name=Awesome Product Title1&components.1.data.productItems.2.caption=Stingy yikes enchantingly&components.1.data.productItems.2.link=https://baidu.com/&components.1.data.productItems.2.price=900&components.1.data.productItems.2.color=white&components.1.data.productItems.2.size=m&components.1.data.productItems.2.quantity=1&components.1.data.subtotal=$4,050 USD&components.1.data.shipping=$2,000 USD&components.1.data.totalDue=$2,000 USD&components.2.name=${footer.name}&components.2.data.caption=${footer.data.caption}&components.2.data.address=${footer.data.address}&components.2.data.link1=${footer.data.link1}&components.2.data.link2=${footer.data.link2}&components.2.data.link3=${footer.data.link3}&`,
  //   name: "l_09",
  //   title: "Ecommerce Integrations - Refund Confirmation",
  //   category: "Notification System",
  // },
  // {
  //   path: `http://localhost:3000?components.0.name=${hearder.name}&components.0.data.title=${hearder.data.title}&components.0.data.link1=${hearder.data.link1}&components.0.data.link2=${hearder.data.link2}&components.0.data.imageUrl=${hearder.data.imageUrl}&components.0.data.altText=${hearder.data.altText}&components.0.data.buttonText=${hearder.data.buttonText}&components.1.name=PaymentSuccessConfirmation&components.1.data.title=Order Confirmation&components.1.data.caption=That thus much less heron other hello&components.1.data.buttonText=Track My Order&components.1.data.link=https://baidu.com/&components.1.data.orderName=Hello, Clara Palmer&components.1.data.orderCaption=Thank you for ordering from SimpleApp. You can track your shipment status using our mobile tracking. See your order confirmation below.&components.1.data.orderId=1111&components.1.data.orderTime=Placed on March 14, 2018 1:20:32 PM FET&components.1.data.listText=Order Summary&components.1.data.billDetails.name=Clara Palmer1&components.1.data.billDetails.methods=Check / money order&components.1.data.billDetails.addressOne=3333 Poplar Street1111&components.1.data.billDetails.addressTwo=Chicago, IL 60603&components.1.data.billDetails.addressThree=United States&components.1.data.shippingInformation.name=Clara Palmer111&components.1.data.shippingInformation.methods=Check / money order&components.1.data.shippingInformation.addressOne=3333 Poplar Street&components.1.data.shippingInformation.addressTwo=Chicago, IL 60603&components.1.data.shippingInformation.addressThree=United States&components.1.data.contentText=Callously piranha however moronic selfless more because spitefully dear some far forward where mounted underneath however feeling out less alas.&components.1.data.productItems.0.name=Awesome Product Title3&components.1.data.productItems.0.caption=Stingy yikes enchantingly rebuilt&components.1.data.productItems.0.link=https://baidu.com/&components.1.data.productItems.0.price=900&components.1.data.productItems.0.color=white&components.1.data.productItems.0.size=m&components.1.data.productItems.0.quantity=1&components.1.data.productItems.1.name=Awesome Product Title2&components.1.data.productItems.1.caption=Stingy yikes enchantingly&components.1.data.productItems.1.link=https://baidu.com/&components.1.data.productItems.1.price=900&components.1.data.productItems.1.color=white&components.1.data.productItems.1.size=m&components.1.data.productItems.1.quantity=1&components.1.data.productItems.2.name=Awesome Product Title1&components.1.data.productItems.2.caption=Stingy yikes enchantingly&components.1.data.productItems.2.link=https://baidu.com/&components.1.data.productItems.2.price=900&components.1.data.productItems.2.color=white&components.1.data.productItems.2.size=m&components.1.data.productItems.2.quantity=1&components.1.data.subtotal=$4,050 USD&components.1.data.shipping=$2,000 USD&components.1.data.totalDue=$2,000 USD&components.2.name=${footer.name}&components.2.data.caption=${footer.data.caption}&components.2.data.address=${footer.data.address}&components.2.data.link1=${footer.data.link1}&components.2.data.link2=${footer.data.link2}&components.2.data.link3=${footer.data.link3}&`,
  //   name: "l_10",
  //   title: "Ecommerce Integrations - Refund Status Update",
  //   category: "Notification System",
  // },
  // {
  //   path: `http://localhost:3000/?components.0.name=${hearder.name}&components.0.data.title=${hearder.data.title}&components.0.data.link1=${hearder.data.link1}&components.0.data.link2=${hearder.data.link2}&components.0.data.imageUrl=${hearder.data.imageUrl}&components.0.data.altText=${hearder.data.altText}&components.0.data.buttonText=${hearder.data.buttonText}&components.1.name=Message&components.1.data.title=${Message.title}&components.1.data.caption=${Message.caption}&components.1.data.buttonText1=${Message.buttonText1}&components.1.data.buttonText2=${Message.buttonText2}&components.1.data.link1=${Message.link1}&components.1.data.link2=${Message.link2}&components.1.data.productTitle=${Message.productTitle}&components.1.data.contentText=${Message.contentText}&components.1.data.messageContent.name=${Message.messageContent.name}&components.1.data.messageContent.state=${Message.messageContent.state}&components.1.data.messageContent.time=${Message.messageContent.time}&components.1.data.messageContent.rowOne=${Message.messageContent.rowOne},&components.1.data.messageContent.rowTwo=${Message.messageContent.rowTwo}&components.1.data.messageContent.rowThree=${Message.messageContent.rowThree}&components.1.data.messageContent.imgs.0.src=${Message.messageContent.imgs[0].src}&components.1.data.messageContent.imgs.0.link=${Message.messageContent.imgs[0].link}&components.1.data.messageContent.imgs.1.src=${Message.messageContent.imgs[1].src}&components.1.data.messageContent.imgs.1.link=${Message.messageContent.imgs[1].link}&components.2.name=${footer.name}&components.2.data.caption=${footer.data.caption}&components.2.data.address=${footer.data.address}&components.2.data.link1=${footer.data.link1}&components.2.data.link2=${footer.data.link2}&components.2.data.link3=${footer.data.link3}`,
  //   name: "l_11",
  //   title: "View and Edit notification settings of Members",
  //   category: "Notification System",
  // },
  // {
  //   path: `http://localhost:3000/?components.0.name=${hearder.name}&components.0.data.title=${hearder.data.title}&components.0.data.link1=${hearder.data.link1}&components.0.data.link2=${hearder.data.link2}&components.0.data.imageUrl=${hearder.data.imageUrl}&components.0.data.altText=${hearder.data.altText}&components.0.data.buttonText=${hearder.data.buttonText}&components.1.name=Message&components.1.data.title=${Message.title}&components.1.data.caption=${Message.caption}&components.1.data.buttonText1=${Message.buttonText1}&components.1.data.buttonText2=${Message.buttonText2}&components.1.data.link1=${Message.link1}&components.1.data.link2=${Message.link2}&components.1.data.productTitle=${Message.productTitle}&components.1.data.contentText=${Message.contentText}&components.1.data.messageContent.name=${Message.messageContent.name}&components.1.data.messageContent.state=${Message.messageContent.state}&components.1.data.messageContent.time=${Message.messageContent.time}&components.1.data.messageContent.rowOne=${Message.messageContent.rowOne},&components.1.data.messageContent.rowTwo=${Message.messageContent.rowTwo}&components.1.data.messageContent.rowThree=${Message.messageContent.rowThree}&components.1.data.messageContent.imgs.0.src=${Message.messageContent.imgs[0].src}&components.1.data.messageContent.imgs.0.link=${Message.messageContent.imgs[0].link}&components.1.data.messageContent.imgs.1.src=${Message.messageContent.imgs[1].src}&components.1.data.messageContent.imgs.1.link=${Message.messageContent.imgs[1].link}&components.2.name=${footer.name}&components.2.data.caption=${footer.data.caption}&components.2.data.address=${footer.data.address}&components.2.data.link1=${footer.data.link1}&components.2.data.link2=${footer.data.link2}&components.2.data.link3=${footer.data.link3}`,
  //   name: "l_12",
  //   title: "View and Edit notification settings of Staff",
  //   category: "Notification System",
  // },
];

function formatCurrency(amount) {
  // 创建一个国际化数字格式化器
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // 格式化数字并替换货币符号
  return formatter.format(amount).replace("$", "$")
}

pathsData.forEach((pathData) => {
  test.describe.serial(`static paths page path=${pathData.path}`, () => {
    test(`static path=${pathData.name}`, async () => {
      //   await goToPage({ page, path: pathData.path, type: "customer" });
      if (
        pathData.name === "E06" ||
        pathData.name === "l_07" ||
        pathData.name === "l_09" ||
        pathData.name === "l_10" ||
        pathData.name === "l_08"
      ) {
        //   请求服务器地址
        const orderData = {
          title: "Order Confirmation",
          caption: "That thus much less heron other hello",
          buttonText: "Track My Order",
          link: "https://baidu.com/",
          orderName: "Hello, Clara Palmer",
          orderCaption:
            "Thank you for your order. Here are the order details.",
          orderId: "1111",
          orderTime: "Placed on March 14, 2018 1:20:32 PM FET",
          listText: "Order Summary",
          billDetails: {
            name: "Clara Palmer1",
            methods: "Check / money order",
            addressOne: "3333 Poplar Street1111",
            addressTwo: "Chicago, IL 60603",
            addressThree: "United States",
          },
          shippingInformation: {
            name: "Clara Palmer111",
            methods: "Check / money order",
            addressOne: "3333 Poplar Street",
            addressTwo: "Chicago, IL 60603",
            addressThree: "United States",
          },
          contentText:
            "Callously piranha however moronic selfless more because spitefully dear some far forward where mounted underneath however feeling out less alas.",
          productItems: [
            {
              name: "Awesome Product Title3",
              caption: "Stingy yikes enchantingly rebuilt",
              link: "https://baidu.com/",
              imageUrl: "images/thumb_184.jpg",
              price: "900",
              quantity: "1",
            },
            {
              name: "Awesome Product Title2",
              caption: "Stingy yikes enchantingly",
              link: "https://baidu.com/",
              imageUrl: "images/thumb_184.jpg",
              price: "900",
              quantity: "1",
            },
          ],
          subtotal: "$4,050 USD",
          shipping: "$2,000 USD",
          totalDue: "$2,000 USD",
        };
        const invoiceData = {
          title: "Thank You for Your Business!",
          caption: "Here's your order receipt – a snapshot of your recent purchase.Thank you for shopping with us! ",
          buttonText: "Contact Support",
          link: "https://baidu.com/",
          billDetails: {
            name: "Clara Palmer1",
            email: "clara.palmer@customservice.eu",
            phone: "555-555-5555",
            addressOne: "3333 Poplar Street",
            addressTwo: "Chicago, IL 60603",
            addressThree: "United States",
          },
          invoiceDetails: {
            number: "VR726541",
            poNumber: "UIX398431",
            date: "	March 16, 2018 ",
            paymentDue: "June 25, 2017",
            amountDue: "$2,051 USD",
            subtotal: "$4,050 USD",
            deposit: "$2,000 USD",
            totalDue: "$2,000 USD",
          },
          contentText: "Your order receipts are more than just transaction records; they're the keys to unlocking the details of your purchases. Keep them handy for tracking shipments, returns, or simply as a reference for your shopping journey. ",
        }
        // 换网站改这里  衣服相关的网站的话 如果有color size字段的话可以直接写在orderData.productItems里面
        const api = "https://teamaplus.backend.starsnet.hk";
        const apiUrl = `${api}/api/customer/stores/default-main-store/product-management/products/filter?slug=recommended&per_page=12&page=1`;
        // 发送请求并等待响应
        const response = await page.request.get(apiUrl);
        // 检查响应状态
        if (response.ok()) {
          // 解析 JSON 数据
          const data = await response.json();
          const dataArray = data.data;
          console.log("data", data);
          orderData.productItems.forEach((item, index) => {
            // item.name = dataArray[index].title.en
            // item.caption = dataArray[index].long_description.en
            // item.name = dataArray[index].title.en.slice(0, 20);
            // item.caption = dataArray[index].long_description.en.slice(0, 20);
            item.price = dataArray[index].price;
            item.imageUrl = dataArray[index].images[0];
            // item.is_free_shipping=data[index].is_free_shipping
            // item.name=data[index].title.en
            // item.name=data[index].title.en
          });
          orderData.subtotal = formatCurrency(
            orderData.productItems.reduce(
              (acc, item) => acc + parseInt(item.price),
              0
            )
          );
          orderData.shipping = formatCurrency(1000);
          orderData.totalDue = formatCurrency(1000 + orderData.productItems.reduce(
            (acc, item) => acc + parseInt(item.price),
            0
          ))
        } else {
          console.error(`请求失败: ${response.status()}`);
        }
        // 用swich判断订单状态用来发电子邮件
        switch (pathData.name) {
          case "E06":
            orderData.title = "Order Confirmation";
            break;
          case "l_07":
            orderData.title = "Order Status Updates";
            break;
          case "l_09":
            orderData.title = "Refund Confirmation";
            break;
          case "l_10":
            orderData.title = "Refund Status Update";
            break;
        }
        if (pathData.name == "l_08") {
          invoiceData.subtotal = orderData.subtotal
          invoiceData.deposit = formatCurrency(1000);
          invoiceData.totalDue = formatCurrency(1000 + orderData.productItems.reduce(
            (acc, item) => acc + parseInt(item.price),
            0
          ))
          await page.goto(
            `http://localhost:3000?components.0.name=${hearder.name}&components.0.data.title=${hearder.data.title}&components.0.data.link1=${hearder.data.link1}&components.0.data.link2=${hearder.data.link2}&components.0.data.imageUrl=${hearder.data.imageUrl}&components.0.data.altText=${hearder.data.altText}&components.0.data.buttonText=${hearder.data.buttonText}&components.1.name=Invoice&components.1.data.title=${invoiceData.title}&components.1.data.caption=${invoiceData.caption}&components.1.data.buttonText=${invoiceData.buttonText}&components.1.data.link=${invoiceData.link}&components.1.data.billDetails.name=${invoiceData.billDetails.name}&components.1.data.billDetails.email=${invoiceData.billDetails.email}&components.1.data.billDetails.phone=${invoiceData.billDetails.phone}&components.1.data.billDetails.addressOne=${invoiceData.billDetails.addressOne}&components.1.data.billDetails.addressTwo=${invoiceData.billDetails.addressTwo}&components.1.data.billDetails.addressThree=${invoiceData.billDetails.addressThree}&components.1.data.invoiceDetails.number=${invoiceData.invoiceDetails.number}&components.1.data.invoiceDetails.poNumber=${invoiceData.invoiceDetails.poNumber}&components.1.data.invoiceDetails.date=${invoiceData.invoiceDetails.date}&components.1.data.invoiceDetails.paymentDue=${invoiceData.invoiceDetails.paymentDue}&components.1.data.invoiceDetails.amountDue=${orderData.totalDue}&components.1.data.contentText=${invoiceData.contentText}&components.1.data.invoiceItems.0.name=${orderData.productItems[0].name}&components.1.data.invoiceItems.0.caption=${orderData.productItems[0].caption}&components.1.data.invoiceItems.0.link=${orderData.productItems.link}&components.1.data.invoiceItems.0.price=${orderData.productItems[0].price}&components.1.data.invoiceItems.0.quantity=${orderData.productItems[0].quantity}&components.1.data.invoiceItems.1.name=${orderData.productItems[1].name}&components.1.data.invoiceItems.1.caption=${orderData.productItems[1].caption}&components.1.data.invoiceItems.1.link=${orderData.productItems[1].link}&components.1.data.invoiceItems.1.price=${orderData.productItems[1].price}&components.1.data.invoiceItems.1.quantity=${orderData.productItems[1].quantity}&components.1.data.subtotal=${invoiceData.subtotal}&components.1.data.deposit=${invoiceData.deposit}&components.1.data.totalDue=${invoiceData.totalDue}&components.2.name=${footer.name}&components.2.data.caption=${footer.data.caption}&components.2.data.address=${footer.data.address}&components.2.data.link1=${footer.data.link1}&components.2.data.link2=${footer.data.link2}&components.2.data.link3=${footer.data.link3}&`
          );
        } else {
          await page.goto(
            `http://localhost:3000?components.0.name=${hearder.name}&components.0.data.title=${hearder.data.title}&components.0.data.link1=${hearder.data.link1}&components.0.data.link2=${hearder.data.link2}&components.0.data.imageUrl=${hearder.data.imageUrl}&components.0.data.altText=${hearder.data.altText}&components.0.data.buttonText=${hearder.data.buttonText}&components.1.name=PaymentSuccessConfirmation&components.1.data.title=${orderData.title}&components.1.data.caption=${orderData.caption}&components.1.data.buttonText=${orderData.buttonText}&components.1.data.link=${orderData.link}&components.1.data.orderName=${orderData.orderName}&components.1.data.orderCaption=${orderData.orderCaption}&components.1.data.orderId=${orderData.orderId}&components.1.data.orderTime=${orderData.orderTime}&components.1.data.listText=${orderData.listText}&components.1.data.billDetails.name=${orderData.billDetails.name}&components.1.data.billDetails.methods=${orderData.billDetails.methods}&components.1.data.billDetails.addressOne=${orderData.billDetails.addressOne}&components.1.data.billDetails.addressTwo=${orderData.billDetails.addressTwo}&components.1.data.billDetails.addressThree=${orderData.billDetails.addressThree}&components.1.data.shippingInformation.name=${orderData.shippingInformation.name}&components.1.data.shippingInformation.methods=${orderData.shippingInformation.methods}&components.1.data.shippingInformation.addressOne=${orderData.shippingInformation.addressOne}&components.1.data.shippingInformation.addressTwo=${orderData.shippingInformation.addressTwo}&components.1.data.shippingInformation.addressThree=${orderData.shippingInformation.addressThree}&components.1.data.contentText=${orderData.contentText}&components.1.data.productItems.0.name=${orderData.productItems[0].name}&components.1.data.productItems.0.caption=${orderData.productItems[0].caption}&components.1.data.productItems.0.link=${orderData.productItems[0].link}&components.1.data.productItems.0.imageUrl=${orderData.productItems[0].imageUrl}&components.1.data.productItems.0.price=${orderData.productItems[0].price}&components.1.data.productItems.0.color=${orderData.productItems[0].color}&components.1.data.productItems.0.size=${orderData.productItems[0].size}&components.1.data.productItems.0.quantity=${orderData.productItems.quantity}&components.1.data.productItems.1.name=${orderData.productItems[1].name}&components.1.data.productItems.1.caption=${orderData.productItems[1].caption}&components.1.data.productItems.1.link=${orderData.productItems[1].link}&components.1.data.productItems.1.imageUrl=${orderData.productItems[1].imageUrl}&components.1.data.productItems.1.price=${orderData.productItems[1].price}&components.1.data.productItems.1.color=${orderData.productItems[1].color}&components.1.data.productItems.1.size=${orderData.productItems[1].size}&components.1.data.productItems.1.quantity=${orderData.productItems[1].quantity}&components.1.data.subtotal=${orderData.subtotal}&components.1.data.shipping=${orderData.shipping}&components.1.data.totalDue=${orderData.totalDue}&components.2.name=${footer.name}&components.2.data.caption=${footer.data.caption}&components.2.data.address=${footer.data.address}&components.2.data.link1=${footer.data.link1}&components.2.data.link2=${footer.data.link2}&components.2.data.link3=${footer.data.link3}&`
          );
        }

        await new Promise((r) => setTimeout(r, 2000));
        await screenshotNoTime({
          test,
          page,
          filename: pathData.name,
        });
        // addCSV([pathData.category, pathData.title, pathData.name, page.url()]);
        addCSV([pathData.title, pathData.name, page.url()]);
      } else {
        await page.goto(`${pathData.path}`);

        await new Promise((r) => setTimeout(r, 2000));
        await screenshotNoTime({
          test,
          page,
          filename: pathData.name,
        });
        // addCSV([pathData.category, pathData.title, pathData.name, page.url()]);
        addCSV([pathData.title, pathData.name, page.url()]);
      }
    });
  });
});
