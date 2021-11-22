import React, { ReactElement } from 'react'
import styles from './Header.module.css'
import { graphql, useStaticQuery } from 'gatsby'
import Markdown from '../../atoms/Markdown'
import Logo from '../../atoms/Logo'

const contentQuery = graphql`
  query TaglineQuery {
    file(relativePath: { eq: "pages/home/intro.json" }) {
      childHomeJson {
        title
        desc
      }
    }
  }
`

export default function Header(): ReactElement {
  const data = useStaticQuery(contentQuery)
  const { title, desc } = data.file.childHomeJson

  return (
    <div className={styles.container}>
      <h2 className={styles.tagLine}>{title}</h2>
      <Markdown className={styles.description} text={desc} />
      <a
        href="https://oceanprotocol.com/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <Logo />
      </a>
    </div>
  )
}
