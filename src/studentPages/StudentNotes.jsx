import React from 'react'
import ThemeProvider from '../components/ThemeProvider'
import ShowNotes from '../components/ShowNotes'

const StudentNotes = () => {
  return (
  <ThemeProvider>
  <div>
      <h1>This is student notes page</h1>
      <ShowNotes/>
    </div>

  </ThemeProvider>
  )
}

export default StudentNotes
