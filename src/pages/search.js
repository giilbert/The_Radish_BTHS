import React, { useState } from "react"
import { graphql } from 'gatsby';
import { useFlexSearch } from 'react-use-flexsearch';

import SearchBar from "../components/SearchBar/SearchBar.js"
import Layout from "../components/Layout"
import Articard from "../components/Cards/Articard.js"
import "../components/Articles/Articles.css"

// Helpful: https://www.emgoto.com/gatsby-search/
export default function Search({
  data : {
    localSearchPages: { index, store },
    allMarkdownRemark: { nodes },
  },
}) {
  const isBrowser = typeof window !== "undefined"; // SSR error
  const { search } = isBrowser ? window.location : '';
  const query = search ? new URLSearchParams(search).get('s') : '';

  const [searchQuery, setSearchQuery] = useState(query || '');

  // could try using posts instead of results but...
  // const posts = searchQuery ? results : nodes // Might have weird behavior I don't wanna deal with rn
  const results = useFlexSearch(searchQuery, index, store);

  return (
    <Layout>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="frontpage">
        {results.map(result =>
          <Articard
            key={result.id}
            slug={result.slug}
            title={result.title}
            excerpt={result.excerpt}
            date={result.date}
          />
        )}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Searching {
    localSearchPages {
      index
      store
    }
    allMarkdownRemark( # We can default to just returning articles
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
      filter: { fields: { slug: { regex: "^/articles/" } } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 100)
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            authors {
              author
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`