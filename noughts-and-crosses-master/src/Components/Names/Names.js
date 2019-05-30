import React from "react"
import "./Names.css"

export default ({ name, value, handleChange, target, showing }) => {
    if(showing===false){
    return (
        <div className="Names">
            Player {name}: 
            <input name={target} value={value} onChange={handleChange}/>
            <p></p>
        </div>
    )
    }
    return null
}