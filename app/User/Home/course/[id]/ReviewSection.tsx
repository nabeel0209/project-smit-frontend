// app/User/Home/course/[id]/ReviewSection.tsx
"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

const SAMPLE_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Michael Chen",
    avatar: "https://i.pravatar.cc/64?img=33",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Really well structured course. The instructor explains concepts clearly and the pacing felt right for someone new to the topic.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    avatar: "https://i.pravatar.cc/64?img=47",
    rating: 4,
    date: "1 month ago",
    comment:
      "Solid content overall. Would've liked a bit more depth in the advanced sections, but great value for the price.",
  },
];

export default function ReviewSection({
  courseRating,
}: {
  courseRating: number;
}) {
  const [reviews, setReviews] = useState<Review[]>(SAMPLE_REVIEWS);
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRating === 0 || comment.trim() === "") return;

    const newReview: Review = {
      id: Date.now(),
      name: "You",
      avatar: "https://i.pravatar.cc/64?img=68",
      rating: newRating,
      date: "Just now",
      comment: comment.trim(),
    };

    setReviews([newReview, ...reviews]);
    setNewRating(0);
    setComment("");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-text">Student reviews</h2>
        <span className="inline-flex items-center gap-1.5 text-sm text-text-muted">
          <Star size={15} className="fill-amber-400 text-amber-400" />
          <span className="font-semibold text-text">{courseRating}</span>
          average rating
        </span>
      </div>

      {/* Add review form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-border-soft rounded-2xl p-6 mb-6"
      >
        <h3 className="font-semibold text-text mb-4">Write a review</h3>

        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => {
            const starValue = i + 1;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setNewRating(starValue)}
                onMouseEnter={() => setHoverRating(starValue)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  size={24}
                  className={
                    starValue <= (hoverRating || newRating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-border-soft text-border-soft"
                  }
                />
              </button>
            );
          })}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this course..."
          rows={3}
          className="w-full bg-surface border border-border-soft rounded-xl p-3.5 text-sm text-text placeholder:text-text-muted outline-none focus:border-primary transition-colors resize-none"
        />

        <button
          type="submit"
          disabled={newRating === 0 || comment.trim() === ""}
          className="mt-4 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
        >
          Submit review
        </button>
      </form>

      {/* Review list */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white border border-border-soft rounded-2xl p-6"
          >
            <div className="flex items-start gap-3">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <span className="font-semibold text-text text-sm">
                    {review.name}
                  </span>
                  <span className="text-xs text-text-muted">{review.date}</span>
                </div>
                <div className="flex items-center gap-0.5 mt-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={
                        i < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-border-soft text-border-soft"
                      }
                    />
                  ))}
                </div>
                <p className="text-sm text-text-muted leading-relaxed">
                  {review.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
