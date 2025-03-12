import Log from "debug-level"
const log = new Log('model')

class Model {
	req: any;
	log: any;
	storage: any;
	method: any;
	requests: any;

	constructor(req: any, storage?: any, method?: any) {
		this.req = req;
		this.log = log;

		this.storage = storage;
		this.method = method;
	}

	async add(params: any) {
		const storageModel = this.storage[this.method]();
		return storageModel.add(params);
	}

	async remove(params: any, justOne?: any) {
		const storageModel = this.storage[this.method]();
		return storageModel.remove(params, justOne);
	}

	async getAll(params: any, options?: any) {
		const storageModel = this.storage[this.method]();

		return storageModel.getAll(params, options);
	}

	async get(params: any, projection?: any) {
		const storageModel = this.storage[this.method]();
		return storageModel.get(params, projection);
	}

	async aggregate(params: any) {
		const storageModel = this.storage[this.method]();
		return storageModel.aggregate(params);
	}

	async update(params: any, newData: any, upsert?: any) {
		const storageModel = this.storage[this.method]();
		return storageModel.update(params, newData, upsert);
	}
}

export default Model;
