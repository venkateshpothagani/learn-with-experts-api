interface Post {
	id?: string;
	userId: string;
	type: 'post' | 'question';
	description: string;
	upvoteCount?: number;
	downvoteCount?: number;
	timestamp: number;
}

export default Post;
