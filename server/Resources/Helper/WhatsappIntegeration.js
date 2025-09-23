const { default: axios } = require("axios");

const sendCartMessage = async (data) => {
    try {
        const option = {
            CURLOPT_URL: 'https://api.interakt.ai/v1/public/message/',
            method: "post",
            "countryCode": "+91",
            "phoneNumber": "9807912518",
            "callbackData": "Hello mayur",
            "type": "Template",
            "template": {
                "name": "diwali_offers_w7",
                "languageCode": "hi"
            }
        }
    } catch (error) {
        return {
            status: 300,
            message: "Whatsapp message sending failed",
            info: error
        }
    }
}

module.exports = { sendCartMessage }