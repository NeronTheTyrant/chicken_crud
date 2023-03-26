import React, { FC, useEffect, useState } from 'react';

import { Chicken } from '@nest-react/domain'

import { API_URL } from '~/config';
import { Logger, checkServerVersion, chickenRun } from '~/utils';
import { createChicken, deleteChicken, getAllChickens } from '~/utils';

export const App: FC<unknown> = () => {
  const [chickens, setChickens] = useState<Chicken[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchCreateChicken() {
    setLoading(true);
    const res = await createChicken();
    if (res === undefined)
      return;
    // const data = await res.json()
    // res.length
    // const newChickens: Chicken[] = {...chickens, res};
    setChickens([...chickens, res])
    setLoading(false);
  }

  async function fetchDeleteChicken(id: number) {
    setLoading(true);
    const res = await deleteChicken(id);
    if (!res || res.status > 299)
      return;
    setChickens(chickens.filter((v) => { if (v.id !== id) return v }));
    setLoading(false);
  }

  async function fetchChickenRun(id: number) {
    setLoading(true);
    const res = await chickenRun(id);
    if (!res)
      return;
    const newChickens = chickens.map((v) => {
      return v.id === id ? res : v;
    })
    setChickens(newChickens);
    setLoading(false);
  }

  useEffect(() => {
    async function fetchAllChickens() {
      const res = await getAllChickens();
      setChickens(res);
    }
    fetchAllChickens()
  }, []);

  useEffect(() => {
    checkServerVersion();
  }, []);

  return (
    <>
      <div>
        <br />
        <button disabled={loading} onClick={() => fetchCreateChicken()}>Click here to create a chicken</button>
        <br />
        <div style={{ display: "flex", flexWrap: 'wrap' }}>
          {
            chickens.map((v) => {
              const formatBirthday = new Date(v.birthday).toDateString().slice(4);
              return <div key={v.id} style={{ margin: '6px', padding: '5px', textAlign: 'center', display: "flex", flexDirection: 'column', flex: '0 0 10%', border: '1px solid black' }}>
                <img src='https://i5.walmartimages.com/asr/bc407002-7df7-42f0-a94f-884ffede7e2f.6e4cbcc9591b5b1f693fbbd7ed73e3f2.jpeg' style={
                  { height: '150px', width: '150px', margin: 'auto' }} />
                <div>
                  name: {v.name}
                  <br />
                  birthday: {formatBirthday}
                  <br />
                  weight: {v.weight}
                  <br />
                  steps: {v.steps}
                  <br />
                  running? {v.isRunning === false ? 'no' : 'yes'}
                </div>
                <div>
                  <button disabled={loading} onClick={() => fetchDeleteChicken(v.id)}>Delete chicken</button>
                  <button disabled={loading} onClick={() => fetchChickenRun(v.id)}>Run!</button>
                </div>
              </div>
            })
          }
        </div>
      </div>
    </>
  );
};
