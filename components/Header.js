import Link from 'next/link'
import {signOut} from '../lib/auth'
import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css';

import { Menu } from 'semantic-ui-react'

const fooDBStyle = {
    marginLeft: '8px'
}

const logoStyle = {
    width: '30px'
}

export default class Header extends Component {
  render() {

    return (
      <Menu stackable>
        <Menu.Item>
          <img style={logoStyle} src='https://i.imgur.com/HOACCe3.png' /> <span style={fooDBStyle}><b>FooDB</b></span>
        </Menu.Item>
        {this.props.did ?
        <>
        <Link href={"/driver?id="+this.props.did}>
        <Menu.Item
            name='Deliveries'
        >Deliveries</Menu.Item>
        </Link>
        <Link href={"/driver/profile?id="+this.props.did}>
        <Menu.Item
            name='Deliveries'
        >Profile</Menu.Item>
        </Link>
        </> :
        <Link href="/">
        <Menu.Item
          name='home'
        >
          Home
        </Menu.Item>
        </Link>
        }
        {(this.props.auth && !this.props.did)?
        <Link href="/user">
        <Menu.Item
            name='profile'
        >Profile</Menu.Item>
        </Link> : <></>
        }
        {this.props.auth ?
            <>
            <Menu.Item
                name='sign-out'
                onClick={signOut}
            >Sign out</Menu.Item>
            </> : 
            <>
            <Link href="/user/signin">
            <Menu.Item
                name='sign-in'
            >Sign in</Menu.Item>
            </Link>
            <Link href="/user/register">
            <Menu.Item
                name='register'
            >Register</Menu.Item>
            </Link>
            </>
        }
        {this.props.did ?
        <>
        </> : <>
        <Link href="/driver/signin">
        <Menu.Item
          name='deliver'
        >
          Deliver
        </Menu.Item>
        </Link>
        </>
        }
        
      </Menu>
    )
  }
}
