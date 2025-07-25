import React from 'react'
import Title from '../components/Title' 
import {assets} from '../assets/assets'
import Newsletter from '../components/NewsletterBox'
const About = () => {
  return (
    <div>
 <div className='text-2xl text-center pt-8 border-t'>
     <Title text1={"ABOUT"}  text2={"US"}/>
    </div>

<div className="my-10 flex flex-col md:flex-row gap-16">
     <img className='w-full md:max-w-[450px] ' src={assets.about_img} alt="" />
     <div className='flex flex-col gap-6 justify-center md:w-2/4 text-gray-600'>
          <p className=''>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey begin with a simple idea: to provide a platform where a customer can easily discover, explore and purchase a wide range of products from the comfort of their homes.</p>
          <p>Since our inception we,ve worked firelessly to curated a diverse selection of high quality products that cater to every taste and prefercences. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brand and suppliers.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our misssion at Forever is to empower customers with choice. convenience, and confidence. we're to providing a seamless experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
     </div>
</div>
<div className='text-xl py-4'>
   <Title text1={"WHY"} text2={"CHOOSE US"} />
</div>

<div className='  flex flex-col md:flex-row text-sm mb-20'>
  <div className='border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
   <b>Quality Assurance:</b>
   <p className='text-gray-600'>At Forever, quality isn't an afterthought — it's built into every stage of development. Our Quality Assurance (QA) process ensures that every product we deliver is stable, secure, user-friendly, and ready to scale.</p>
  </div>
  <div className='border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
   <b>Convenience</b>
   <p className='text-gray-600'>At [Your Company Name], we understand that time is valuable. That’s why we design and develop solutions focused on delivering maximum convenience to our clients. From intuitive user interfaces to seamless integrations, our goal is to simplify complex processes and make technology work effortlessly for you.</p>
  </div>
  <div className='border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
   <b>Exceptional Customer Service:</b>
   <p className='text-gray-600'>At [Your Company Name], exceptional customer service is at the heart of everything we do. We believe that building strong, lasting relationships with our clients is just as important as delivering great technology.</p>
  </div>
</div>
<Newsletter />  

    </div>
   
  )
}

export default About