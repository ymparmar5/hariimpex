import React from "react";
import "../Style/Contact.css";

const Contact = () => {
  return (
    <>             
      <p id='contact-top'>CONTACT US</p>
      <div id="main">
        <div id="contact-info">
          <p>&nbsp;&nbsp;<b>Phone:</b>  &nbsp;&nbsp;&nbsp;  &nbsp; +91 9765618860</p>
          <br />
          <p>&nbsp;&nbsp;<b>Email:</b>  &nbsp;&nbsp;&nbsp;  &nbsp; &nbsp; hariimpexonline@gmail.com</p>
          <br />
          <p>
            <b>Address:</b> &nbsp;&nbsp; 104/C Block, Orchid Green,<br />
            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;LP Savani Rd, Palanpur,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; Surat, 395009, Gujarat, India  <br />
          </p>
        </div>
        <div id="get-in-touch">
          <h3 className="title">Get In Touch</h3>
          <div id="form">
            <form>
              <div className="input">
                <label htmlFor="Fullname">Full Name</label>
                <input type="text" name="fullname" id="Fullname" />
              </div>
              <div className="input">
                <label htmlFor="Email">Email</label>
                <input type="email" name="email" id="Email" />
              </div>
              <div className="input">
                <label htmlFor="number">Number</label>
                <input type="phone" name="number" id="Number" />
              </div>
              <div className="input">
                <label htmlFor="message">Your Message</label>
                <input type="text" name="message" id="message" />
              </div>
              <button id="submit-btn" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <div id="map">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59534.130917562536!2d72.81454281764896!3d21.15704671409967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fcac731f069%3A0x41a3d12774b78d2c!2sHari%20Impex!5e0!3m2!1sen!2sin!4v1717589375095!5m2!1sen!2sin"  
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          id="map-iframe"
        ></iframe>
      </div>
    </>
  );
};

export default Contact;

