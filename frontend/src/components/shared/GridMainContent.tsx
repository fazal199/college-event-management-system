import React from 'react'

const GridMainContent = ({ children,sectionClass }: any) => {
  return (
    <section className={`h-full ${sectionClass}`}>
      <div className='gridmaincontainer h-full'>
        {children}
      </div>
    </section>
  )
}

export default GridMainContent
