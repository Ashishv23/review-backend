import { ObjectId } from "mongodb";

let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return;
        }
        try {
            reviews = await conn.db("reviews").collection("reviews");
        } catch (e) {
            console.error(`Unable to establish collection handles in ReviewsDAO: ${e}`);
        }
    }

    static async addReview(movieId, review, user) {
        try {
            const reviewDoc = {
                movieId: movieId,
                review: review,
                user: user,
            };

            return await reviews.insertOne(reviewDoc);
        } catch (e) {
            console.error(`Unable to post review: ${e}`);
            return { error: e };
        }
    }

    static async getReviews(reviewId) {
        reviewId instanceof String;
        try {
            if (!ObjectId.isValid(reviewId)) {
                throw new Error("Invalid review ID");
            }
            return await reviews.findOne({ _id: new ObjectId(reviewId) });
        } catch (e) {
            console.error(`Unable to get review: ${e}`);
            return { error: e.message };
        }
    }

    static async updateReview(reviewId, user, review) {
        try {
            if (!ObjectId.isValid(reviewId)) {
                throw new Error("Invalid review ID");
            }
            const updateResponse = await reviews.updateOne(
                { _id: new ObjectId(reviewId) },
                { $set: { user: user, review: review } }
            );
            return updateResponse;
        } catch (e) {
            console.error(`Unable to update review: ${e}`);
            return { error: e.message };
        }
    }

    static async deleteReview(reviewId) {
        try {
            if (!ObjectId.isValid(reviewId)) {
                throw new Error("Invalid review ID");
            }
            const deleteResponse = await reviews.deleteOne({
                _id: new ObjectId(reviewId),
            });

            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete review: ${e}`);
            return { error: e.message };
        }
    }

    // get movie by movieId
    static async getReviewsByMoviesId(movieId) {
        try {
            const cursor = await reviews.find({
                movieId: parseInt(movieId),
            });

            return cursor.toArray();
        } catch (e) {
            console.error(`Unable to get reviews: ${e}`);
            return { error: e.message };
        }
    }
}
