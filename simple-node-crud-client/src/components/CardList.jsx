/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import Card from '../elements/Card';
import Loading from '../elements/Loading';

export default function CardList ({ page = 1, Maindata, setMaindata, setcount }) {
  const [data, setdata] = useState([]);
  const [isloading, setisloading] = useState(false)
  const prevPage = useRef(page);
  useEffect(() => {
    if (Maindata.length > 0 && prevPage.current === page) {
      setdata(Maindata);
    } else {
      prevPage.current = page;
      FetchData();
    }
  }, [Maindata, page]);

  useEffect(() => {
    if (data.length <= 0) return;
    setMaindata(data);
  }, [data])

  const FetchData = async () => {
    setisloading(true);
    const res = await fetch(`https://backend-lobrockyl.herokuapp.com/?page=${page}`);
    const result = await res.json();
    if (result.success) {
      setdata(result.images);
      setcount(result.pages)
    }
    setisloading(false);
  };

  if (isloading) {
    return (<div className="flex items-center justify-center border-2 min-h-screen">
        <Loading text="Loading Images" />
    </div>
    )
  }

  return (
    <div className='container my-12 mx-auto px-4 md:px-12'>
      <div className='grid grid-cols-3 '>
        {data.length > 0 &&
          data.map((value) => {
            return (
              <div key={value._id}>
                <Card
                id={value._id}
                name={value.ImgName}
                image={value.ImgURL}
                detail={value.ImgDetails}
              />
              </div>
            );
          })}
          {data.length <= 0 && <div className='flex justify-center w-full text-gray-500 text-2xl font-bold'>No data Found!</div>}
      </div>
    </div>
  );
}
