import React from "react"
import Layout from "../components/Layout"
import AuthorCards from "../components/AuthorCards/AuthorCards"

export default function Authors() {
  return (
    <Layout>
      <h1>Authors</h1>
      <AuthorCards />
    </Layout>
  )
}