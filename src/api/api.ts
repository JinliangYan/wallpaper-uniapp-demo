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