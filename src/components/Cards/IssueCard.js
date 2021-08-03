import React from "react"
import { Link } from "gatsby"
import "./Cards.css"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function Articard(props) {
  const image = getImage(props.cover)

  return (
    <div className="card issue">
      <Link to={props.slug}>
        <GatsbyImage image={image} alt={props.title} placeholder="blurred" href={props.slug} />
        <div className="content">
          <h4>{props.date}</h4>
          <h2>{props.title}</h2>
        </div>
      </Link>
    </div>
  )
}
