import React from "react"
import "./components.css"

import ShowItem from "./ShowItem"
import PeopleItem from "./PeopleItem"
import DefaultView from "./DefaultView"

export default function ContentView({content}) {
    let listItems = []
    let mainView

    switch (content.type) {
        case 'shows':
            listItems = content.result.map((itemData, index) => {
                return (
                    <div className="search-result" key={index}>
                        <ShowItem itemData={itemData} />
                    </div>
                )
            })
            mainView = (
                <div className="search-results">
                    {listItems}
                </div>
            )

            if (listItems.length <= 0) {
                mainView = (
                    <div className="search-results">
                        <p className="no-results">No results found, try again!</p>
                    </div>
                )
            }
            break
        case 'people':
            listItems = content.result.map((itemData, index) => {
                return (
                    <div className="search-result" key={index}>
                        <PeopleItem itemData={itemData} />
                    </div>
                )
            })
            mainView = (
                <div className="search-results">
                    {listItems}
                </div>
            )
            if (listItems.length <= 0) {
                mainView = (
                    <div className="search-results">
                        <p>No results found, try again!</p>
                    </div>
                )
            }
            break
        default:
            mainView = <DefaultView />
    }

    return (
        <main>
            {mainView}
        </main>
    )
}
