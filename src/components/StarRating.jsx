// src/components/StarRating.jsx
import React from 'react';
import Star from './Star';

const StarRating = ({ rating = 0, maxStars = 5 }) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
        if (i <= fullStars) {
            stars.push(<Star key={i} filled={true} />);
        } else if (i === fullStars + 1 && hasHalf) {
            stars.push(
                <span key={i} className="relative inline-block">
                    <Star filled={true} />
                    <span className="absolute top-0 left-0 w-1/2 overflow-hidden">
                        <Star filled={false} />
                    </span>
                </span>
            );
        } else {
            stars.push(<Star key={i} filled={false} />);
        }
    }

    return <div className="flex space-x-1">{stars}</div>;
};

export default StarRating;
