import React, { useEffect } from "react"
import { Link } from "gatsby"
import "./Cards.css"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const scrollContainer = typeof document !== `undefined` ? document.getElementById("preview-articles") : null

export default function HighlightIssueCard(props) {
  const image = getImage(props.cover)

  const handleWheel = (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
  }

  useEffect(() => {
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel)
    }

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel)
    }
  })

  return (
    <div className="issue-preview">
      <div className="card issue special">
        <Link to={props.slug}>
          <GatsbyImage
            image={image}
            alt={props.title}
            placeholder="blurred"
            loading="lazy"
            href={props.slug}
          />
          <div className="content">
            <h4>{props.date}</h4>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            <p>{`>> Whole issue`}</p>
          </div>
        </Link>
      </div>
      <div className="preview-articles" id="preview-articles">
        {props.articles}
      </div>
    </div>
  )
}
