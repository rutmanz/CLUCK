const appId = 'B393B2CE96A258A72BAB481CA'
const stopId = '5378'
export const ratelimit = 2 // seconds, trimet allows up to 1 million requests a day (BONKERS!) https://developer.trimet.org/why_an_appid.shtml
export const busSigns = ['20 Gresham TC', '20 Beaverton TC']

let cache = {}
let lastQueried = 0

async function queryArrivals(stopId: string) {
    const url = `https://developer.trimet.org/ws/v2/arrivals/?locIDs=${stopId}&appId=${appId}&json=true&arrivals=2`
    return await (await fetch(url)).json()
}

async function refetchArrivals() {
    const res = await queryArrivals(stopId)
    console.log(res)
    cache = res.resultSet.arrival.reduce(
        // credit https://dev.to/_bigblind/quick-tip-transform-an-array-into-an-object-using-reduce-2gh6
        (acc: any, post: any) => {
            let { shortSign, estimated, scheduled } = post
            if (!estimated) {
                estimated = scheduled
            }
            return { ...acc, [shortSign]: [...(acc[shortSign] || []), estimated] }
        },
        {}
    )
    lastQueried = Date.now()
}

export async function getArrivals() {
    if (lastQueried == 0) {
        await refetchArrivals()
    } else if (Date.now() - lastQueried > 1000 * ratelimit) {
        setTimeout(refetchArrivals)
    }
    return cache
}
