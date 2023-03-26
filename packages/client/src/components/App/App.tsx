import React, { FC, useEffect, useState } from 'react';

import { Chicken as ChickenData, Coop as CoopData } from '@nest-react/domain'

import { checkServerVersion } from '~/utils';
import { getAllChickens } from '~/utils';
import { createCoop, deleteCoop, getAllCoops } from '~/utils/coopFetches';
import { Coop } from '../Coop';
import Accordion from 'react-bootstrap/esm/Accordion';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

export const App: FC<unknown> = () => {
  const [chickens, setChickens] = useState<ChickenData[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [coopName, setCoopName] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [coops, setCoops] = useState<CoopData[]>([])

  useEffect(() => {
    async function handleGetAllChickens() {
      const res = await getAllChickens();
      setChickens(res);
    }

    async function handleGetAllCoops() {
      const res = await getAllCoops();
      setCoops(res);
    }

    handleGetAllChickens()
    handleGetAllCoops()
  }, []);

  useEffect(() => {
    checkServerVersion();
  }, []);

  async function handleCreateCoop(coopName: string) {
    if (coopName.length === 0) {
      setError("You need a name for the coop");
      return;
    }
    const res = await createCoop(coopName)
    if (res)
      setCoops([...coops, res]);
    setError(undefined);
    setCoopName('')
  }

  async function handleDeleteCoop(id: number) {
    setLoading(true);
    const res = await deleteCoop(id);
    if (!res)
      return;
    setCoops(coops.filter((v) => { if (v.id !== id) return v }));
    setLoading(false);
  }

  return (
    <>
      <div>
        <input name="coop name" placeholder={"Enter coop name"} value={coopName} onChange={(e) => { setCoopName(e.target.value) }}></input>
        <Button disabled={loading} onClick={() => { handleCreateCoop(coopName) }}>Click here to create a coop</Button>
        <p>{error}</p>
        <Accordion>
          {
            coops.map((v) => {
              return <Coop key={v.id} coop={v} deleteCoop={handleDeleteCoop} />
            })
          }
        </Accordion>
      </div>
    </>
  );
};
