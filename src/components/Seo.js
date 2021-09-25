// https://github.com/LekoArts/gatsby-starter-prismic/blob/master/src/components/SEO/SEO.jsx

import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

// Complete tutorial: https://www.gatsbyjs.org/docs/add-seo-component/

const Seo = ({ title, desc, banner, pathname, collection, node }) => {
  const { site } = useStaticQuery(query)

  const {
    buildTime,
    siteMetadata: {
      siteUrl,
      defaultTitle,
      defaultDescription,
      headline,
      defaultBanner,
    },
  } = site

  const seo = {
    title: title || defaultTitle,
    description: desc || defaultDescription,
    image: `${siteUrl}${banner || null}`,
    url: `${siteUrl}${pathname || ''}`,
  }

  // schema.org in JSONLD format
  // https://developers.google.com/search/docs/guides/intro-structured-data
  // You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')

  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    url: siteUrl,
    headline,
    mainEntityOfPage: siteUrl,
    description: defaultDescription,
    name: defaultTitle,
    dateModified: buildTime,
    image: {
      '@type': 'ImageObject',
      url: `${siteUrl}${defaultBanner}`,
    },
  }

  // Initial breadcrumb list

  const itemListElement = [
    {
      '@type': 'ListItem',
      item: {
        '@id': siteUrl,
        name: 'Homepage',
      },
      position: 1,
    },
  ]

  let schemaCollection = null

  if (collection) {
    schemaCollection = {
      '@context': 'http://schema.org',
      '@type': 'Article',
      publisher: {
        '@type': 'Organization',
        name: "The Radish",
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}`,
        },
      },
      datePublished: (node !== null ? node.date : null),
      description: seo.description,
      headline: seo.title,
      url: seo.url,
      name: seo.title,
      image: {
        '@type': 'ImageObject',
        url: seo.image,
      },
      mainEntityOfPage: seo.url,
    }
    // Push current blogpost into breadcrumb list
    itemListElement.push({
      '@type': 'ListItem',
      item: {
        '@id': seo.url,
        name: seo.title,
      },
      position: 2,
    })
  }

  const breadcrumb = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    description: 'Breadcrumbs list',
    name: 'Breadcrumbs',
    itemListElement,
  }

  return (
    <Helmet title={seo.title} property="og:title">
      <html lang="en" />
      <meta name="description" content={seo.description} property="og:description" />
      <meta name="image" content={seo.image} />
      <meta name="the-radish" content="The Radish BTHS" />
      {/* Insert schema.org data conditionally (webpage/collection) + everytime (breadcrumbs) */}
      {!collection && <script type="application/ld+json">{JSON.stringify(schemaOrgWebPage)}</script>}
      {collection && <script type="application/ld+json">{JSON.stringify(schemaCollection)}</script>}
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
    </Helmet>
  )
}

export default Seo

Seo.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  banner: PropTypes.string,
  pathname: PropTypes.string,
  collection: PropTypes.bool,
  node: PropTypes.object,
}

Seo.defaultProps = {
  title: null,
  desc: null,
  banner: null,
  pathname: null,
  collection: false,
  node: null,
}

const query = graphql`
  query SEO {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        siteUrl
        defaultTitle: title
        defaultDescription: description
        defaultBanner: banner
        headline
      }
    }
  }
`
