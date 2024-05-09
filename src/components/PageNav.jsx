import { NavLink } from 'react-router-dom'
import { ROUTES } from '~/utils/constants'
import Logo from './Logo'
import styles from './PageNav.module.css'

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to={ROUTES.PRICING}>Pricing</NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.PRODUCT}>Product</NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.LOGIN} className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default PageNav
