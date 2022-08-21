import React from 'react'

const Alert = (props) => {
    const { alert } = props
    return (
        <>
            {alert !== null &&
                <div className={`alert alert-${alert.type}`} role="alert">
                    {alert.message}
                </div>
            }
        </>
    )
}

export default Alert