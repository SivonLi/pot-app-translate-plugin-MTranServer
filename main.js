async function translate(text, from, to, options) {
    const { config, utils } = options
    const { tauriFetch: fetch } = utils

    const { requestPath = "http://localhost:8989", token } = config
    const baseUrl = requestPath.endsWith("/") ? requestPath.slice(0, -1) : requestPath
    const url = `${baseUrl}/translate`

    const headers = {
        'Content-Type': 'application/json'
    }
    if (token) {
        headers.Authorization = token
    }

    const res = await fetch(url, {
        method: 'POST',
        headers,
        body: {
            type: 'Json',
            payload: { from, to, text }
        }
    })

    if (res.ok) {
        const data = res.data
        if (!data?.result) {
            throw new Error("返回结果为空或格式不正确")
        }
        return data.result
    } else {
        throw new Error(`请求失败，状态码：${res.status}，响应数据：${JSON.stringify(res.data)}`)
    }
}
