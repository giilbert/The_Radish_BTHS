import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import IssueCard from "../Cards/IssueCard.js"
import "./Sidebar.css"

export default function Navbar() {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        sort: {order: DESC, fields: [frontmatter___date]}
        limit: 1000
        filter: {fields: {slug: {regex: "^/issues/"}}}
      ) {
        edges {
          node {
            id
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              url
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  // const [scrolled, setScrolled] = useState(false);
  //
  // const handleResize = () => {
  //     const offset = window.scrollY;
  //     let navbar = document.getElementById("navbar");
  //     if(offset > navbar.offsetHeight ){
  //       setScrolled(true);
  //     }
  //     else{
  //       setScrolled(false);
  //     }
  //   }
  //
  // useEffect(() => {
  //   window.addEventListener('resize', handleResize)
  // })

  return (
    <div className="sidebar">
      {
        data.allMarkdownRemark.edges.map(({node}) => {
          return (
            <IssueCard
              key={node.id}
              slug={node.fields.slug}
              title={node.frontmatter.title}
            />
          )
        })
      }
    </div>
  )
}