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

export function concurrent(){
}

export function parallel(){
}