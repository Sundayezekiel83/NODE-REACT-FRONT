import React from 'react'

 const Layout = ({description='description', title="Title", className, children}) => {
    return (
        <div>
        <div className="jumbotron">
            <h1>{title}</h1>
    <p className="lead"> {description}</p>
    </div>

    <div  className={className}>{children}</div>
        </div>
    )
}

export default Layout