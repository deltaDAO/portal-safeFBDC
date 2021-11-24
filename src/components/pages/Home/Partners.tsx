import React, { ReactElement } from 'react'
import styles from './Partners.module.css'
import { graphql, useStaticQuery } from 'gatsby'
import Img, { FluidObject, GatsbyImageProps } from 'gatsby-image'

interface partner {
  name: string
  website: string
}

interface logo {
  node: { name: string; id: string; childImageSharp: GatsbyImageProps }
}

interface partnerWithLogo extends partner {
  logo: FluidObject
}

const partnersQuery = graphql`
  query partnersQuery {
    partners: file(relativePath: { eq: "pages/home/partners.json" }) {
      childHomeJson {
        partners {
          name
          website
        }
      }
    }
    logos: allFile(filter: { relativeDirectory: { eq: "partners" } }) {
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

export default function Partners(): ReactElement {
  const data = useStaticQuery(partnersQuery)
  const partners = data.partners.childHomeJson.partners.map((e: partner) => {
    const logo = data.logos.edges.filter((x: logo) => x.node.name === e.name)
    return { ...e, logo: logo[0].node.childImageSharp.fluid }
  })

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Partners</h2>
      <div className={styles.list}>
        {partners.map((e: partnerWithLogo, i: number) => (
          <div key={i} className={styles.partner}>
            <a href={e.website} target="_blank" rel="noopener noreferrer">
              <Img fluid={e.logo} alt="partner logo" />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
