import React, {useState, useEffect} from 'react'

import TableFilter from "react-table-filter";
import "react-table-filter/lib/styles.css";

export default function TableComponent({data}) {

  const[tableData, setTableData] = useState(data)
  const[tableHeading, setTableHeading] = useState(Object.keys(data[0]))
  
  const[checked, setChecked] = useState(new Map())
  const[selectedItems, setSelectedItems] = useState()

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
    setTableData(
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
        <button onClick={sort}>Sort By Title</button>
        Search Body:
        <input onChange={search}></input>
      </div>
      <table border="1">
        <thead>
          <tr>
            <th key="check">Check</th>
            {
              tableHeading.map((item, key) => {
                return (
                  <th 
                    key={key} 
                    filterkey={item} 
                    className="cell" 
                    casesensitive={"true"}
                    showsearch={"true"}
                  >
                    {item}
                  </th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
          {tableData.map(data => {
            return (
              <tr key={data.id}>
                <td><input key={data.id} data-index={data.id} type="checkbox" onChange={handleCheckbox}></input></td>
                {
                  Object.values(data).map((item, key) => {
                    return (
                      <td key={key}>{item}</td>
                    )
                  })
                }
              </tr>
            )
          })}
        </tbody>
      </table>
      
      <h2>Selected Items</h2>
      <p>{selectedItems}</p>
    </>
    
  )
}