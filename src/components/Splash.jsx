import "../styles/splash.css";
import logo from "../assets/logo.png";
import hero from "../assets/hero1.jpg";

function Splash() {
  return (
    <div className="splash">
      <img src={hero} alt="" className="splash-bg" />

      <div className="splash-overlay">
        <img src={logo} alt="jelena webstudio" className="splash-logo" />
      </div>
    </div>
  );
}

export default Splash;
