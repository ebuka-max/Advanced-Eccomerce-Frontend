import React, { useEffect } from 'react'
import Slider from '../../components/slider/Slider'
import "./Home.scss"
import HomeInfoBox from './HomeInfoBox'
// import { productData } from '../../components/corousel/data'
import CarouselItem from '../../components/corousel/CarouselItem'
import ProductCarousel from '../../components/corousel/Carousel'
import ProductCategory from './ProductCategory'
import FooterLinks from '../../components/footer/FooterLinks'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from "../../redux/features/product/productSlice";


const PageHeading = ({ heading, btnText }) => {
    return (
        <>
            <div className="--flex-between">
                <h2 className="--fw-thin">{heading}</h2>
                <button className='--btn'>
                    {btnText}
                </button>
            </div>
            <div className="--hr"></div>
        </>
    )
}

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const { products } = useSelector((state) => state.product);

    const latest = products
        ?.filter((product) => {
            return product.quantity > 0
        })
        ?.filter((product, index) => index < 7)

    const phone = products
        ?.filter((product) => {
            return product.quantity > 0
        })
        ?.filter((product) => {
            return product.category === "Phones";
        })
        ?.filter((product, index) => index < 7)



    const phoneProducts = phone.map((item) => (
        <div key={item.id}>
            <CarouselItem
                name={item.name}
                url={item.image[0]}
                price={item.price}
                regularPrice={item.regularPrice}
                description={item.description}
                product={item}
            />
        </div>
    ))

    const latestProducts = latest.map((item) => (
        <div key={item.id}>
            <CarouselItem
                name={item.name}
                url={item.image[0]}
                price={item.price}
                regularPrice={item.regularPrice}
                description={item.description}
                product={item}
            />
        </div>
    ))

    // const productss = productData.map((item)=> (
    //     <div key={item.id}>
    //         <CarouselItem
    //         name={item.name}
    //         url={item.imageurl}
    //         price={item.price}
    //         description={item.description}
    //          />
    //     </div>
    // ))
    return (
        <>
            <Slider />
            <section>
                <div className='container'>
                    <HomeInfoBox />
                    <PageHeading heading={"Latest Products"} btnText={"Shop Now>>>"} />
                    <ProductCarousel products={latestProducts} />
                </div>
            </section>
            <section className='--bt-grey'>
                <div className='container'>
                    <h3>Categories</h3>
                    <ProductCategory />
                </div>
            </section>

            <section>
                <div className='container'>
                    <PageHeading heading={"Mobile Phone"} btnText={"Shop Now>>>"} />
                    <ProductCarousel products={phoneProducts} />
                </div>
            </section>
            <FooterLinks />
        </>
    )
}

export default Home