import "../Style/HeroSection.css"
const HeroSection = () => {
    return (
        <div id="hero">
    
           <img className="banner" src="../1.png" alt="" />

     

           <div className="hero-icons-left" >
            <i className="fa-solid fa-chevron-left fa-fade fa-xl" ></i>

            </div>
            <div className="hero-icons-right"  >
            <i className="fa-solid fa-chevron-right fa-fade fa-xl" ></i>
            </div>


    
        </div>
    );
}

export default HeroSection;