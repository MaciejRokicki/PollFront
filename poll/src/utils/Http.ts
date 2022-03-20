enum MethodType {
    POST = 'POST',
    PUT = 'PUT',
    GET = 'GET',
    DELETE = 'DELETE',
}

const requestFunction = <R>(
    url: string, 
    payload: any, 
    methodType: MethodType,
    token: string
    ): Promise<R> => {

    const headers = {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
    }

    const options:  RequestInit = {
        method: methodType,
        headers: headers,
        credentials: "include",
        ...(!!token && {
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`,
            }
        })
    }

    let parsedUrl = url;

    if((methodType === MethodType.POST || methodType === MethodType.PUT) && payload) {
        options.body = JSON.stringify(payload);
    } else if (payload) {
        const query = Object
            .keys(payload)
            .map((key: string) => `${key}=${payload[key]}`)
            .join('&');

        parsedUrl = `${url}?${query}`;
    }

    return new Promise((resolve, reject) => {
        fetch(parsedUrl, options)
        .then(res => {
            if(res.status !== 200) {
                reject(res.json());
            }

            if(res.headers.get("Content-Type") == null) {
                return res.text();
            }

            return res.json();
        })
        .then(json => resolve(json))
        .catch(err => {
            console.log(err.status);
            return reject(err)
        });
    })
}

const http = {
    post: (url: string, payload: any, token: string = '') => requestFunction(url, payload, MethodType.POST, token),
    get: (url: string, payload: any, token: string = '') => requestFunction(url, payload, MethodType.GET, token),
    put: (url: string, payload: any, token: string = '') => requestFunction(url, payload, MethodType.PUT, token),
    delete: (url: string, payload: any, token: string = '') => requestFunction(url, payload, MethodType.DELETE, token)
}

export default http;