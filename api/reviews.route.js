import express from "express";
import ReviewsController from "./reviews.controller.js"

const router = express.Router();

router.route("/movie/:id").get(ReviewsController.apiGetReviews);
router.route("/new").post(ReviewsController.apiPostReviews);
router.route("/:id")
        .get(ReviewsController.apiGetReview)
        .put(ReviewsController.apiUpdateReview)
        .delete(ReviewsController.apiDeleteReview)

export default router;