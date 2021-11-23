import React, { ReactElement, ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

import '../fonts/Moderat-Regular.otf'
import '@fontsource/overpass-mono'
import '../global/styles.css'

export default function Styles({
  children
}: {
  children: ReactNode
}): ReactElement {
  return (
    <>
      {children}
      <ToastContainer position="bottom-right" newestOnTop />
    </>
  )
}
