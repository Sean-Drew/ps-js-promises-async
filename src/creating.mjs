import setText, { appendText } from "./results.mjs";

export function timeout(){
    const wait = new Promise((resolve) => {
        // setTimeout fires once
        setTimeout(() => {
            resolve('Timeout!')
        }, 1500)
    })

    wait.then(text => setText(text))
}

export function interval(){
    let counter = 0
    const wait = new Promise((resolve) => {
        // setInterval fires multiple times, every time the timer expires
        setInterval(() => {
            console.log('Interval', counter)
            resolve(`Timeout! ${++counter}`)
        }, 1500)
    })

    wait.then(text => setText(text))
        .finally(() => appendText(` -- Done ${counter}`))
}

export function clearIntervalChain(){
    let counter = 0
    let interval
    const wait = new Promise((resolve) => {
        // setInterval fires multiple times, every time the timer expires
        interval = setInterval(() => {
            console.log('Interval', counter)
            resolve(`Timeout! ${++counter}`)
        }, 1500)
    })

    wait.then(text => setText(text))
        .finally(() => clearInterval(interval))
}

export function xhr(){
    let request = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        // for demo, user 7 does not exist, will throw error 404, xhr status text will be 'not found'
        xhr.open('Get', 'http://localhost:3000/users/7')
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.responseText)
            } else {
                reject(xhr.statusText)
            }
        }
        xhr.onerror = () => reject('Request Failed')
        xhr.send()
    })

    request.then(result => setText(result))
        .catch(reason => setText(reason))
}

export function allPromises(){
    // fire multiple get requests
    let categories = axios.get('http://localhost:3000/itemCategories')
    let statuses = axios.get('http://localhost:3000/orderStatuses')
    let userTypes = axios.get('http://localhost:3000/userTypes')
    let addressTypes = axios.get('http://localhost:3000/addressTypes')

    // we want all of them to be fulfilled before moving on, so we use promise.all and pass them as a params array
    // the all method waits until all promises are fulfilled, or if one promise is rejected. all or none.
    Promise.all([categories, statuses, userTypes, addressTypes])
        // array of results, in the order they were added
        .then(([cat, stat, type, address]) => {
            setText('')

            appendText(JSON.stringify(cat.data))
            appendText(JSON.stringify(stat.data))
            appendText(JSON.stringify(type.data))
        })
        .catch(reasons => {
            setText(reasons)
        })
}

export function allSettled(){
}

export function race(){
}