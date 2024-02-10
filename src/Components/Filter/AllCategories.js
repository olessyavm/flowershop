import Filter from "./Filter";

const AllCategories = () => {
    return(
        <div>
            <h1>Select your occation</h1>
            {['WEDDING', 'HOME DECOR', 'BIRTHDAY', 'THANKSGIVING', 'VALENTINE', 'ALL']
            .map(category => <Filter category = { category } />
            )}
            
        </div>
    )
}
export default AllCategories;