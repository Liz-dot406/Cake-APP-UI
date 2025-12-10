import { About } from "../about/About"
import { Cakes } from "../cakes/Cakes"
import Contact from "../contact/Contact"
import { Footer } from "../footer/Footer"
import { Hero } from "../Hero"
import { Navbar } from "../navabr/Navbar"




const Landingpage = () => {
  return (
    <div>
       <Navbar/>
       <Hero/>
        <About/>
        <Cakes/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default Landingpage