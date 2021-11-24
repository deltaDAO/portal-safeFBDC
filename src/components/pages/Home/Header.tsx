import { graphql, useStaticQuery } from 'gatsby'
import React, { ReactElement } from 'react'
import Markdown from '../../atoms/Markdown'
import styles from './Header.module.css'

const contentQuery = graphql`
  query HeaderQuery {
    intro: markdownRemark(
      fileAbsolutePath: { regex: "/pages/home/header.md$/" }
    ) {
      frontmatter {
        title
      }
      rawMarkdownBody
    }
  }
`

export default function Header(): ReactElement {
  const data = useStaticQuery(contentQuery)
  const { frontmatter, rawMarkdownBody } = data.intro

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.index}>
          <p className={styles.fractionNumber}>20</p>
          <p className={styles.fractionNumber}>21</p>
        </div>
        <h2>{frontmatter.title}</h2>
        <Markdown text={rawMarkdownBody} />
      </div>
    </div>
  )
}
