import * as React from 'react'
import ProductCard from './ProductCard';

function MarketPlace(){
    const [query, setQuery] = React.useState('');
    const handleInputChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('You searched for....', query);
    }
    
    return (
        <div>
            <div>
            <form onSubmit={handleSubmit}>
                <input 
                type='search' 
                value='query' 
                onChange={handleInputChange} 
                placeholder='search'
                />
                <button type='submit'>Search</button>
            </form>
            </div>
            <ProductCard />
        </div>
    )
};

export default MarketPlace;