import React from "react"
import './components.css'

export default function SearchBar({contentHandler}) {
    // const [showAdvanced, setShowAdvanced] = React.useState(false)
    // const toggleAdvanced = () => setShowAdvanced(!showAdvanced)
    const [endpoint, setEndpoint] = React.useState("shows")
    const endpointChange = event => {
        setEndpoint(event.target.id)
    }
    const [query, setQuery] = React.useState("")
    const queryChange = event => {
        if (event.target.value.length <= 0) {
            showDefaultContent()
        }
        setQuery(encodeURIComponent(event.target.value))
    }
    const sendQuery = event => {
        event.preventDefault()
        const url = `https://api.tvmaze.com/search/${endpoint}?q=${query}`
        fetch(url)
        .then((response) => response.json())
        .then((result) => {
            let contentObj = {
                type: endpoint,
                query: query,
                result: result
            }
            contentHandler(contentObj)
        })
    }

    function showDefaultContent() {
        contentHandler({})
    }


    return (
        <header>
            <img className="searchbar-title-logo" src="tvm_header_logo.png" alt="" onClick={showDefaultContent}/>
            <div className="searchbar-container">
                <div className="searchbar-search-container">
                    <form className="searchbar-search-form" role="search" onSubmit={sendQuery}>
                        <input className="searchbar-search-input" type="search" placeholder="Search here..." onChange={queryChange} />
                        <button className="searchbar-search-button" type="submit">
                            <img className="searchbar-search-icon" src="search_icon_white.png" alt=""/>
                        </button>
                    </form>
                    <div className="searchbar-search-options">
                        <div className="searchbar-endpoint-container">
                            <label className="searchbar-endpoint-label">
                                <input 
                                    className="searchbar-endpoint-radio"
                                    id="shows"
                                    type="radio"
                                    name="endpoint"
                                    checked={endpoint === "shows"}
                                    onChange={endpointChange}
                                />
                                Shows
                            </label>
                            <label className="searchbar-endpoint-label">
                                <input 
                                    className="searchbar-endpoint-radio"
                                    id="people"
                                    type="radio"
                                    name="endpoint"
                                    checked={endpoint === "people"}
                                    onChange={endpointChange}
                                />
                                People
                            </label>
                        </div>
                        {/* <div className="searchbar-advanced-header">
                            <span className="searchbar-advanced-header-text" onClick={toggleAdvanced}>
                                Advanced search options
                                <div id={ showAdvanced ? "chevron-down" : "chevron-right" } />
                            </span>
                        </div> */}
                    </div>
                </div>
                {/* <div className="searchbar-advanced-container">
                    { showAdvanced ? <AdvancedSearch /> : null }
                </div> */}
            </div>
        </header>
    )
}

// function AdvancedSearch() {
//     return (
//         <div className="searchbar-advanced-content">
//             <span>Genre:</span>
//             <select className="searchbar-genre-selection" multiple>
//                 <option>None</option>
//                 <option>Action</option>
//                 <option>Adventure</option>
//                 <option>Comedy</option>
//                 <option>Drama</option>
//                 <option>Sci-Fi</option>
//             </select>
//         </div>
//     )
// }