import React from 'react';
import Certificates from './Certificates';
import { useTranslation } from 'react-i18next';
import "./css/Cert.css";

const CertificatesContainer = () => {
  const { t } = useTranslation('home');

  return (
    <div className='mt-6 md:mt-10 lg:mt-12 px-3 sm:px-4'>
      <div className='flex text-black justify-center items-center gap-2 md:gap-4 text-[28px] md:text-[36px] lg:text-[48px] font-semibold text-center mb-8 md:mb-12'>
        {t('certificates.title')}
      </div>
      <div className='relative'>
        <Certificates />
      </div>
    </div>
  );
};

export default CertificatesContainer;