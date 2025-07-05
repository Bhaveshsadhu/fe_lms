import React from 'react';
import illustration from '@/assets/illustration.png';

export default function AboutUs() {
    return (

        <section className="container py-2">
            <div className="row align-items-center gy-4">
                {/* Illustration */}
                <div className="col-md-6 order-md-2 text-center">
                    <img
                        src={illustration}
                        alt="Person reading on a laptop in front of screen"
                        className="img-fluid"
                    />
                </div>

                {/* Content */}
                <div className="col-md-6 order-md-1">
                    {/* Pretitle + underline via border utilities */}
                    <div className="d-inline-block mb-3 pb-1 border-bottom border-2 border-danger">
                        <small className="aboutus-title text-uppercase fw-bold">About Us</small>
                    </div>

                    {/* Title */}
                    <h2 className="aboutus-title fw-bold display-6 mb-4">
                        Get To Know Us
                    </h2>

                    {/* Copy */}
                    <p className="mb-3">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus dolores dolorem repellendus sunt odit debitis illo mollitia, pariatur excepturi commodi explicabo placeat modi libero similique?
                    </p>
                    <p className="mb-4">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis provident incidunt atque est, assumenda architecto veritatis voluptatibus distinctio dolor id nisi quas exercitationem repudiandae minima accusamus illum at vel deleniti quod officia facilis! Eos accusantium voluptate voluptas ex voluptatum inventore provident consectetur et necessitatibus! Neque quisquam placeat ex veniam! Itaque nesciunt veniam ratione mollitia omnis rerum est similique quasi, reprehenderit minima ex sequi tenetur ab obcaecati! Nihil, consequatur animi. Distinctio ea doloribus accusamus? Minima eos quam nobis ipsa ipsam unde iusto! Cum in, dolorum quasi assumenda quo incidunt perspiciatis ullam perferendis iure amet quis tenetur, aliquid minima ipsam ex rem?
                    </p>

                    {/* Buttons */}
                    <a href="#learn-more" className="btn button-color me-2">
                        Learn More&nbsp;→
                    </a>
                    <a href="#book-demo" className="btn button-color">
                        Book A Demo&nbsp;→
                    </a>
                </div>
            </div>
        </section>
    );
}
