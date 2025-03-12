interface Options {
	concurrency?: number;
}

async function PromiseMap(iterable: any, mapper: any, options: Options = {}) {
	let concurrency = options.concurrency || Infinity;

	let index = 0;
	const results: any[] = [];
	const pending: any[] = [];
	const iterator = iterable[Symbol.iterator]();

	while (concurrency-- > 0) {
		const thread = wrappedMapper();
		if (thread) pending.push(thread);
		else break;
	}

	await Promise.all(pending);
	return results;

	function wrappedMapper(): any {
		const next = iterator.next();
		if (next.done) return null;

		const i = index++;
		const mapped = mapper(next.value, i);
		return Promise.resolve(mapped).then((resolved) => {
			results[i] = resolved;
			return wrappedMapper();
		});
	}
}

// Do not change till we will migrate all files to typescript
export default PromiseMap;
