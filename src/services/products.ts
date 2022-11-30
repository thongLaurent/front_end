import { get, post, destroy } from 'config/api';

export const ProductsData = {
    getProducts: (searchToken?) => {
        const token = localStorage.getItem('access_token');
        if (searchToken)
            return post('product/search', 
                { searchToken:"" },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
        else
            return post('product/search', 
                { searchToken:"" },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
    },

    getProductsWithoutLogin:(searchToken?) => {
        let body = JSON.stringify({
            searchToken: searchToken
        })
        if (searchToken)
            return post('product/search', body)                
        else
            return post('product/search');
    },

    getProductById: (id) => {
        return get(`product/${id}`);
    }
}