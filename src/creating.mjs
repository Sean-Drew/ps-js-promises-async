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
            appendText(JSON.stringify(address.data))
        })
        .catch(reasons => {
            setText(reasons)
        })
}

export function allSettled(){
    // set up to return all settled requests, whether all are fulfilled or some are rejected
    let categories = axios.get('http://localhost:3000/itemCategories')
    let statuses = axios.get('http://localhost:3000/orderStatuses')
    let userTypes = axios.get('http://localhost:3000/userTypes')
    let addressTypes = axios.get('http://localhost:3000/addressTypes')

    // allSettled method data is passed back differently. returns a status key of fulfilled or 
    // rejected, and reason is either value if fulfilled or reason if rejected.
    // We don't need a catch block, but should still include one.
    Promise.allSettled([categories, statuses, userTypes, addressTypes])
        .then((values) => {
            let results = values.map(v => {
                if (v.status === 'fulfilled') {
                    return `FULFILLED: ${JSON.stringify(v.value.data[0])} `
                }

                return `REJECTED: ${v.reason.message} `
            })

            setText(results)
        })
        .catch(reasons => {
            setText(reasons)
        })
}

export function race(){
    // 'racing promises', or using the fastest endpoint
    // for example, if the endpoint is hosted at multiple locations, get back the fastest one
    let users = axios.get('http://localhost:3000/users')
    let backup = axios.get('http://localhost:3001/users')

    // pass as an array again here. .race()
    // race returns whenever the first promise settles. if it fails it'll call the catch function 
    // and you won't get your data. .race() isn't used a lot, .all() is used more.
    Promise.race([users, backup])
        .then(users => setText(JSON.stringify(users.data)))
        .catch(reason  => setText(reason))
}