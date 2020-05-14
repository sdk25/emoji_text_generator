import {useEffect, useState} from "react"

export default function useLocalStorage(key, defaultVal) {
    const [value, setValue] = useState(() => {
        return JSON.parse(localStorage.getItem(key)) || defaultVal
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    return [value, setValue]
}

