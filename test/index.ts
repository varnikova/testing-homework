export const BASEURL = 'http://localhost:3000/hw/store'
export const BASENAME = '/hw/store'

export function getPageUrl(route: string, bugId?: number, baseurl?: string) {
	return `${baseurl ?? BASEURL}${route}${bugId ? `?bug_id=${bugId}` : ''}`
}
