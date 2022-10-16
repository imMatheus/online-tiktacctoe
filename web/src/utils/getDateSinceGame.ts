export function getDateSinceGame(date: Date) {
    console.log(typeof date)

    const then = new Date(date)
    const now = new Date()
    const sDiff = Math.round(Math.abs(now.getTime() - then.getTime()) / 1000)
    const mDiff = Math.floor(sDiff / 60)
    const hDiff = Math.floor(mDiff / 60)
    const dDiff = Math.floor(hDiff / 24)

    if (sDiff < 10) return `just now!`
    if (sDiff < 60) return `${sDiff}secs ago`
    if (mDiff < 60) return `${mDiff}mins ago`

    return `sDiff: ${sDiff} - m: ${mDiff} - hDiff: ${hDiff} -  dDiff: ${dDiff}`

    // return diff
}
