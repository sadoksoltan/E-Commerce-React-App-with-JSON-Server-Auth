import AppContext from '../AppContext';
import React, { useState, useEffect, useContext } from 'react';
// let productList = [];
// for (let i = 0; i < 11; i++) {
//     productList.push({
//         id: i+1,
//         name: "HP ENVY 14",
//         brand: "HP",
//         category: "Computers",
//         price: 800,
//         description: "HP Newest HD Laptop, Windows 11, Intel Celeron Dual-Core Processor Up to 2.60GHz, 4GB RAM",
//         imageFileName: "https://www.tunisianet.com.tn/289815-large/pcportable-hp-envy-x360-15-ew0002nk-tactile-i5-1240p-20-go-512-go-ssd-silver.jpg",
//         createdAt: "2023-07-13 17:46:54"
//     });
// }
// productList[0].imageFileName = "https://www.tunisianet.com.tn/239229-large/pc-portable-hp-pavilion-gaming-15-dk2016nk-i5-11e-gen-32-go-rtx-3050-ti-4g.jpg";

// export function Afficher() {
//     console.log(productList[0]);
// }

export function ProductItem(props) {
    const { cart, updateCart } = useContext(AppContext);


    const handleAddToCart = () => {
        const updatedCart = [...cart];
        updatedCart.push(props.product);
        updateCart(updatedCart);
    };

    return (

        <div className="rounded border shadow p-3 text-center h-100">
            <img
                src={props.product.fileimg}
                className="img-fluid"
                alt="loading"
                style={{ height: 260 }}
            />
            <hr />
            <h4 className="py-2">{props.product.name}</h4>
            <p>{props.product.brand +" " +props.product.category +" "+ props.product.description + ""}</p>
            <h4 className="mb-2">{props.product.price}$</h4>
            <a className="btn btn-primary btn-sm m-2" href="https://www.tunisianet.com.tn/pc-portable-tunisie/54918-pc-portable-hp-pavilion-gaming-15-dk2016nk-i5-11e-gen-32-go-rtx-3050-ti-4g.html" role="button">
                Details
            </a>
            <button type="button" className="btn btn-warning btn-sm" onClick={handleAddToCart} >
                Add to Cart
            </button>

        </div>
    )

}

export function Home() {
    const { products } = useContext(AppContext);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3005/products')
            .then(response => response.json())
            .then(data => setProductList(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <>
            <div className='bg-light'>
                <div className='container py-5'>
                    <h2 className="mb-3 text-center">Products</h2>
                    <div className='row g-2 mb-5'>
                        {productList.map(product => (
                            <div className='col-md-3 col-sm-6' key={product.id}>
                                <ProductItem product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

