import React, {useState, useEffect} from 'react'

import Container from '@mui/material/Container';
import TableComponent from './TableComponent';

export default function TableView() {

  const [postsFull, setPostsFull] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function getPostsFromApi() {
    try {
      let response = await fetch('https://jsonplaceholder.typicode.com/posts');
      let responseJson = await response.json();
      setPostsFull(responseJson)
      setIsLoading(false)
     } catch(error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    getPostsFromApi()
  }, [])

  if (isLoading) {
    return 'Loading'
  }

  return (
    <>
      <Container>
        <TableComponent data={postsFull} />
      </Container>
    </>
  )
}
