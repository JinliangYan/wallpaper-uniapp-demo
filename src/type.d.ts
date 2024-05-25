// src/types.d.ts

/**
 * 基础请求接口类型
 */
interface WallPaperRequest {
    /** 请求的URL */
    url: string;
    /** 请求方法 */
    method?: "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
    /** 请求数据 */
    data?: object;
    /** 请求头 */
    headers?: {
        /** 验证秘钥 */
        'access-key': string;
        /** 允许更多自定义头部字段 */
        [key: string]: string;
    };
}

/**
 * 基础响应数据接口
 */
interface WallPaperData {
    /** 数据的唯一标识符 */
    _id: string;
}

/**
 * 基础响应接口类型
 */
interface WallPaperResponse {
    /** 错误代码 */
    errCode: number;
    /** 错误消息 */
    errMsg: string;
    /** 请求耗时 */
    timeCost: number;
    /** 可选的响应数据 */
    data?: WallPaperData;
}

/**
 * 首页海报请求的参数类型
 */
declare interface HomeBannerRequestData {
    /** 页码 */
    pageNumber?: number;
    /** 每页的数量 */
    pageSize?: number;
}

/**
 * 首页海报请求类型
 */
declare interface HomeBannerRequest extends WallPaperRequest {
    /** 请求的URL */
    url: "/homeBanner";
    /** 请求的方法 */
    method: "GET";
    /** 请求的数据 */
    data?: HomeBannerRequestData;
}

/**
 * 首页海报数据接口类型
 */
declare interface HomeBannerData extends WallPaperData {
    /** 海报的URL */
    url: string;
    /** 排序 */
    sort: number;
    /** 图片URL */
    picurl: string;
    /** 目标 */
    target: string;
    /** 可选的小程序ID */
    appid: string;
}

/**
 * 首页海报响应接口类型
 */
declare interface HomeBannerResponse extends WallPaperResponse {
    /** 首页海报数据 */
    data: HomeBannerData[];
}

/**
 * 壁纸分类请求的参数类型
 */
declare interface WallpaperCategoryRequestData {
    /** 页码 */
    pageNum?: number;
    /** 每页的数量 */
    pageSize?: number;
    /** 是否搜索 */
    search?: boolean;
}

/**
 * 壁纸分类请求类型
 */
declare interface WallpaperCategoryRequest extends WallPaperRequest {
    /** 请求的URL */
    url: "/classify";
    /** 请求的方法 */
    method: "GET";
    /** 请求的数据 */
    data?: WallpaperCategoryRequestData;
}

/**
 * 壁纸分类数据接口类型
 */
declare interface WallpaperCategoryData extends WallPaperData {
    /** 分类名称 */
    name: string;
    /** 排序 */
    sort: number;
    /** 图片URL */
    picurl: string;
    /** 是否为推荐内容 */
    select: boolean;
    /** 更新时间 */
    updateTime: Date;
}

/**
 * 壁纸分类响应接口类型
 */
declare interface WallpaperCategoryResponse extends WallPaperResponse {
    /** 壁纸分类数据 */
    data: WallpaperCategoryData[];
}

/**
 * 单个壁纸详情请求的参数类型
 */
declare interface WallpaperDetailRequestData {
    /** 壁纸ID */
    id: string;
}

/**
 * 单个壁纸详情请求类型
 */
declare interface WallpaperDetailRequest extends WallPaperRequest {
    /** 请求的URL */
    url: "/detailWall";
    /** 请求的方法 */
    method: "GET";
    /** 请求的数据 */
    data: WallpaperDetailRequestData;
}

/**
 * 单个壁纸详情数据接口类型
 */
declare interface WallpaperDetailData extends WallPaperData {
    /** 描述 */
    description: string;
    /** 分类ID */
    classid: string;
    /** 小图URL */
    smallPicurl: string;
    /** 标签数组 */
    tabs: string[];
    /** 评分 */
    score: number;
    /** 用户评分 */
    userScore?: number;
    /** 昵称 */
    nickname: string;
}

/**
 * 单个壁纸详情响应接口类型
 */
declare interface WallpaperDetailResponse extends WallPaperResponse {
    /** 壁纸详情数据 */
    data: WallpaperDetailData[];
}

/**
 * 壁纸分类列表请求的参数类型
 */
declare interface WallListRequestData {
    /** 分类ID */
    classid: string;
    /** 页码 */
    pageNum?: number;
    /** 每页的数量 */
    pageSize?: number;
}

/**
 * 壁纸分类列表请求类型
 */
declare interface WallListRequest extends WallPaperRequest {
    /** 请求的URL */
    url: "/wallList";
    /** 请求的方法 */
    method: "GET";
    /** 请求的数据 */
    data: WallListRequestData;
}

/**
 * 壁纸分类列表数据接口类型
 */
declare interface WallListDetailData extends WallpaperDetailData {
}

/**
 * 壁纸分类列表响应接口类型
 */
declare interface WallListDetailResponse extends WallPaperResponse {
    /** 总数量 */
    total: number;
    /** 壁纸分类列表数据 */
    data: WallListDetailData[];
}

/**
 * 用户评分请求的参数类型
 */
declare interface UserRatingRequestData {
    /** 分类ID */
    classid: string;
    /** 壁纸ID */
    wallId: string;
    /** 用户评分 */
    userScore: string;
}

/**
 * 用户评分请求类型
 */
declare interface UserRatingRequest extends WallPaperRequest {
    /** 请求的URL */
    url: "/setupScore";
    /** 请求的方法 */
    method: "GET";
    /** 请求的数据 */
    data: UserRatingRequestData;
}

/**
 * 用户评分响应接口类型
 */
declare interface UserRatingResponse extends WallPaperResponse {
}

/**
 * 随机9张壁纸请求类型
 */
declare interface RandomWallpapersRequest extends WallPaperRequest {
    /** 请求的URL */
    url: "/randomWall";
    /** 请求的方法 */
    method: "GET";
}

/**
 * 随机9张壁纸数据接口类型
 */
declare interface RandomWallpapersData extends WallpaperDetailData {
}

/**
 * 随机9张壁纸响应接口类型
 */
declare interface RandomWallpapersResponse extends WallPaperResponse {
    /** 随机9张壁纸数据 */
    data: RandomWallpapersData[];
}

/**
 * 壁纸下载请求的参数类型
 */
declare interface WallPaperDownloadRequestData {
    /** 分类ID */
    classid: string;
    /** 壁纸ID */
    wallId: string;
}

/**
 * 壁纸下载请求类型
 */
declare interface WallPaperDownloadRequest extends WallPaperRequest {
    /** 请求的URL */
    url: "/downloadWall";
    /** 请求的方法 */
    method: "GET";
    /** 请求的数据 */
    data: WallPaperDownloadRequestData;
}

/**
 * 壁纸下载数据接口类型
 */
declare interface WallPaperDownloadData extends WallPaperData {
}

/**
 * 壁纸下载响应接口类型
 */
declare interface WallPaperDownloadResponse extends WallPaperResponse {
    /** 壁纸下载数据 */
    data: WallPaperDownloadData;
}

/**
 * 地址信息接口类型
 */
interface Address {
    /** 地址 */
    address: string;
    /** 省份 */
    province: string;
    /** 城市 */
    city: string;
}

/**
 * 户个人信息请求类型
 */
declare interface WallPaperDownloadRequest extends WallPaperRequest {
    /** 请求的URL */
    url: "/userInfo";
    /** 请求的方法 */
    method: "GET";
}

/**
 * 用户个人信息数据接口类型
 */
declare interface UserInfoData extends WallPaperData {
    /** IP 地址 */
    IP: string;
    /** 下载数量 */
    downloadSize: number;
    /** 评分数量 */
    scoreSize: number;
    /** 地址信息 */
    address: Address;
}

/**
 * 用户个人信息响应接口类型
 */
declare interface UserInfoResponse extends WallPaperResponse {
    /** 用户个人信息数据 */
    data: UserInfoData;
}

/**
 * 壁纸资讯公告列表请求的参数类型
 */
declare interface NewsRequestData {
    /** 是否为推荐内容 */
    select: boolean;
    /** 页码 */
    pageNum: number;
    /** 每页的数量 */
    pageSize: number;
}

/**
 * 壁纸资讯公告列表请求类型
 */
declare interface NewsRequest extends WallPaperRequest {
    /** 请求的URL */
    url: "/wallNewsList";
    /** 请求的方法 */
    method: "GET";
    /** 请求的数据 */
    data: NewsRequestData;
}

/**
 * 壁纸资讯公告列表数据接口类型
 */
declare interface NewsData extends WallPaperData {
    /** 浏览数量 */
    view_count: number;
    /** 发布时间 */
    publish_date: Date;
    /** 标题 */
    title: string;
    /** 作者 */
    author: string;
    /** 是否为推荐内容 */
    select: boolean;
}

/**
 * 壁纸资讯公告列表响应接口类型
 */
declare interface NewsResponse extends WallPaperResponse {
    /** 壁纸资讯公告列表数据 */
    data: NewsData[];
}

/**
 * 壁纸资讯公告详情请求的参数类型
 */
declare interface NewsDetailRequestData {
    /** 资讯ID */
    id: string;
}

/**
 * 壁纸资讯公告详情请求类型
 */
declare interface NewsDetailRequest extends WallPaperRequest {
    /** 请求的URL */
    url: "/wallNewsDetail";
    /** 请求的方法 */
    method: "GET";
    /** 请求的数据 */
    data: NewsDetailRequestData;
}

/**
 * 壁纸资讯公告详情数据接口类型
 */
declare interface NewsDetailData extends NewsData {
    /** 文章状态 */
    article_status: 0 | 1;
}

/**
 * 壁纸资讯公告详情响应接口类型
 */
declare interface NewsDetailResponse extends WallPaperResponse {
    /** 壁纸资讯公告详情数据 */
    data: NewsDetailData;
}

/**
 * 搜索壁纸请求的参数类型
 */
declare interface WallPaperSearchRequestData {
    /** 关键字 */
    keyword: string;
    /** 页码 */
    pageNum?: number;
    /** 每页的数量 */
    pageSize?: number;
}

/**
 * 搜索壁纸请求类型
 */
declare interface WallPaperSearchRequest extends WallPaperRequest {
    /** 请求的URL */
    url: "/searchWall";
    /** 请求的方法 */
    method: "GET";
    /** 请求的数据 */
    data: WallPaperSearchRequestData;
}

/**
 * 搜索壁纸数据接口类型
 */
declare interface WallPaperSearchData extends WallpaperDetailData {
}

/**
 * 搜索壁纸响应接口类型
 */
declare interface WallPaperSearchResponse extends WallPaperResponse {
    /** 搜索壁纸数据 */
    data: WallPaperSearchData[];
}
