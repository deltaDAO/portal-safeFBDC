import React, { ReactElement } from 'react'
import { ReactComponent as LogoAssetFull } from '@oceanprotocol/art/logo/logo.svg'
import LogoAssetBranding from '../../images/logo.png'
import { ReactComponent as LogoAsset } from '../../images/ocean-logo.svg'

import styles from './Logo.module.css'

export default function Logo({
  noWordmark,
  branding
}: {
  noWordmark?: boolean
  branding?: boolean
}): ReactElement {
  return branding ? (
    <>
      <img src={LogoAssetBranding} className={styles.brand} alt="logo" />
    </>
  ) : noWordmark ? (
    <LogoAsset className={styles.logo} />
  ) : (
    <LogoAssetFull className={styles.logo} />
  )
}
