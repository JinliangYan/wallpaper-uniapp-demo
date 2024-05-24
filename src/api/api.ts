import {request} from "@/utils/request"

export function apiGetBanner() {
    return request({
        url: "/homeBanner",
        method:"GET",
        header: {

        }
    })
}


export function apiGetDayRandom() {
    return request({
        url:"/randomWall",
        method:"GET",
        header: {

        }
    })
}

export function apiGetNotice(data={}) {
    return request({url:"/wallNewsList", data})
}

export function apiGetClassify(data={}) {
    return request({url:"/classify",method:"GET", data})
}

export function apiGetClassList(data={}) {
    return request({url:"/wallList",method:"GET", data})
}