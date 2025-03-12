import Model from '../models/model';

class Prompts extends Model {
	constructor(req: any, storage: any) {
		super(req, storage, 'getPrompts');
	}
}

export default Prompts;
