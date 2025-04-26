const razorpay = require("../razorpay/index");

// Function to fill missing dates with 0
const fillMissingDates = (data) => {
  const last7Days = [];
  for (let i = 6; i >= 0; i--) { // Exclude today
    const date = new Date();
    date.setDate(date.getDate() - i);
    const formattedDate = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const dayData = data.find(item => item._id === formattedDate);
    last7Days.push(dayData ? dayData.count : 0);
  }
  return last7Days;
};

const refundPayment = async (paymentId, amount) => {

  const response = await razorpay.payments.refund(paymentId, {
    amount: amount, // amount in paise
  });
  return response;

};


module.exports = { fillMissingDates, refundPayment }