import React, { ReactElement } from 'react'
import styles from './Partners.module.css'
import deloitte from '../../../images/partners/deloitte.png'
import sapFioneer from '../../../images/partners/sap_fioneer.png'
import spotixx from '../../../images/partners/spotixx.png'
import techQuartier from '../../../images/partners/tech_quartier.png'

const partners = [
  { logo: deloitte, website: 'https://www2.deloitte.com/de/de.html' },
  { logo: sapFioneer, website: 'https://sapfioneer.com/' },
  { logo: spotixx, website: 'https://spotixx.com/' },
  { logo: techQuartier, website: 'https://techquartier.com/' }
]

export default function Partners(): ReactElement {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Partners</h2>
      <div className={styles.list}>
        {partners.map((e, i) => (
          <div key={i} className={styles.partner}>
            <a href={e.website} target="_blank" rel="noopener noreferrer">
              <img src={e.logo} alt="partner logo" />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
