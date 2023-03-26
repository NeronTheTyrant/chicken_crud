import React from 'react'
import { Coop as CoopData, Chicken as ChickenData } from '@nest-react/domain'
import { useState } from 'react'
import { chickenRun, createChicken, deleteChicken } from '~/utils';
import { Chicken } from '../Chicken';
import Accordion from 'react-bootstrap/Accordion';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import Button from 'react-bootstrap/esm/Button';

interface Props {
    coop: CoopData,
    deleteCoop: Function
}

export function Coop({ coop, deleteCoop }: Props) {
    const [chickens, setChickens] = useState<ChickenData[]>(coop.chickens)
    const [loading, setLoading] = useState<boolean>(false);

    async function handleCreateChicken() {
        setLoading(true);
        const res = await createChicken(coop.id);
        if (res === undefined)
            return;
        setChickens([...chickens, res])
        setLoading(false);
    }

    async function handleDeleteChicken(id: number) {
        setLoading(true);
        const res = await deleteChicken(id);
        if (!res || res.status > 299)
            return;
        setChickens(chickens.filter((v) => { if (v.id !== id) return v }));
        setLoading(false);
    }

    async function handleChickenRun(id: number) {
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

    return (
        <>
            <div>
                <Accordion.Item eventKey={`${coop.id}`}>
                    <Accordion.Header>Coop: {coop.name}</Accordion.Header>
                    <Accordion.Body>
                        <Button variant="danger" style={{ marginBottom: '10px' }} disabled={loading} onClick={() => deleteCoop(coop.id)}>Delete Coop</Button>
                        <br />
                        <Button variant="primary" style={{ marginBottom: '10px' }} disabled={loading} onClick={() => handleCreateChicken()}>Hatch chicken</Button>
                        <br />
                        <div style={{ display: "flex", flexWrap: 'wrap' }}>
                            {
                                chickens.map((v) => {
                                    return <Chicken key={v.id}
                                        chicken={v}
                                        loading={loading}
                                        deleteChicken={handleDeleteChicken}
                                        chickenRun={handleChickenRun} />
                                })
                            }
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </div>
        </>
    )


}