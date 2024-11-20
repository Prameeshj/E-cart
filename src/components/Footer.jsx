import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className=" bg-teal-600 text-white py-10 px-4 text-center md:text-left mt-[15%]">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* E cart Section */}
        <div>
          <h3 className="text-2xl font-bold mb-2 flex items-center">
            <span className="mr-2"><i className="fa-solid fa-truck-fast"></i></span> E cart
          </h3>
          <p>Designed and built with all the love in the world by the Luminar team with the help of our contributors.</p>
          <p>Code licensed Luminar, docs CC BY 3.0.</p>
          <p>Currently v5.3.2.</p>
        </div>
        
        {/* Links Section */}
        <div>
          <h3 className="text-xl font-bold mb-2">Links</h3>
          <ul>
            <li>Landing Page</li>
            <li>Home Page</li>
            <li>Watch History Page</li>
          </ul>
        </div>

        {/* Guides Section */}
        <div>
          <h3 className="text-xl font-bold mb-2">Guides</h3>
          <ul>
            <li>React</li>
            <li>React Bootstrap</li>
            <li>React Router</li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div>
          <h3 className="text-xl font-bold mb-2">Contact Us</h3>
          <div className="flex items-center mb-4">
            <input
              type="email"
              placeholder="Enter your email here"
              className="w-full py-2 px-4 rounded-l text-black"
            />
            <button className="bg-white text-purple-600 p-2 rounded-r">→</button>
          </div>
          <div className="flex space-x-4 justify-center md:justify-start">
            <span><Link><i className="fa-brands fa-twitter mr-12"></i> </Link></span>
            <span><Link><i className="fa-brands fa-instagram mr-12"></i> </Link></span>
            <span><Link><i className="fa-brands fa-facebook mr-12"></i> </Link></span>
            <span><Link><i className="fa-brands fa-linkedin mr-12"></i> </Link></span>
            <span><Link><i className="fa-solid fa-phone mr-12"></i></Link></span>
          </div>
        </div>
      </div>
      
      {/* Footer Bottom Text */}
      <p className="text-center mt-8">
        © July 2024 Batch, E Cart. Built with React Redux.
      </p>
    </div>
  );
};

export default Footer;
