import Link from 'next/link'
import {signOut} from '../lib/auth'

const linkStyle = {
    marginRight: 15
}

const logout = () => {
    signOut()
}

const Header = (props) => {
    return (
        <div>
            <Link href="/">
                <a style={linkStyle}>Home</a>
            </Link>
            {props.auth ?
            <>
            <Link href="/user">
                <a style={linkStyle}>Profile</a>
            </Link>
            <a href="#" style={linkStyle} onClick={logout}>Sign out</a>
            </>
            :
            <>
            <Link href="/user/signin">
                <a style={linkStyle}>Sign in</a>
            </Link>    
            <Link href="/user/register">
                <a style={linkStyle}>Register</a>
            </Link>    
            </>
            }
        </div>
    )
}

export default Header