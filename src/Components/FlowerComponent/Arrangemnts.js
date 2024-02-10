import Flower from "./Flower";
import dataArrangments from "../../data/dataArrangments";
import { useSelector } from "react-redux";
import { getSelectedCategory } from "../../redux/flowerSlice";

const Arrangemnts= () => {
    const selectedCategory = useSelector(getSelectedCategory);
    return(
        <div>
            {dataArrangments
            .filter(flower => {
                if(selectedCategory === 'ALL')
                return true;
                return selectedCategory === flower.category;
            })
            .map(flower => <Flower flower={flower} /> )}
        </div>
    )
}
export default Arrangemnts;