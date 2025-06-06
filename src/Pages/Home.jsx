import React from 'react'
import TopBar from '../Componend/Home/Topbar'
import HeroBanner from '../Componend/Home/HeroNavber'
import ProductCategoryGrid from '../Componend/Home/ProductCatagory'
import ProductShowcase from '../Componend/Home/ProductShowcase'
import AllCategories from '../Componend/Home/AllCatagoryes'
import AddSection from '../Componend/Home/AddSection'
import TshirtShowcase from '../Componend/Home/Tshartcollection'
import CompanyAd from '../Componend/Home/CompanyAd'
import TshirtShowcase2 from '../Componend/Home/Tshartcollection2'
import Girlsproduct from '../Componend/Home/Grilsproduct'
import Boysproduct from '../Componend/Home/Boysproduct'
import Capproduct from '../Componend/Home/Capproduct'
import Product1 from '../Componend/Home/Product1'
import Product2 from '../Componend/Home/Product2'
import Product3 from '../Componend/Home/Product3'
import  PremiumProducts from '../Componend/Home/PremiumProduct'
import Sponcer from '../Componend/Home/Sponcer'
import Banner from '../Componend/Home/Banner'
import Flooter from '../Componend/Home/Flooter'
import FloatingActionButtons from '../Componend/ProductDetails/FloatingActionButtons'

const Home = () => {
  return (
    <div className="font-sans bg-black">
      <TopBar/>
      <HeroBanner/>
    <AllCategories/>
      <ProductCategoryGrid/>
      <AddSection/>
      <ProductShowcase/>
      <TshirtShowcase/>
      <CompanyAd/>
      <TshirtShowcase2/>
      <Girlsproduct/>
      <Boysproduct/>
      <Capproduct/>
      <Product1/>
      <Product2/>
      <Product3/>
      <PremiumProducts/>
      <Banner/>
      <FloatingActionButtons/>
      <Sponcer/>
      <Flooter/>
    </div>
  )
}

export default Home