import React, { useEffect, useState } from 'react'
import styles from "./Header.module.scss"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { logout, RESET_AUTH } from '../../redux/features/auth/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLinks';
import { UserName } from '../../pages/profile/Profile';
import { AdminOnlyLink } from '../hiddenLink/AdminOnlyRoute';
import { CALCULATE_TOTAL_QUANTITY, selectCartItems, selectcartTotalQuantity } from '../../redux/features/cart/cartSlice';

export const logo = (
    <div className={styles.logo}>
        <Link to="/">
            <h2>
                shop<span>Ito</span>
            </h2>
        </Link>
    </div>
)

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "")


const Header = () => {
    const [showMenu, setShowMenu] = useState(false)
    const [scrollPage, setScrollPage] = useState(false);
    const cartTotalQuantity = useSelector(selectcartTotalQuantity)
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fixNavbar = () => {
        if (window.scrollY > 50) {
            setScrollPage(true)
        } else {
            setScrollPage(false)
        }
    }
    window.addEventListener("scroll", fixNavbar)

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }
    const hideMenu = () => {
        setShowMenu(false)
    }

    const logoutUser = async () => {
        await dispatch(logout())
        await dispatch(RESET_AUTH())
        navigate('/login')
    }

    useEffect(() => {
        dispatch(CALCULATE_TOTAL_QUANTITY())
    },[dispatch, cartItems])


    const cart = (
        <span className={styles.cart}>
            <Link to="/cart">
                cart
                <FaShoppingCart size={20} />
                <p>{cartTotalQuantity}</p>
            </Link>
        </span>
    )
    return (
        <header className={scrollPage ? `${styles.fixed}` : null}>
            <div className={styles.header}>
                {logo}
                <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-menu"]}`}>

                    <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`} onClick={hideMenu}></div>
                    <ul>
                        <li className={styles["logo-mobile"]}>
                            {logo}
                            <FaTimes size={22} color='#fff' onClick={hideMenu} />
                        </li>
                        <li>
                            <NavLink to="/shop" className={activeLink}>Shop</NavLink>
                        </li>
                        <li>
                            <AdminOnlyLink>
                                <NavLink to="/admin/home" className={activeLink}>| Admin</NavLink>
                            </AdminOnlyLink>

                        </li>
                    </ul>

                    <div className={styles["header-right"]}>
                        <span className={styles.links}>
                            <ShowOnLogin>
                                <Link to={"profile"}>
                                    <FaUserCircle size={16} color='#ff7722' />
                                    <UserName />
                                </Link>
                            </ShowOnLogin>

                            <ShowOnLogout>
                                <NavLink to={"login"} className={activeLink}>Login</NavLink>
                            </ShowOnLogout>
                            <ShowOnLogout>
                                <NavLink to={"register"} className={activeLink}>Register</NavLink>
                            </ShowOnLogout>

                            {/* <ShowOnLogout>
                       <NavLink to={"register"} className={activeLink}>register</NavLink>
                       </ShowOnLogout> */}

                            <ShowOnLogin>
                                <NavLink to={"order-history"} className={activeLink}>My order</NavLink>
                            </ShowOnLogin>

                            <ShowOnLogin><Link to={"/"} onClick={logoutUser}>Logout</Link></ShowOnLogin>



                        </span>
                        {cart}
                    </div>
                </nav>
                <div className={styles["menu-icon"]}>
                    {cart}
                    <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
                </div>
            </div>
        </header>
    )
}

export default Header