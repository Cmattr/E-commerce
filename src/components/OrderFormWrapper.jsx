import { useParams, useNavigate } from "react-router-dom";
import OrderForm from './OrderForm'

function CustomerFormWrapper() {
    let params = useParams()
    let navigate = useNavigate()

    return <OrderForm params={params} navigate={navigate} />
}

export default CustomerFormWrapper