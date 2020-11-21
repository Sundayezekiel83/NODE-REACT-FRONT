import React,{useState, useEffect} from 'react'


const Radio = ({prices, handleFilters}) =>{

    const [price, setPrices] = useState([])

    const handleChange = (e) =>{
        setPrices(e.target.value)
        handleFilters(e.target.value)
    }

    return(

        <>
        {prices.map((p, i)=>{
            return (
                <div class="form-check">
                    <input type="radio" key={i} name={p} class="form-check-input" onChange={handleChange} value={p._id} id="materialUnchecked" />
                    <label class="form-check-label" for="materialUnchecked">{p.name}</label>
                    </div>
            )
        })}
        </>
    )
}

export default Radio
