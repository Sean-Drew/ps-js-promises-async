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
        // if no return is specified in the promise chain, js default behavior returns undefined
        // keep the promise chain going by specifying a return value
        return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`)
    })
    .then(({ data }) => {
        setText(`City: ${data.city}`)
    })
}

export function chainCatch() {
}

export function final() {
}