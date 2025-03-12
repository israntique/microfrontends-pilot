import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSubmitMessage('Thanks for your message! We will contact you soon.');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setSubmitMessage('Sorry, there was an error submitting your form.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            
            <div className="contact-info">
                <div className="info-item">
                    <h3>Address</h3>
                    <p>123 Main Street, Suite 100</p>
                    <p>Anytown, USA 12345</p>
                </div>
                
                <div className="info-item">
                    <h3>Phone</h3>
                    <p>(555) 123-4567</p>
                </div>
                
                <div className="info-item">
                    <h3>Email</h3>
                    <p>info@example.com</p>
                </div>
            </div>
            
            <div className="contact-form">
                <h2>Send us a message</h2>
                {submitMessage && <div className="submit-message">{submitMessage}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="5"
                            required
                        />
                    </div>
                    
                    <button type="submit" disabled={submitting}>
                        {submitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;