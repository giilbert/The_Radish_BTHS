import React, {
  useEffect
} from "react"
import { Link } from "gatsby"
import "./Cards.css"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
// import Arrow from "./Arrow.js"

const scrollContainer = typeof document !== `undefined` ? document.getElementById("preview-articles") : null

export default function HighlightIssueCard(props) {
  const image = getImage(props.cover)

  // Wheel horizontal scrolling
  const handleWheel = (evt) => {
    const innerWidth =  window.innerWidth;
    // When there's horizontal scrolling
    if (innerWidth <= 600) {
      const endOfContainer = (scrollContainer.scrollLeft !== (scrollContainer.scrollWidth - scrollContainer.offsetWidth))
      // if ((scrollContainer.scrollLeft === 0) && (evt.deltaY > 0)){
      //   console.log(evt.deltaY)
      // }
      if (endOfContainer || (evt.deltaY < 0)){
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY;
      }
    }
  }

  useEffect(() => {
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel)
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheel)
      }
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
            {
            // <h4>{props.date}</h4>
            }
            <h2>{props.title}</h2>
            <p>{props.description}</p>
          </div>
        </Link>
      </div>
      <div className="preview-articles" id="preview-articles">
        {props.articles}
      </div>
    </div>
  )
}
