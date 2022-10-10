import React, { useEffect } from "react"
import "./components.css"

export default function DefaultView() {
    const [loadState, setLoadState] = React.useState(true)
    const [showData, setShowData] = React.useState([])
    const [peopleData, setPeopleData] = React.useState([])

    useEffect(() => {
        const randomPage = Math.floor(Math.random() * 6)
        fetch(`https://api.tvmaze.com/shows?page=${randomPage}`)
        .then((response) => response.json())
        .then((result) => {
            const shows = Object.values(result).sort((a, b) => {
                return 0.5 - Math.random()
            })
            setShowData(shows)
        })
    }, [loadState])

    useEffect(() => {
        let peoplePromises = []
        for (let i = 0; i < 20; i++) {
            peoplePromises.push(new Promise((resolve, reject) => {
                fetch(`https://api.tvmaze.com/people?page=${i}`)
                .then((response) => response.json())
                .then((result) => {
                    const date = new Date().toISOString().substring(5, 10)
                    let people = Object.values(result).filter((p) => {
                        let tmpBirthday = p.birthday?.substring(5, 10)
                        return tmpBirthday === date
                    })
                    resolve(people)
                })
                .catch((err) => {
                    reject(err)
                })
            }))
        }
        console.log('test')
        Promise.all(peoplePromises).then((result) => {
            let people = result.flat()
            setPeopleData(people)
        })
        setLoadState(false)
    }, [loadState])

    const showItems = showData.map((show) => {
        return (
            <div key={show.id} className="defaultview-item-container">
                <img className="defaultview-item-image"src={show.image?.medium} alt="" />
                <p className="defaultview-item-title">{show.name}</p>
                <p className="defaultview-item-genres">{Array(show.genres).join(", ")}</p>
                <p className="defaultview-item-rating">{show.rating.average}</p>
            </div>
        )
    })

    const birthdayItems = peopleData.map((person) => {
        return (
            <div key={person.id} className="defaultview-item-container">
                <img className="defaultview-item-image" src={person.image.medium} alt="" />
                <p className="defaultview-item-title">{person.name}</p>
            </div>
        )
    })

    return (
        <div className="defaultview-container">
            <div className="defaultview-group-container">
                <h1>Looking for a new show?</h1>
                <div className="defaultview-scroll-container">
                    {showItems}
                </div>
            </div>
            <div className="defaultview-group-container">
                <h1>Happy birthday to...</h1>
                <div className="defaultview-scroll-container">
                    {birthdayItems}
                </div>
            </div>
        </div>
    )
}