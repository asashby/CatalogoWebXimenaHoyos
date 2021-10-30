import BaseHttpService from 'services/BaseHttpService';

interface PostComment {
	description: string;
	typeQuestionAnswer: number;
	rating: number;
}
class CommentService extends BaseHttpService {
	constructor() {
		super('https://products2.makipos.la/');
	}

	getComments = async (productId: number | string, hash: string) => {
		const URL = `question-answer/public?typeQuestionAnswer=3&productId=${productId}`;

		return this.get(URL, {
			headers: { Authorization: `Bearer ${hash}` }
		});
	};
	postComments = async (productId: number, comment: PostComment, hash: string, commerceSlug: string | string[]) => {
		const URL = `question-answer/${productId}/product`;
		const data = Object.assign({}, comment, { commerceSlug });
		const headers = {
			Authorization: `Bearer ${hash}`
		}
		return this.post(URL, data, { headers });
	}
}

export default CommentService;
