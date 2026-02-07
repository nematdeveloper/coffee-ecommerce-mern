import React, { useState } from 'react'
import FaqHeader from './FaqHeader'
import QuestionCard from './QuestionCard'
import Nav from '../../components/Nav/NavMain'
import ContactQuestion from './ContactQuestion'
import Footer from '../../components/Footer/MainFooter'
import FaqNav from "./FaqNav"
const Faq = () => {
  const [query, setQuery] = useState("")
  
  return (
    <div>
      <FaqNav/>
      {/* Fixed: Pass the actual state and setter function */}
      <FaqHeader query={query} setQuery={setQuery}/>
      <QuestionCard searchQuery={query} />
      <ContactQuestion/>
      <Footer/>           
    </div>
  )
}

export default Faq