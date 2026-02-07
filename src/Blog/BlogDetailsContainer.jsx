import React from 'react'

import BlogDetails from './BlogDetails'
import BlogDetailsHeader from './BlogDetailsHeader'
import Footer from '../components/Footer/MainFooter'
const BlogDetailsContainer = () => {
  return (
    <div>
      
       <BlogDetailsHeader/>
        <BlogDetails/>
        <Footer/>
    </div>
  )
}

export default BlogDetailsContainer