import React from 'react';

const About = () => {
    return (
        <div className="about-container">
            <h1>About Our Micro-Frontends Project</h1>
            
            <section>
                <h2>Our Mission</h2>
                <p>
                    Welcome to our micro-frontends pilot project. This initiative aims to demonstrate
                    how different frontend applications can work together seamlessly within a larger
                    architecture.
                </p>
            </section>
            
            <section>
                <h2>What are Micro-Frontends?</h2>
                <p>
                    Micro-frontends are an architectural style where independently deliverable
                    frontend applications are composed into a greater whole. This approach extends
                    the concepts of microservices to the frontend world.
                </p>
            </section>
            
            <section>
                <h2>Our Team</h2>
                <p>
                    Our team consists of passionate developers committed to exploring modern
                    frontend architectures and delivering high-quality user experiences.
                </p>
            </section>
        </div>
    );
};

export default About;