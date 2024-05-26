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

export function apiRating(data: UserRatingRequestData) {
    return request({
        url: "/setupScore", method: "GET", data
    } as UserRatingRequest)
}

export function apiDownload(data: WallPaperDownloadRequestData) {
    return request({
        url: "/downloadWall", method: "GET", data
    } as WallPaperDownloadRequest)
}

export function apiDetailWall(data: WallpaperDetailRequestData) {
    return request({
        url: "/detailWall", method: "GET", data
    } as WallpaperDetailRequest)
}

export function apiGetUserInfo() {
    return request({
        url: "/userInfo", method: "GET"
    } as UserInfoDataRequest)
}