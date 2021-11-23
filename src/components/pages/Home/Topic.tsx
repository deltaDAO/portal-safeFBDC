import classNames from 'classnames/bind'
import React, { ReactElement } from 'react'
import Button from '../../atoms/Button'
import Markdown from '../../atoms/Markdown'
import styles from './Topic.module.css'

const cx = classNames.bind(styles)

export type TTopic = {
  svg: 'data_sovereignty' | 'ai_sovereignty'
  title: string
  content: string
  cta?: {
    call: string
    action: string
  }
}

export default function Topic({
  svgComponent,
  topic,
  mirror
}: {
  svgComponent: ReactElement
  topic: TTopic
  mirror?: boolean
}): ReactElement {
  const containerClasses = cx({ container: true, mirror: mirror })

  return (
    <div className={containerClasses}>
      <div className={styles.svg}>{svgComponent}</div>
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
  )
}
