import mongoose from 'mongoose';

const dbConnect = (URI: string) => {
	return (() => {
		mongoose
			.connect(URI)
			.then((response) => {
				console.log(`\n===========Connected to "${response.connection.name}"===========\n`);
			})
			.catch((error) => {
				console.log('\n===========Failed to connect DB===========\n');
				console.log(error);
			});
	})();
};

export default dbConnect;
