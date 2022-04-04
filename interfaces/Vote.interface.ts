import { Schema } from 'mongoose';

interface Vote {
	userRef: Schema.Types.Array;
	postAndCommentRef: Schema.Types.Array;
	type: Schema.Types.String;
	timestamp: Schema.Types.Date;
}

export default Vote;
