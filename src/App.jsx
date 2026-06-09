import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Catalogo from './components/Catalogo'
import SobreNosotros from './components/SobreNosotros'
import MundialProde from './components/MundialProde'
import Footer from './components/Footer'
import ProductPage from './pages/ProductPage'

export default function App() {
  const [productId, setProductId] = useState(null)

  const handleNavigate = (page) => {
    if (page === 'home') { setProductId(null); window.scrollTo(0, 0) }
  }

  const handleProductSelect = (id) => {
    setProductId(id)
    window.scrollTo(0, 0)
  }

  if (productId) {
    return (
      <div className="min-h-screen bg-bg text-white font-body">
        <Navbar onNavigate={handleNavigate} currentPage="product" />
        <ProductPage
          productId={productId}
          onBack={() => { setProductId(null); window.scrollTo(0, 0) }}
          onProductSelect={handleProductSelect}
        />
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg text-white font-body">
      <Navbar onNavigate={handleNavigate} currentPage="home" />
      <Hero onShopClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })} />
      <Catalogo onProductSelect={handleProductSelect} />
      <SobreNosotros />
      <MundialProde />
      <Footer />
    </div>
  )
}
