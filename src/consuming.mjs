import setText, {appendText, showWaiting, hideWaiting} from "./results.mjs";

export function get() {
    axios.get('http://localhost:3000/orders/1')
    .then(({ data }) => {
        setText(JSON.stringify(data))
        return 'Pluralsight'
    })
    .then(res => console.log(res))
}

export function getCatch() {
    axios.get('http://localhost:3000/orders/123')
    .then(({ data }) => {
        setText(JSON.stringify(data))
    })
    .catch(err => setText(err))
}

export function chain() {
    axios.get('http://localhost:3000/orders/1')
    .then(({ data }) => {
        // console.log('data from order axios call: ', data)
        // if no return is specified in the promise chain, js default behavior returns undefined
        // keep the promise chain going by specifying a return value
        return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`)
    })
    .then(({ data }) => {
        setText(`City: ${data.city}`)
        // console.log('data from address axios call: ', data)
    })
}

export function chainCatch() {
    axios.get('http://localhost:3000/orders/1')
    .then(({ data }) => {
        return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`)
    })
    .then(({ data }) => {
        setText(`City: ${data.my.city}`)
    })
    .catch(err => setText(err))
}

export function final() {
    showWaiting()
    axios.get('http://localhost:3000/orders/1')
    .then(({ data }) => {
        return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`)
    })
    .then(({ data }) => {
        setText(`City: ${data.city}`)
    })
    .catch(err => setText(err))
    .finally(() => {
        // for demo, setting a timeout here so the waiting screen is shown, then removed after promise success
        setTimeout(() => {
            hideWaiting()
        }, 1500)

        // for demo, appending some text to the results box to show this code ran to the end
        appendText(' -- Completely Done')
    })
}