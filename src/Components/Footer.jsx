import { Link, NavLink } from "react-router-dom";
import "../Style/Footer.css"
const Footer = () => {
  return (
    <>

    <footer>  

      <div className="footer-menu"> <h3 className="footer-heading" > ABOUT US</h3>
        <ul>
          <p>
          Founded in 2010, we began our journey with a simple vision: to revolutionize the standee manufacturing industry by delivering high-quality, innovative products.
          </p>
        </ul></div>


      <div className="footer-menu">
        <h3 className="footer-heading" >
          IMPORTANT LINKS

        </h3>
        <ul>

          <a href={"/privacy" } >
          <li>Privacy policy</li>
          </a>
          <a href={"/tandc"} ><li>Terms and condition</li>
          </a>
          <a href={"/about"}>   <li>About</li>
          </a>
          <a href={"./shop"}>
          <li  >Manufactures</li>
          </a>
          <a href={"./user-dashboard"} >
          <li>Track orders</li>
          </a>
       
          
         
          
        </ul>
      </div>

      <div className="footer-menu">
        <h3 className="footer-heading" >        MY ACCOUNTS

        </h3>

        <ul>
          <li>Sign Up</li>
          <li>Login</li>
          <li>Cart</li>
          <li>wish list</li>
          <li>My account</li>

        </ul></div>
      <div className="footer-menu">
        <h3 className="footer-heading" >
          NEWS LETTERS
        </h3>
        <div id="footer-icons">
          <a href="/"> <i className="footer-icons  fa-xl fa-brands fa-telegram"></i></a>
          <a href="/"> <i className="footer-icons  fa-xl fa-solid fa-envelope"></i></a>
          <a href="/"> <i className="footer-icons  fa-xl fa-brands fa-instagram"></i></a>
          <a href="/"> <i className="footer-icons  fa-xl fa-solid fa-location-dot"></i></a>

        
         </div>
        <div id="footer-icons">
         <a href="/"> <i className="footer-icons  fa-xl fa-brands fa-facebook  "></i> </a>
         <a href="/"> <i className="footer-icons  fa-xl fa-brands fa-linkedin"></i> </a>
         <a href="/"> <i className="footer-icons  fa-xl fa-brands fa-whatsapp"></i> </a>
         <a href="/"> <i className="footer-icons  fa-xl fa-brands fa-youtube"></i> </a>

        </div>

      </div>
          </footer>
<div id="madeby" >
  <h1>Made by Y.M.PARMAR</h1>
</div>
          </>
  
  );
}

export default Footer;