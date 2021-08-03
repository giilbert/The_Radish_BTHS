import React, {
  useState,
  // useEffect
} from "react"
import Navbar from "./Navbar/Navbar"
import Sidebar from "./Sidebar/Sidebar"
import Footer from "./Footer/Footer"

import "./Layout.css"

export default function Layout({ children, pageName }) {
  const [showSidebar, setShowSidebar] = useState(false, "showSidebar")

  return (
    <>
      <title>{pageName ? `${pageName} | ` : ``}The Radish</title>
      <a className="screen-reader-shortcut" href="#main-content">
        Skip to main content
      </a>
      <Navbar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <div className="rest-of-page">
        <main id="main-content" tabIndex="-1">{children}</main>
        <Footer showSidebar={showSidebar} />
      </div>
    </>
  )
}
