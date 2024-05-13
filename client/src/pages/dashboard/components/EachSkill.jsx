import { useState } from "react"

function EachSkill({skill}){
    const [hover,setHover] = useState(false)
    return(
        <div onClick={()=>setHover(!hover)}  className="eachSkill ">
            <div className="img">
                <img className="es-logo" src={skill.url} alt="" /> 
            </div>
            {hover && 
                <div className="hover">

                    <h4>{skill.name.length != 0 && skill.name}</h4>
                    <p>{skill.desc.length != 0 && skill.desc}</p>
                    {skill.certification_url.length > 0 && <a href={skill.certification_url} target="_blank">Certification</a>}
                </div>
            }
        </div>
    )
}
export default EachSkill
