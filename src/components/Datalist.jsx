import React from "react";
import './Datalist.css'

function Datalist({data,handleClose}) {
  console.log(data);
  return (
    <div>
      <datalist >
        <select multiple size>
          {
            data.map((item)=>{
              return(
                <option onClick={()=>handleClose(item)} value="Atom">{item.Name}</option>
              )
            })
          }
      
        
        </select>
      </datalist>
    </div>
  );
}

export default Datalist;
