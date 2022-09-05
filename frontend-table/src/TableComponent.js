import React, {useState, useMemo} from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { TextField } from '@mui/material';

import Pagination from './Pagination'

const PAGE_SIZE = 10;

export default function TableComponent({data}) {

  const[tableData, setTableData] = useState([])
  const[searchedData, setSearchedData] = useState(data)
  const[tableHeading] = useState(Object.keys(data[0]))
  
  const[checked] = useState(new Map())
  const[selectedItems, setSelectedItems] = useState()

  const [currentPage, setCurrentPage] = useState(1);


  useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;
    setTableData(searchedData.slice(firstPageIndex, lastPageIndex))
  }, [currentPage, searchedData]);


  const handleCheckbox = (event) => {
    if (event.target.checked) {
      checked.set(event.target.getAttribute('data-index'), tableData[event.target.getAttribute('data-index')])
    } else {
      checked.delete(event.target.getAttribute('data-index'))
    }
    setSelectedItems(JSON.stringify(Object.fromEntries(checked)))
  }

  const search = (event) => {
    //convert input text to lower case
    var lowerCase = event.target.value.toLowerCase();
    setSearchedData(
      data.filter(el => {
        return (
          el.body.includes(lowerCase)
        )
      })
    )
  };

  const compare = ( a, b ) => {
    if ( a.title < b.title ){
      return -1;
    }
    if ( a.title > b.title ){
      return 1;
    }
    return 0;
  }

  const sort = () => {
    const copy = tableData.slice().sort(compare)
    setTableData(copy)
  };

  return (
    <>
      <div>
        <br />
        <br />
        <TextField onChange={search} label="Search Body Column"></TextField>
        <br />
        <br />
      </div>
      <button onClick={sort}>Sort By Title</button>
      <h2 data-testid="tableHeading">Table</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell key="select"><b>Select</b></TableCell>
            {
              // Have table header to be dynamic
              tableHeading.map((item, key) => {
                return (
                  <TableCell 
                    key={key} 
                    filterkey={item} 
                    className="cell" 
                    casesensitive={"true"}
                    showsearch={"true"}
                  >
                    <b>{item}</b>
                  </TableCell>
                )
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            // Have table data to be dynamic
            tableData.map(data => {
            return (
              <TableRow key={data.id}>
                <TableCell><input key={data.id} data-index={data.id} type="checkbox" onChange={handleCheckbox}></input></TableCell>
                {
                  Object.values(data).map((item, key) => {
                    return (
                      <TableCell key={key} style={{ padding: 0 }}>{item}</TableCell>
                    )
                  })
                }
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={searchedData.length}
        pageSize={PAGE_SIZE}
        onPageChange={page => setCurrentPage(page)}
      />

      {/* Display selected items */}
      <h2>Selected Items</h2>
      <p>{selectedItems}</p>
    </>
  )
}