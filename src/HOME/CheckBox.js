import React, {useState} from 'react'




const CheckBox = ({categories, handleFilters}) =>{
        
        const [checked, setChecked] = useState([])
        const handleToggle = c =>() =>{

        const currentCategoryId = checked.indexOf(c)//return the index if found else it returns -1

        const newCheckedCategoryId = [...checked]

        if(currentCategoryId === -1){
                newCheckedCategoryId.push(c)
        }else{
                newCheckedCategoryId.splice(currentCategoryId, 1)
        }
                 

        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)

        }

        return(
           <>
            {categories.map((c, i)=>{

                return(
                                
                 <li className='list-unstyled'  key={i}>
                    <div class="form-check">
                    <input type="checkbox" onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} class="form-check-input" id="materialUnchecked" />
                    
                    <label class="form-check-label" for="materialUnchecked">{c.name}</label>
                    </div>
                    </li>

                            )
               
            })}
               </>
        )
    
}

export default CheckBox