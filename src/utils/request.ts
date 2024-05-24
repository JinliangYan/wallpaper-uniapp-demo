
const  BASE_URL = "https://tea.qingnian8.com/api/bizhi";


export function request(config= {}
) {
    let {
        // @ts-ignore
        url,
        // @ts-ignore
        method="GET",
        // @ts-ignore
        header={}
    } = config
    url = BASE_URL + url
    header['access-key'] = "miku0206"
    header['token'] = "1828520027"
    return new Promise((resolve, reject) => {
        uni.request({
            url,
            method,
            header,
            success:res=>{
                // @ts-ignore
                if (res.data.errCode === 0) {
                    resolve(res)
                    // @ts-ignore
                } else if (res.data.errCode === 400) {
                    uni.showModal({
                        title: "Error",
                        // @ts-ignore
                        content: res.data.errMsg,
                        showCancel: false
                    }).then()
                    reject(res.data)
                } else {
                    uni.showToast({
                        // @ts-ignore
                        title: res.data.errMsg,
                        icon:"none"
                    }).then()
                    reject(res.data)
                }
            },
            fail: err => {
                reject(err)
            }
        })
    })

}
