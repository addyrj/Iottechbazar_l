const userInfo = JSON.parse(localStorage.getItem("iottechUserInfo"));

export const getHeaderWithoutToken = {
    headers: {
        Accept: "*/*",
    }
}

export const getHeaderWithToken = {
    headers: {
        Accept: "*/*",
        Authorization: userInfo?.token,
    }
}

export const postHeaderWithToken = {
    headers: {
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
        Authorization: userInfo?.token,

    }
}

export const postHeaderWithoutToken = {
    headers: {
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
    }
}