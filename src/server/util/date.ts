export function formatDate(dateArray: number[]): string {
	const [year, month, day, hour, minute, second, millisecond] = dateArray;
	const date = new Date(year, month - 1, day, hour, minute, second, millisecond);
	return date.toISOString();
}
