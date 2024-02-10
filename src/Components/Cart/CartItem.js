import { useDispatch } from 'react-redux'
import dataArrangments from '../../data/dataArrangments'
import { removeItemFromCart } from '../../redux/cartSlice'
const CartItem = ({cartItem}) => {
    console.log(cartItem)
    
    const flowers = dataArrangments.find(item =>item.id===cartItem.flowerId)
    const dispatch = useDispatch();
return(
    <div>
        <p>{flowers.name}</p>
        <p>{cartItem.quantity}: Arrangmet(s)</p>
        <p>Price: ${flowers.price * cartItem.quantity}</p>
        <span onClick={()=> dispatch(removeItemFromCart({cartItemId:cartItem.id}))}>
        <img className="icon" src="https://img.icons8.com/material-outlined/48/000000/trash--v1.png" alt='delete'/>
        </span>
    </div>
)

}
export default CartItem;