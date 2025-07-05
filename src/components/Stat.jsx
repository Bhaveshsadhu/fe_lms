import React from 'react'

const Stat = () => {
    return (
        <div className="row p-5">
            <div className="stat-box col-md-3 col-sm-6 col-xs-12">
                <div className="border-r5 text-center">
                    <h3><span className='fs-1'>65K+</span> <em className='fs-6'>libraries</em></h3>
                </div>
            </div>
            <div className="stat-box col-md-3 col-sm-6 col-xs-12">
                <div className="border-r5 text-center">
                    <h3><span className='fs-1'>9.3M+</span> <em className='fs-6'>books</em></h3>
                </div>
            </div>
            <div className="stat-box col-md-3 col-sm-6 col-xs-12">
                <div className="border-r5 text-center">
                    <h3><span className='fs-1'>1.1M+</span> <em className='fs-6'>members</em></h3>
                </div>
            </div>
            <div className="stat-box col-md-3 col-sm-6 col-xs-12">
                <div className="border-r5 text-center">
                    <h3><span className='fs-1'>6.2M+</span> <em className='fs-6'>check-outs</em></h3>
                </div>
            </div>
        </div>
    )
}

export default Stat