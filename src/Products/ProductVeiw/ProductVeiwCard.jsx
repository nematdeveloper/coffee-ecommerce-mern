import React from 'react'
import Nav from '../../components/Nav/NavMain'
import Footer from '../../components/Footer/MainFooter'
import { useTranslation } from 'react-i18next'
import ProductVeiw from './ProductVeiw'
import BestProducts from '../BestProducts/BestProducts'
import { useParams } from 'react-router-dom'
import ProductVeiwHeader from "./ProductVeiwHeader"
const ProductVeiwCard = () => {
   const{t} = useTranslation("products")
  return (
    <div>
<ProductVeiwHeader/>
       

<ProductVeiw/>

 <div className='flex mt-50 ml-20 flex flex-col '>
  <p className='text-[28px]'> {t("products.bestTitle")} </p>
     <p className='text-[19px] text-[#ADADAD]'>{t("products.bestCount")}</p>
 </div>

<div className='mb-[54px]'>
  <BestProducts/>
</div>

        <Footer/>
    </div>
  )
}

export default ProductVeiwCard