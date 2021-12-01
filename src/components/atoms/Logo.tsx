import React, { ReactElement } from 'react'
import { ReactComponent as LogoAssetFull } from '@oceanprotocol/art/logo/logo.svg'
import { ReactComponent as LogoAsset } from '../../images/ocean-logo.svg'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

import styles from './Logo.module.css'

const logoQuery = graphql`
  query LogoQuery {
    file(relativePath: { eq: "logo.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default function Logo({
  noWordmark,
  branding
}: {
  noWordmark?: boolean
  branding?: boolean
}): ReactElement {
  const data = useStaticQuery(logoQuery)

  return branding ? (
    <>
      <Img
        fluid={data.file.childImageSharp.fluid}
        className={styles.brand}
        alt="logo"
      />
    </>
  ) : noWordmark ? (
    <LogoAsset className={styles.logo} />
  ) : (
    <LogoAssetFull className={styles.logo} />
  )
}
