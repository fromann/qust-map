// 增加touch事件监听
let lastX, lastY       // 上次屏幕位置
let curX, curY         // 当前屏幕位置
const factor = 1 / 10  // 灵敏系数

const $wrap = document.querySelector('#wrap')
// 触摸开始
$wrap.addEventListener('touchstart', function (evt) {
    const obj = evt.targetTouches[0] // 选择第一个触摸点
    startX = lastX = obj.clientX
    startY = lastY = obj.clientY
})

// 触摸中
$wrap.addEventListener('touchmove', function (evt) {
    evt.preventDefault()
    const obj = evt.targetTouches[0]
    curX = obj.clientX
    curY = obj.clientY

    // 参考：弧长公式
    lon -= ((curX - lastX) / radius) * factor // factor为了全景旋转平稳，乘以一个灵敏系数
    lat += ((curY - lastY) / radius) * factor

    lastX = curX
    lastY = curY
})
