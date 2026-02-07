import React from 'react';
import ShippingHeader from "./ShippingHeader"
import ShippingCard from './ShippingCard';
import Footer from '../components/Footer/MainFooter';

const ShppingContainer = () => {
  return (
    <div >
      <ShippingHeader/>
      <div className='min-h-screen '>
      <ShippingCard />
      </div>

      <Footer />
    </div>
  );
};

export default ShppingContainer;
