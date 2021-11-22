import React, { ReactElement } from 'react'
import styles from './Partners.module.css'
import partner01 from '../../../images/partners/partner_01.png'
import partner02 from '../../../images/partners/partner_02.png'
import partner03 from '../../../images/partners/partner_03.png'
import partner04 from '../../../images/partners/partner_04.png'
import partner05 from '../../../images/partners/partner_05.png'
import partner06 from '../../../images/partners/partner_06.png'
import partner07 from '../../../images/partners/partner_07.png'
import partner08 from '../../../images/partners/partner_08.png'
import partner09 from '../../../images/partners/partner_09.png'
import partner10 from '../../../images/partners/partner_10.png'
import partner11 from '../../../images/partners/partner_11.png'

const partners = [
  { logo: partner01, website: 'https://www2.deloitte.com/de/de.html' },
  { logo: partner02, website: 'https://www.deutsche-boerse.com/' },
  { logo: partner03, website: 'https://www.iml.fraunhofer.de/' },
  { logo: partner04, website: 'https://www.frankfurt-school.de/' },
  { logo: partner05, website: 'https://hawk.ai/' },
  { logo: partner06, website: 'https://www.helaba.com/' },
  { logo: partner07, website: 'https://main-incubator.com/' },
  { logo: partner08, website: 'https://sapfioneer.com/' },
  { logo: partner09, website: 'https://spotixx.com/' },
  { logo: partner10, website: 'https://www.tu-darmstadt.de/' },
  { logo: partner11, website: 'https://techquartier.com/' }
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
