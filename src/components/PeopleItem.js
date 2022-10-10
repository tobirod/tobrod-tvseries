import React from "react"
import "./components.css"

export default function PeopleItem({itemData}) {
    console.log({itemData})
    return (
        <div className="result-container">
            <div className="result-image-container">
                <img className="result-image" src={itemData.person.image?.medium} alt=""/>
            </div>
            <div className="result-data-container">
                <p className="result-name">{itemData.person.name}</p>
                <p className="result-birthday">{itemData.person.birthday}</p>
                <p className="result-country">{itemData.person.country?.name}</p>
            </div>
        </div>
    )
}