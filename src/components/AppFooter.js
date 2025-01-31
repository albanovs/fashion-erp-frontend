import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://fashionrynok.kg" target="_blank" rel="noopener noreferrer">
          fashionrynok
        </a>
        <span className="ms-1">&copy; 2025 все права защищены.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Разработано</span>
        <a href="https://wa.me/996500991414" target="_blank" rel="noopener noreferrer">
          albvnovs
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
