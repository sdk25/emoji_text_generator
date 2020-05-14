import {useState} from "react"
import * as R from "ramda"

export default function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        const storageValue = localStorage.getItem(key)
        return R.isNil(storageValue) ? defaultValue : JSON.parse(storageValue)
    })

    const setValueUpdateStorage = newValue => {
        localStorage.setItem(key, JSON.stringify(newValue))
        setValue(newValue)
    }

    return [value, setValueUpdateStorage]
}

