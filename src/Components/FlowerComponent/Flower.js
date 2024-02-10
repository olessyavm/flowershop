import { useState } from "react";
import ChangeQuanity from "../Cart/ChangeQuanity";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/cartSlice";

const Flower = ({flower}) => {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    return(
        <div>
            <img src={`./${flower.img}.jpg`} alt="flower" width=" 500px" />
            <h2>{flower.name}</h2>
            <p>${flower.price}</p>
            
            <ChangeQuanity quantity={quantity} setQuantity={setQuantity}/>
            <button onClick={()=>{dispatch(addItemToCart({flower, quantity}))}}>Add to cart</button>
        </div>

    )
}
export default Flower;