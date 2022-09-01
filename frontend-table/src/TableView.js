import React, {useState, useEffect, useMemo} from 'react'

import Container from '@mui/material/Container';

import TableComponent from './TableComponent';

let PageSize = 10;

export default function TableView() {

  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [postsFull, setPostsFull] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return posts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  async function getUsersFromApi() {
    try {
      let response = await fetch('https://jsonplaceholder.typicode.com/users');
      let responseJson = await response.json();
      setUsers(responseJson)
     } catch(error) {
      console.error(error);
    }
  }

  async function getPostsFromApi() {
    try {
      let response = await fetch('https://jsonplaceholder.typicode.com/posts');
      let responseJson = await response.json();
      setPosts(responseJson)
      setPostsFull(responseJson)
      setIsLoading(false)
      setCurrentPage(1)
     } catch(error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    getPostsFromApi()
    getUsersFromApi()
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
