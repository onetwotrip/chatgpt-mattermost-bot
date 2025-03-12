// @ts-ignore
import PromiseBB from 'bluebird';
import Log from "debug-level"
const log = new Log('adapter')
import { ObjectId } from 'mongodb';

class Adapter {
	collection: any;
	req: any;
	log: any;
	mongo: any;

	constructor(req: any) {
		this.req = req;
		this.log = log;
	}
	// ----------------- mongo ----------------

	async add(data: any) {
		return this.collection.insertOne(data);
	}

	async update(data: any, newData: any, upsert = false) {
		if (data?._id && typeof data?._id !== 'object') {
			data._id = new ObjectId(data?._id);
		}

		return this.collection.updateOne(data, { $set: newData }, { upsert });
	}

	async getAll(
		req: any,
		options: {
			projection?: any;
			sort?: any;
			limit?: number;
			skip?: number;
		} = {},
	) {
		return this.collection
			.find(req, {
				projection: options.projection || undefined,
				sort: options.sort === null ? undefined : options.sort || 'assignment',
				limit: options.limit || 20000,
				skip: options.skip || 0,
			})
			.toArray();
	}

	async get(req: any, projection: any) {
		const optsFind: {
			projection?: any;
		} = {};

		if (projection) {
			optsFind.projection = projection;
		}

		return this.collection.findOne(req, optsFind);
	}

	async count(req: any) {
		return this.collection.count(req);
	}

	async dropAll() {
		return this.collection.drop();
	}

	async remove(params: any, justOne = true) {
		const nameMethod = justOne ? 'deleteOne' : 'deleteMany';
		return this.collection[nameMethod](params);
	}

	async aggregate(req: any) {
		const agg = this.collection.aggregate(req);

		return PromiseBB.promisify(agg.toArray, { context: agg })();
	}
}
export default Adapter;
