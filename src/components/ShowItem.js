import React from "react"
import "./components.css"

export default function ShowItem({itemData}) {
    const cleanSummary = itemData.show.summary?.replace(/<[^>]*>?/gm, '')
    return (
        <div className="result-container">
            <div className="result-image-container">
                <img className="result-image" src={itemData.show.image?.medium} alt=""/>
            </div>
            <div className="result-data-container">
                <p className="result-title">{itemData.show.name}</p>
                <p className="result-genre">{String(itemData.show.genres).replace(",", ", ")}</p>
                <p className="result-language">{itemData.show.language}</p>
                <p className="result-summary">{cleanSummary}</p>
            </div>
        </div>
    )
}