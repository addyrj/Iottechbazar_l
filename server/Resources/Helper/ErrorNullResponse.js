const ErrorNullResponse = async (obj) => {
    let errorMessage = [];

    for (var key in obj) {
        if (obj[key] === "") {
            errorMessage.push(`Failed! ${key} is not exist`)
        }
    }
    return errorMessage;
}

module.exports = ErrorNullResponse