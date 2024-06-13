import HeroSection from '../Components/HeroSection';
import Category from '../Components/Category';
import HomeProductCard from '../Components/HomeProductCard';
import Testimonial from '../Components/Testimonial';




const Home = () => {


    return <div  className="main-content min-h-screen" >
       

       <HeroSection />
    
       <Category />
       <HomeProductCard />
       {/* <Track /> */}
       {/* <Testimonial /> */}
    </div>;

};


export default Home;

