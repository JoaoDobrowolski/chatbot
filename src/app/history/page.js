'use client';
import Header from '@/components/Header';
import { fetchGetChat } from '@/helpers/fetchData';
import React, { useEffect, useState } from 'react';

export default function history() {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    getChatData();
  }, []);

  useEffect(() => {
    setSortedData(data.sort((b, a) => new Date(a.date) - new Date(b.date)));
  }, [data]);

  const getChatData = async () => {
    try {
      setData(await fetchGetChat());
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <Header />
      <div>
        {sortedData &&
          <div className="pt-28 p-10" >
            {sortedData.map((e, i) =>
              <div
                className="flex p-2"
                key={i}
              >
                <p className="p-2">{e.username}</p>
                <p className="p-2">{e.date}</p>
                <div className="p-2">{
                  (e.conversation).map((msg, index) => (
                    <div key={index}>
                      <p>{`${msg.type}: ${msg.message}`}</p>
                    </div>
                  ))
                }</div>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
}
