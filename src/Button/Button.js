
import React from 'react'

import './Button.css'

const STYLES = ['btn--primary', 'btn--outline']

const SIZES = ['btn--medium', 'btn--large']

const Button = ({buttonSize, buttonStyle, children, type, onClick  }) =>{

        const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
        
        const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
 

    return(
        
        <button className={`btn-p ${checkButtonStyle} ${checkButtonSize}`} >
            
            {children}</button>
              
        
    )
}

export default Button