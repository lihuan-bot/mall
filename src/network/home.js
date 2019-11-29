import{ request } from "./request"

export function gerHomeMultidata() {
 return request({
    url: '/home/multidata'
 })
}