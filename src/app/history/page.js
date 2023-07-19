'use client';
import Header from '@/components/Header';
import { fetchChat } from '@/helpers/fetchData';
import React, { useEffect, useState } from 'react';

export default function history() {
  const [data, setData] = useState([]);
  useEffect(() => {
    handleForm();
  }, []);

  const handleForm = async () => {
    try {
      setData(await fetchChat());
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <Header />
      <div>
        {data &&
          <div className="pt-28 p-10" >
            {data.map((e, i) =>
              <p key={i}>
                {e.username}
              </p>)}
          </div>
        }
      </div>
    </div>
  );
}
