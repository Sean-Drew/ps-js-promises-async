import setText , {appendText} from './results.mjs';

export async function get(){
    // can only use await inside an async function
    const { data } = await axios.get('http://localhost:3000/orders/1')
    setText(JSON.stringify(data))
}

export async function getCatch(){
    try {
        const { data } = await axios.get('http://localhost:3000/orders/123')
        setText(JSON.stringify(data))
    } catch (error) {
        setText(error)
    }
}

export async function chain(){
    const { data } = await axios.get('http://localhost:3000/orders/1')
    // destructuring data, but assigning it to a variable named 'address'
    // console.log(`Data is: ${JSON.stringify(data)}`)
    const { data: address } = await axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`)
    // console.log(`Address data is: ${JSON.stringify(address)}`)
    setText(`City: ${JSON.stringify(address.city)}`)
}

export async function concurrent(){
    // awaiting concurrent requests.

    // no await here. not putting an await on the axios calls here allows the calls to initiate at 
    // the same time.
    const orderStatus = axios.get('http://localhost:3000/orderStatuses')
    const orders = axios.get('http://localhost:3000/orders')

    setText('')

    // adding the await down here lets the calls be used in an order that makes sense, especially if
    // one is dependent on the other.
    // This says we don't want to do anything with orders until we get the statuses first (statuses in this
    // case is slower).
    const { data: statuses } = await orderStatus
    const { data: order } = await orders

    appendText(JSON.stringify(statuses))
    appendText(JSON.stringify(order[0]))
}

export function parallel(){
}