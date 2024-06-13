import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import "../Style/Category.css";

const category = [
    { image: 'pump-6.jpg', name: 'Standee Display' },
    { image: './92-mm-fam-grill.jpg', name: 'Cooling Accs' },
    { image: './images-6.jpeg', name: 'Water Block' },
    { image: './led-display.jpg', name: 'LED-Bord Profiles' },
    { image: './pipe-4.jpg', name: 'Condenser ' },
    { image: './80-40-2.jpeg', name: 'Aquarium Chiller' }
];

const Category = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);

    let startX = 0;
    let scrollLeft = 0;
    let isDown = false;

    const handleMouseDown = (e) => {
        isDown = true;
        startX = e.pageX - containerRef.current.offsetLeft;
        scrollLeft = containerRef.current.scrollLeft;
        containerRef.current.style.cursor = 'grabbing';
    };

    const handleMouseLeave = () => {
        isDown = false;
        containerRef.current.style.cursor = 'grab';
    };

    const handleMouseUp = () => {
        isDown = false;
        containerRef.current.style.cursor = 'grab';
    };

    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll faster
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchStart = (e) => {
        startX = e.touches[0].pageX - containerRef.current.offsetLeft;
        scrollLeft = containerRef.current.scrollLeft;
    };

    const handleTouchMove = (e) => {
        const x = e.touches[0].pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll faster
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div 
            className="home-category"
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            {category.map((item, index) => (
                <div key={index} onClick={() => navigate(`/category/${item.name}`)}a className="category-container">
                    <div className="category-imgs" >
                        <img src={item.image} alt={item.name} />
                    </div>
                    <div className="category-imgs-hover"></div>
                    <h1 className='category-names'>{item.name}</h1>
                </div>
            ))}
        </div>
    );
}

export default Category;
