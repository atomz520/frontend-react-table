import React, {useState, useEffect, useMemo} from 'react'

import Pagination from './Pagination'

let PageSize = 10;

export default function TableView() {

  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])

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
      setIsLoading(false)
      setCurrentPage(1)
     } catch(error) {
      console.error(error);
    }
  }

  const Header = ({ array }) => {
    let counter = 0;
    const headers = Object.keys(array[0] ?? {});
    return headers.map((x) => {
      ++counter;
      return (
        <th key={counter}>
          {x}
        </th>
      );
    });
  };
  
  useEffect(() => {
    getPostsFromApi()
    getUsersFromApi()
  }, [])

  if (isLoading) {
    return 'Loading'
  }

  return (
    <>
      <div>TableView</div>
      <table>
        <thead>
          <tr>
            <Header array={posts} />
          </tr>
        </thead>
        <tbody>
          {currentTableData.map(post => {
            return (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.userId}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={posts.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
    

  )
}
