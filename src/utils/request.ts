const BASE_URL = "https://tea.qingnian8.com/api/bizhi";


export function request(config: WallPaperRequest) {
    /* 如果没有通过headers给定key, 则添加 */
    if (config.headers == undefined) {
        config = {
            ...config,
            headers: {
                "access-key": "miku0206"
            }
        }
    }
    let {
        url,
        method,
        headers,
        data
    } = config

    url = BASE_URL + url
    return new Promise((resolve, reject) => {
        uni.request({
            url,
            method,
            header: headers,
            data,
            success: (res) => {
                // @ts-ignore
                let data: WallPaperResponse = res.data;
                if (data.errCode === 0) {
                    resolve(data)
                } else if (data.errCode === 400) {
                    uni.showModal({
                        title: "Error",
                        content: data.errMsg,
                        showCancel: false
                    }).then()
                    reject(data)
                } else {
                    uni.showToast({
                        title: data.errMsg,
                        icon: "none"
                    }).then()
                    reject(data)
                }
            },
            fail: err => {
                reject(err)
            }
        })
    })

}
