import React, { useEffect, useState } from "react";
import {HiArrowRight, HiArrowLeft} from "react-icons/hi"

const HomeScreen = () => {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);


  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const displayData = (data) => {
    return (
      <ul>
        {data.length > 0 &&
          data.map((todo, index) => {
            return <li key={index}>{todo.title}</li>;
          })}
      </ul>
    );
  };
  
  const pages:any = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const pageItems = data.slice(indexOfFirstItem, indexOfLastItem);


const handleClick = (event) => {
  setCurrentPage(Number(event.target.id));
};


const handleNextbtn = () => {
  setCurrentPage(currentPage + 1);
  if (currentPage + 1 > maxPageNumberLimit) {
    setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
    setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
  }
};

const handlePrevbtn = () => {
  setCurrentPage(currentPage - 1);
  if ((currentPage - 1) % pageNumberLimit == 0) {
    setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
  }
};

const renderPageNumbers = pages.map((number) => { 
  if (number < maxPageNumberLimit +1 && number > minPageNumberLimit) {
    return (
      <li
        key={number}
        id={number}
        onClick={handleClick}
        // className= {currentPage == number ? "active" : null}
        className= {`p-1 ${
          number === currentPage ? "bg-green-500" : "bg-red-500"
        } rounded w-[30px] h-[30px] flex justify-center m-3`}
      >
        {number}
      </li>
    );
  } else {
    return null;
  }
});


  return (
    <div>
      <h1>Pagination Component</h1>
      <br />
      {displayData(pageItems)}
      <ul className="pageNumbers">
            <li>
            <button
                onClick={handlePrevbtn}
                disabled={currentPage == pages[0] ? true : false}
            > <HiArrowLeft />
            </button>
            </li>
   
            {renderPageNumbers}

            <li>
            <button
                onClick={handleNextbtn}
                disabled={currentPage == pages[pages.length - 1] ? true : false}
            > <HiArrowRight />
            </button>
            </li>
      </ul>
     
    </div>
  );
};

export default HomeScreen;
