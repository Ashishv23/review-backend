import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {

    // POST review api
    static async apiPostReviews(req, res, next){
        try {
            const movieId = parseInt(req.body.movieId);
            const review = req.body.review;
            const user = req.body.user;

            console.log(movieId,review,user);

            const reviewResponse = await ReviewsDAO.addReview(movieId, review, user);
            res.json({status: "success"});
        } catch (e) {
            res.status(500).json({ 
                error: e
            });
        }   
    }

    // GET review on specific id api
    static async apiGetReview(req, res, next){
        try {
            console.log(req.params);
            let id = req.params.id || {};
            let review = await ReviewsDAO.getReviews(id);
            if (!review) {
                res.status(404).json(
                    {
                        error: "Not found",
                    }
                );
            }

            res.json(review);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ 
                error: e.message
            });
        }   
    }

    // PUT api to update specific review using id
    static async apiUpdateReview(req, res, next){
        try {
            const reviewId = req.params.id;
            const review = req.body.review;
            const user = req.body.user;

            // Update review function
            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                user,
                review
            );        
            
            // Error prevention 
            var { error } = reviewResponse;
            if (error) {
                res.status(400).json({error});
            }

            if (reviewResponse.modifiedCount === 0) {
                throw new Error("Unable to update review");
            }

            // return sucess if no error
            res.json({status: "success"});
        } catch (e) {
            res.status(500).json({ 
                error: e.message
            });
        }   
    }

    // Delete review from specific id api
    static async apiDeleteReview(req, res, next){
        try {
            const reviewId = req.params.id;
            
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId);
            res.json({
                status: "Success"
            });
        } catch (e) {
            res.status(500).json({ 
                error: e.message
            });
        }   
    }

    // Get all reviews
    static async apiGetReviews( req, res, next) {
        try {
            let id = req.params.id || {};
            let reviews = await ReviewsDAO.getReviewsByMoviesId(id);
            if (!reviews) {
                res.status(404).json({error: "Not found"});
                return
            }
            res.json(reviews);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ 
                error: e.message
            });
        }
    }

}