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
      <div className="bg-gradient-to-r from-violet-600 from-30% via-violet-800 via-50% to-violet-600 to 70%">
        <div className="container mx-auto max-w-[800px]">
          <div className="flex flex-col h-screen overflow-y-auto">
            {sortedData &&
              <div className="pt-28 p-10" >
                {sortedData.map((e, i) =>
                  <div
                    className="flex p-2 m-2 border rounded-lg justify-between"
                    key={i}
                  >
                    <div className="flex flex-col">
                      <p
                        className="m-1 bg-gradient-to-r from-blue-500 to-purple-500 py-3 font-bold rounded-lg p-4 text-white max-w-sm flex justify-center"
                      >
                        {e.username}</p>
                      <p
                        className="m-1 bg-gradient-to-r from-blue-500 to-purple-500 py-3 font-bold rounded-lg p-4 text-white max-w-sm flex justify-center"
                      >
                        {new Date(e.date).toLocaleString()}</p>
                    </div>
                    <div className="p-2 flex-grow">
                      {
                        (e.conversation).map((msg, index) => (
                          <div
                            key={index}
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} p-1`}
                          >
                            <p
                              className={`${msg.type === 'user' ? 'bg-purple-500' : 'bg-gray-800'} rounded-lg p-1 text-white max-w-sm`}
                            >{msg.message}</p>
                          </div>
                        ))
                      }</div>
                  </div>
                )}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
