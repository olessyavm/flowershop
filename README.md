20 - Создаём dishesSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const flowerSlice = createSlice({
    name: 'flowers',
    initialState:{
        selectedCategory:"WEDDING"
    },
    reducers:{

    }
})

export const getSelectedCategory = state => state.flowers.selectedCategory;
export default flowerSlice.reducer;

21 - Меняем цвет категории при выборе

.categoryButtonSelected{
background-color: green;
}
.categoryButton:hover{
  background-color: #fdeb6b;
}
.categoryButton{
cursor: pointer;
margin: 5px;
padding: 5px;
}

index.js

import { Provider } from 'react-redux';
import { store } from './redux/store';

<React.StrictMode>
    <Provider store={store}>
      <App />
      </Provider>
    
  </React.StrictMode>

22 - Прописываем reducer по фильтрации категорий
flowerSlice.js

reducers:{
        filterCategory:(state, action) => {
            state.selectedCategory = action.payload;
        }

export const {filterCategory} = flowerSlice.actions;        

23 - Фильтр по категориям
Arrangments.js

import { useSelector } from "react-redux";
import { getSelectedCategory } from "../../redux/flowerSlice";

.
.
.
const Arrangemnts= () => {
    const selectedCategory = useSelector(getSelectedCategory);
    return(
        <div>
            {dataArrangments
            .filter(flower => {
                return selectedCategory === flower.category;
            })
            .map(flower => <Flower flower={flower} /> )}
        </div>
    )
}
export default Arrangemnts;

Filter.js

import { useDispatch, useSelector } from "react-redux";
..
const dispatch = useDispatch();
..
            <h3 onClick={()=> {dispatch(filterCategory(category))}} className={selectedCategory === category ? 'categoryButtonSelected categoryButton' : 'categoryButton'}>{category}</h3>


24 - Решаем проблему при нажатии на ALL
Arrangments.js
.....
if(selectedCategory === 'ALL')
                return true;
.....

25 - Создаём новый компонент - ChangeQuantity.js
const ChangeQuanity = () => {
    return(
        <div>
            test
        </div>
    )
}
export default ChangeQuanity;

Flower.js
import ChangeQuanity from "../Cart/ChangeQuanity";
..
<ChangeQuanity/>
<button>add to cart</button>

26 - Приравниваем состояние к одному
Flower.js
const Flower = ({flower}) => {
    const [quantity, setQuantity] = useState(1);
    ..
    <ChangeQuanity quantity={quantity}/>
            <button>Add to cart</button>
  
  ChangeQuanity.js
  const ChangeQuanity = ({quantity}) => {
    return(
        <div>
            {quantity}
        </div>
    )
}
export default ChangeQuanity;

27 - Кнопка по увеличению порций
ChangeQuanity.js

const ChangeQuanity = ({quantity, setQuantity}) => {

    const addQuantity = () => {
        const newQuantity = quantity +1;
        setQuantity(newQuantity)
    }

    const removeQuantity = () => {

    }
    return(
        <div>
            <button onClick={addQuantity}>+</button>
..

Flower.js

 <ChangeQuanity quantity={quantity} setQuantity={setQuantity}/>

28 - Кнопка по уменьшению порций
changequanityt.js
const removeQuantity = () => {
        if(quantity <=1)
        return;
        const newQuantity = quantity - 1;
        setQuantity(newQuantity)

    }

    <button onClick={removeQuantity}>-</button>
    
reduces number of items in cart and does not go below 1

29 - Создаём cartSlice - для действий, связанных с корзиной
cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'cart',
    initialState:{
        cartItems:[]
    },
    reducers:{
        addItemToCart:(state, action) => {
            state.cartItems.push({
                flowerId: action.payload.flower.id,
                quantity: action.payload.quantity
            })
        }
    }
})

export const getCartItems = state => state.cart.cartItems;
export const {addItemToCart} = slice.actions;
export default slice.reducer;

store.js
import { configureStore } from '@reduxjs/toolkit';
import flowers from './flowerSlice';
import cart from './cartSlice'

export const store = configureStore({
    reducer: {
        flowers,
        cart
    }
  })

  30 - Где будем применять логику cartSlice? Подумайте :)
  ...
31 - Создаём новый компонент для каждого товара: CartItem.js
CartItem.js

const CartItem = () => {
return(
    <div>
        cart Item
    </div>
)

}
export default CartItem;

cart.js
import CartItem from "./CartItem";
const Cart = () =>{
    return(
        <div>
            <img className="cartIcon" src="https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/64/000000/external-shopping-cart-cyber-monday-xnimrodx-lineal-color-xnimrodx.png" alt="cart"/> 
            <CartItem />
        </div>
    )
}
export default Cart;

32 - Соединяем store и CartItem.js
cart.js
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { getCartItems } from "../../redux/cartSlice";

const Cart = () =>{
    const cartItems = useSelector(getCartItems)
    return(
        <div>
           ..
            {cartItems.map(cartItem =><CartItem cartItem={cartItem}/>)}
            
        </div>
    )
}
export default Cart;

CartItem.js
const CartItem = ({cartItem}) => {
return(
    .....

33 - Добавляем в корзину количество порций
Flower.js
.
.

const Flower = ({flower}) => {
    .
    const dispatch = useDispatch();
    return(
        <div>
        .
        .
        .
        <button onClick={()=>{dispatch(addItemToCart({flower, quantity}))}}>Add to cart</button>
    )

    CartItem.js
    const CartItem = ({cartItem}) => {
    console.log(cartItem)
return(
    <div>
        <p>{cartItem.quantity}: Arrangmet(s)</p>
    </div>
)
}
export default CartItem;

34 - Добавляем название блюда в корзину
method find()
//find() - method of Array instances returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.
ex code: not part of the project

const ages = [3, 10, 18, 20];

function checkAge(age) {
  return age > 18;
}

function myFunction() {
  document.getElementById("demo").innerHTML = ages.find(checkAge);
}
output:20

CartItem.js
import dataArrangments from '../../data/dataArrangments'
const CartItem = ({cartItem}) => {
    console.log(cartItem)
    
    const flowers = dataArrangments.find(item =>item.id===cartItem.flowerId)
return(
    <div>
        <p>{flowers.name}</p>
        <p>{cartItem.quantity}: Arrangmet(s)</p>
        
    </div>
)

}
export default CartItem;

35 - Добавляем цену в корзину
CartItem.js
return(
    <div>
        <p>Total: $ {}</p>
        <p>{flowers.name}</p>
        <p>{cartItem.quantity}: Arrangmet(s)</p>
        <p>Price: ${flowers.price * cartItem.quantity}</p>
    </div>
)

36 - Метод reduce()
The reduce() method applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.

Use it when: You have an array of amounts and you want to add them all up.

ex: (not part of the project)
const euros = [29.76(//total), 41.85(//amount), 46.5(//amount)];
const sum = euros.reduce((total, amount) => total + amount); 
sum // 118.11

37 - Складываем сумму всех товаров
Cart.js
const Cart = () =>{
   .
    const totalPrice = useSelector(getTotalPrice)
    return(
        <div>
            .
            <h3>Total: ${totalPrice}</h3>
            .
CartSlice.js
reducers:{
        addItemToCart:(state, action) => {
            state.cartItems.push({
                .
                .
                totalPrice:action.payload.quantity * action.payload.flower.price
            })
            ..
export const getTotalPrice = state => {
    return state.cart.cartItems.reduce((total, cartItems)=>{
        return cartItems.totalPrice + total
    },0)

38 - Добавляем иконку кнопки УДАЛИТЬ
CartItem.js
...
<p>Price......</p>
<img className="icon" src="https://img.icons8.com/material-outlined/48/000000/trash--v1.png"/> 

index.css
  .icon{
    width: 20px;
  }

39 - Прописываем логику в cartSlice.js

cartSlice.js
.
.
.
 reducers:{
        addItemToCart:(state, action) => {
            .
            .
            .
            })
        },
         removeItemFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                cartItem => cartItem.id !== action.payload.cartItemId
            )
        }
.
.
.
export const {addItemToCart, removeItemFromCart} = slice.actions;

40 - Переносим эту логику в другой компонент
import { useDispatch } from 'react-redux'
.
.

const CartItem = ({cartItem}) => {
    .

    const dispatch = useDispatch();
return(
    <div>
        .
        .
        .
        <span onClick={()=> dispatch(removeItemFromCart({cartItemId:cartItem.id}))}>
        <img className="icon" src="https://img.icons8.com/material-outlined/48/000000/trash--v1.png" alt='delete' />
        </span>
    </div>
)

}
export default CartItem;

41 - Устраняем глюк, связанный с удалением элементов
cartSlice.js
reducers:{
        addItemToCart:(state, action) => {
            const timeId = new Date().getTime()
            state.cartItems.push({
                id: timeId,

42 - Финальные штрихи CSS и заключительное слово о Redux
p, h1, h2, button {
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
}
button {
  background-color: #fdeb6b;
  margin-top: 40px;
  margin-left: 10px;
}