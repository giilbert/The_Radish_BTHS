import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import Masonry from "react-masonry-css"
import { ParallaxBanner } from 'react-scroll-parallax';

import Share from "../components/Share/Share.js"
// import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Articard, IssueCard } from "../components/Cards/index"
import { Arrow } from "../components/Cards/Icons"

// import Banner from "../components/Banner/Banner.js"

const breakpointColumnsObj = {
  default: 3,
  1000: 2,
  600: 1,
}

export default function Issue({
  location,
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { site, issue, articles, more } = data

  // const image = getImage(issue.fields.rel_cover)

  return (
    <Layout pageName={issue.frontmatter.title}>
      {
      // <div className="page-title">
      //   <h1>{issue.frontmatter.title}</h1>
      //   <h3>{issue.frontmatter.date}</h3>
      //   <p>{issue.frontmatter.description}</p>
      //   <a
      //     href={issue.frontmatter.pdf}
      //     target="_blank"
      //     rel="noreferrer"
      //     className="color-under-link"
      //   >
      //     <b>Read the PDF</b>
      //   </a>
      //   <p />
      //   <div className="cover-container">
      //     <div className="cover">
      //       <GatsbyImage
      //         image={image}
      //         alt={issue.frontmatter.title}
      //         placeholder="blurred"
      //       />
      //     </div>
      //   </div>
      // </div>
      }

      <ParallaxBanner
        className="parallax-banner"
        layers={[
            {
                image: issue.frontmatter.cover,
                amount: 0.3,
            },
            {
                children:
                  <div id='banner-children'>
                    <h1>{issue.frontmatter.title}</h1>
                    <h3>{issue.frontmatter.date}</h3>
                    <a
                      href={issue.frontmatter.pdf}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <b>Read PDF</b>
                    </a>
                    <br />
                    <Share
                      description={issue.frontmatter.description}
                      url={site.siteMetadata.mainUrlNameChangedBcFckGatsby + location.pathname}
                    />
                  </div>
                ,
                amount: 0,
            }
        ]}
        style={{
            height: 'max(400px, 40vh)',
        }}
      />

      <div className="page-content">
        {issue.frontmatter.description ?
          <div className="page-title issue-description">
            <p dangerouslySetInnerHTML={{ __html: issue.frontmatter.description }} />
          </div>
          : null
        }

        <p />
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {articles.edges.map(({ node }) => {
            return (
              <Articard
                key={node.id}
                slug={node.fields.slug}
                title={node.frontmatter.title}
                excerpt={node.excerpt}
                authors={node.frontmatter.authors}
                tags={node.frontmatter.tags}
                description={node.frontmatter.description}
              />
            )
          })}
        </Masonry>
        <h1 className="page-title">
          <Link to="/issues/">{`More issues`}</Link>
        </h1>
        <div className="card-grid">
          {more.edges.map(({ node }) => {
            return (
              <IssueCard
                key={node.id}
                slug={node.fields.slug}
                date={node.frontmatter.date}
                title={node.frontmatter.title}
                cover={node.fields.rel_cover}
                description={node.frontmatter.description}
              />
            )
          })}
        </div>
        <br />
        <h3 className="home-action"><Link to='/issues'>{`All issues`}<Arrow /></Link></h3>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query issue($slug: String!, $title: String!) {
    site {
      siteMetadata {
        mainUrlNameChangedBcFckGatsby
      }
    }
    issue: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        description
        date(formatString: "MMMM DD, YYYY")
        title
        pdf
        cover
      }
      #fields {
      #  rel_cover {
      #    childImageSharp {
      #      gatsbyImageData(placeholder: BLURRED)
      #    }
      #  }
      #}
    }
    articles: allMarkdownRemark(
      filter: {
        frontmatter: { issue: { eq: $title } }
        fields: { slug: { regex: "^/articles/" } }
      }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 100)
          frontmatter {
            title
            description
            authors {
              author
            }
            tags {
              tag
            }
          }
          fields {
            slug
          }
        }
      }
    }
    more: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 3
      filter: { fields: { slug: { regex: "^/issues/", ne: $slug } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            description
            date(formatString: "MMMM YYYY")
            title
          }
          fields {
            slug
            rel_cover {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
  }
`
