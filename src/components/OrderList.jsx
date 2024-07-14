import {func, number} from 'prop-types';
import {useState, useEffect} from 'react';

const OrderList = ({ customerId, onOrderSelect }) => {
    const [orders, setOrders] = useState([]);

    //useEffect(setup<function>, dependency)

    useEffect(() => {
        if (customerId) {
            const fetchedOrders = [
                {id: 101, date: '2021-01-01'},
                {id: 102, date: '2021-01-15'},
            ]
            setOrders(fetchedOrders);
        }
    }, [customerId]);
    return (
        <div className='order-list'>
            <h3>orders</h3>
            <ul>
                {orders.map(order => (
                    <li key={order.id} onClick={() => onOrderSelect(order.id)}>
                       r Order ID: {orde.id}, Date: {order.date}
                    </li>
                ))}
            </ul>
        </div>
    );


};
OrderList.propTypes = {
    customerId: number.isRequired,
    onOrderSelect: func.isRequired,
};


export default OrderList;

