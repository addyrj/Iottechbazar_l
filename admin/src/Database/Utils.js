export const getHeaderWithToken = {
    headers: {
        Accept: "*/*",
        Authorization: localStorage.getItem("iottechAdminToken"),
    }
}

export const getHeaderWithoutToken = {
    headers: {
        Accept: "*/*",
    }
}

export const postHeaderWithToken = {
    headers: {
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("iottechAdminToken"),

    }
}

export const postHeaderWithoutToken = {
    headers: {
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
    }
}