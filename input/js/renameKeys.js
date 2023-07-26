export default function renameKeys(obj = { id: '1', name: 'Alex' }, newKeys = { id: 'key', name: 'value' }) {
	const keyValues = Object.keys(obj).map((key) => {
		const newKey = newKeys[key] || key
		return { [newKey]: obj[key] }
	})
	return Object.assign({}, ...keyValues)
}
