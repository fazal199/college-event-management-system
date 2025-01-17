import React from 'react'

const GridMainContent = ({ children }: any) => {
  return (
    <section className='h-full'>
      <div className='gridmaincontainer h-full'>
        {children}
      </div>
    </section>
  )
}

export default GridMainContent
