import { Link } from "react-router-dom";
import useAppContext from "../components/useAppContext";


function Landing(){
    const {setNav} = useAppContext()
    setNav('landing')
    return(
        <div className="landing">
            <div className="lan-txt">
                <h1 className="lan-h1">
                    Don't Hide Your Programming Skills, <br/>
                    Show the World What You're Capable Of
                </h1>
                <p className="lan-p"> Showcase Your Project Here, we provide a platform for developers to share and showcase their amazing projects with the world. Whether you're a beginner or an experienced developer, our platform allows you to showcase your creativity, skills, and innovations to a global audience.</p>
            </div>
            <button className='p-btn gs' >Get Started</button>
        </div>
    )
}
export default Landing;