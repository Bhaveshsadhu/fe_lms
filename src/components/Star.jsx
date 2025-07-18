// src/components/Star.jsx
import React from 'react';
import { Star as StarIcon, Star as StarIconFill } from 'lucide-react';

const Star = ({ filled }) => {
    return filled
        ? <StarIconFill fill="currentColor" stroke="none" size={20} />
        : <StarIcon fill="none" stroke="currentColor" size={20} />;
};

export default Star;
