/**
 * 获取系统状态栏高度
 */
export function getStatusBarHeight() {
    const SYSTEM_INFO = uni.getSystemInfoSync()
    return SYSTEM_INFO.statusBarHeight || 15
}

/**
 * 获取胶囊按钮整体高度
 */
export function getTitleBarHeight() {
    if (uni.getMenuButtonBoundingClientRect) {
        const MENU_BUTTON = uni.getMenuButtonBoundingClientRect()
        const {top, height} = MENU_BUTTON
        return (top - getStatusBarHeight()) * 2 + height
    }
    return 40
}

/**
 * 获取导航栏高度 (状态栏高度 + 胶囊高度)
 */
export function getNavBarHeight() {
    return getStatusBarHeight() + getTitleBarHeight()
}
