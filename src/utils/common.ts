export function timeDiffDisplay(inputTime: number) {
    const currentTime = new Date().getTime();
    const diff = currentTime - inputTime;

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const threeMonths = 3 * month;

    if (diff < minute) {
        return "1分钟内";
    } else if (diff < hour) {
        const minutes = Math.floor(diff / minute);
        return `${minutes} 分钟前`;
    } else if (diff < day) {
        const hours = Math.floor(diff / hour);
        return `${hours} 小时前`;
    } else if (diff < month) {
        const days = Math.floor(diff / day);
        return `${days} 天前`;
    } else if (diff < threeMonths) {
        const months = Math.floor(diff / month);
        return `${months} 月前`;
    } else {
        return "超过3个月";
    }
}

export async function gotoHome() {
    try {
        let res = await uni.showModal({
            title: "提示",
            content: "页面有误, 即将返回首页",
            showCancel: false,
        })
        if (res.confirm) {
            await uni.reLaunch({
                url: "/pages/index/index"
            })
        }
    } catch (err) {
        console.error(err);
    }
}