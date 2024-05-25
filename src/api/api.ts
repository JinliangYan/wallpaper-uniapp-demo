import {request} from "@/utils/request"

export function apiGetBanner() {
    return request({
        method: "GET", url: "/homeBanner"
    } as HomeBannerRequest)
}

export function apiGetDayRandom() {
    return request({
        method: "GET", url: "/randomWall",
    } as RandomWallpapersRequest)
}

export function apiGetNotice(data: NewsRequestData) {
    return request({
        url: "/wallNewsList", data
    } as NewsRequest)
}

export function apiGetClassify(data: WallpaperCategoryRequestData) {
    return request({
        url: "/classify", method: "GET", data
    } as WallpaperCategoryRequest)
}

export function apiGetClassList(data: WallListRequestData) {
    return request({
        url: "/wallList", method: "GET", data
    } as WallListRequest)
}