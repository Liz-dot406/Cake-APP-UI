import { About } from "../about/About"
import { Cakes } from "../cakes/Cakes"
import Contact from "../contact/Contact"
import { Footer } from "../footer/Footer"

import { Hero } from "../Hero"
import {Login} from "../login/Login"
import { Navbar } from "../navabr/Navbar"
import { Register } from "../register/Register"



const Landingpage = () => {
  return (
    <div>
       <Navbar/>
       <Hero/>
        <About/>
        <Cakes/>
        <Login/>
        <Register/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default Landingpage