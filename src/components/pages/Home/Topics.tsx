import classNames from 'classnames/bind'
import React, { ReactElement } from 'react'
import Button from '../../atoms/Button'
import Markdown from '../../atoms/Markdown'
import styles from './Topics.module.css'
import { graphql, useStaticQuery } from 'gatsby'
import Img, { FluidObject, GatsbyImageProps } from 'gatsby-image'

const cx = classNames.bind(styles)

interface TTopic {
  svg: 'data_sovereignty' | 'ai_sovereignty'
  title: string
  content: string
  cta?: {
    call: string
    action: string
  }
}

interface image {
  node: { name: string; id: string; childImageSharp: GatsbyImageProps }
}

interface TTopicWithImage extends TTopic {
  image: FluidObject
}

const topicQuery = graphql`
  query TopicQuery {
    topics: file(relativePath: { eq: "pages/home/topics.json" }) {
      childHomeJson {
        topics {
          svg
          title
          content
        }
      }
    }
    images: allFile(filter: { relativeDirectory: { eq: "topics" } }) {
      edges {
        node {
          id
          name
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default function Topics(): ReactElement {
  const data = useStaticQuery(topicQuery)
  const topics = data.topics.childHomeJson.topics.map((e: TTopic) => {
    const image = data.images.edges.filter((x: image) => x.node.name === e.svg)
    return { ...e, image: image[0].node.childImageSharp.fluid }
  })

  return (
    <>
      {(topics as TTopicWithImage[]).map((topic, i) => (
        <div
          key={topic.title}
          className={
            i % 2 === 1
              ? cx({ container: true, mirror: true })
              : styles.container
          }
        >
          <div className={styles.svg}>
            <Img fluid={topic.image} alt={topic.title} />
          </div>
          <div className={styles.content}>
            <div className={styles.index}>
              <p className={styles.fractionNumber}>20</p>
              <p className={styles.fractionNumber}>21</p>
            </div>
            <h2>{topic.title}</h2>
            <Markdown text={topic.content} />
            {topic.cta && (
              <Button to={topic.cta.action} style="primary" target="_blank">
                {topic.cta.call}
              </Button>
            )}
          </div>
        </div>
      ))}
    </>
  )
}
