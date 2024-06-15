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

        const isDragging = useRef(false);
        const startX = useRef(0);
        const scrollLeft = useRef(0);

        const handleMouseDown = (e) => {
            if (window.innerWidth <= 1100) {
                isDragging.current = true;
                startX.current = e.pageX - containerRef.current.offsetLeft;
                scrollLeft.current = containerRef.current.scrollLeft;
                containerRef.current.style.cursor = 'grabbing';
            }
        };

        const handleMouseLeave = () => {
            if (window.innerWidth <= 1100) {
                isDragging.current = false;
                containerRef.current.style.cursor = 'grab';
            }
        };

        const handleMouseUp = () => {
            if (window.innerWidth <= 1100) {
                isDragging.current = false;
                containerRef.current.style.cursor = 'grab';
            }
        };

        const handleMouseMove = (e) => {
            if (!isDragging.current) return;
            e.preventDefault();
            const x = e.pageX - containerRef.current.offsetLeft;
            const walk = (x - startX.current) * 2; // Scroll faster
            containerRef.current.scrollLeft = scrollLeft.current - walk;
        };

        const handleTouchStart = (e) => {
            startX.current = e.touches[0].pageX - containerRef.current.offsetLeft;
            scrollLeft.current = containerRef.current.scrollLeft;
        };

        const handleTouchMove = (e) => {
            if (!startX.current) return;
            const x = e.touches[0].pageX - containerRef.current.offsetLeft;
            const walk = (x - startX.current) * 2; // Scroll faster
            containerRef.current.scrollLeft = scrollLeft.current - walk;
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
                    <div key={index} onClick={() => navigate(`/category/${item.name}`)} className="category-container">
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
