import Header from './Header'
import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = () => {
  console.log("ROUTE STARTED")
  NProgress.start()}
Router.onRouteChangeComplete = () => {console.log("route done")
NProgress.done()}
Router.onRouteChangeError = () => NProgress.done()

const layoutStyle = {
  margin: 20,
  padding: 20,
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <Header auth={props.auth} did={props.did}/>
    {props.children}
  </div>
)

export default Layout