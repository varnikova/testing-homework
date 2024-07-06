export const BASEURL = 'http://localhost:3000/hw/store'
export const BASENAME = '/hw/store'

export function getPageUrl(route: string, baseurl?: string) {
	const bug_id = process.env.BUG_ID

	return `${baseurl ?? BASEURL}${route}${bug_id ? `?bug_id=${bug_id}` : ''}`
}
