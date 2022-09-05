import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Container from '@mui/material/Container';
import TableComponent from './TableComponent';

export default function TableView() {

  const [postsFull, setPostsFull] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function getPostsFromApi() {
    try {
      const responseJson = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPostsFull(responseJson.data)
      setIsLoading(false)
     } catch(error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    getPostsFromApi()
  }, [])

  if (isLoading) {
    return <span data-testid="loading">Loading</span>
  }

  return (
    <>
      <Container>
        <TableComponent data={postsFull} />
      </Container>
    </>
  )
}
