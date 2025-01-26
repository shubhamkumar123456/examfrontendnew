import React from 'react'

const Question = (props) => {
    const tagName = props.match.params.tags;
    console.log(tagName)
  return (
    <div>
      <h1>Question set page</h1>
    </div>
  )
}

export default Question
