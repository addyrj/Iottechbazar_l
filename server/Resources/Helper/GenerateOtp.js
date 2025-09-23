const generateOtp = async () => {
    let otp;
    let minm = 100000;
    let maxm = 999999;
    otp = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    return otp;
}

const otpMatcher = (first, second) => {
    if (first === second) {
        return true
    } else {
        return false
    }
}

module.exports = { generateOtp, otpMatcher }