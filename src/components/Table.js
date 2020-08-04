import React from 'react'
import './Table.css'
import { prettyPrintNumb } from '../utils'

function Table({countries}) {
    return (
        <div className="table">
            {/* <tbody> */}
                {
                    Object.keys(countries).length ? 
                        countries.map(({country, cases, countryInfo})=>(
                            <div key={country}>
                                <span>{country}</span>
                                <span><strong>{prettyPrintNumb(cases)}</strong></span>
                            </div>
                        )) 
                        : 
                        <div><span>No Data Found</span></div>
                }   
            {/* </tbody> */}
         </div>
    )
}

export default Table
