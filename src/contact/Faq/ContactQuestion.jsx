import React from 'react'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import AvatarS from "../../assets/about/boss.jpg"
import AvatarSS from "../../assets/about/abdul.jpg"
import { useTranslation } from 'react-i18next';

const ContactQuestion = () => {
  const { t } = useTranslation('faq');

  return (
    <div className='flex flex-col justify-between rounded-2xl mx-10 my-10 items-center bg-primary  p-10 gap-5'>
        <div>
          <AvatarGroup spacing="medium" max={3}>
            <Avatar alt={t("contactSection.avatarAlt1")} src={AvatarS} />
            <Avatar alt={t("contactSection.avatarAlt2")} src={AvatarSS} />
            <Avatar alt={t("contactSection.avatarAlt3")} src={AvatarS} />
            <Avatar alt={t("contactSection.avatarAlt4")} src={AvatarS} />
          </AvatarGroup>
        </div>
        <p className='font-bold text-[19px]'>{t("contactSection.title")}</p>
        <p className='text-white text-center'>{t("contactSection.subtitle")}</p>
        <a 
          href='https://wa.me/93728061919' 
          className='border py-1 hover:bg-primary text-[1rem] hover:text-white px-4 rounded-md transition-colors duration-200'
          aria-label={t("contactSection.contactButtonAria")}
        >
          {t("contactSection.contactButton")}
        </a>
    </div>
  )
}

export default ContactQuestion;