import React from 'react';

import { Chicken as ChickenData } from '@nest-react/domain'
import { Button, Card } from 'react-bootstrap';

interface Props {
    chicken: ChickenData,
    loading: boolean,
    deleteChicken: Function,
    chickenRun: Function
}

export function Chicken({ chicken, loading, deleteChicken, chickenRun }: Props) {

    const formatBirthday = new Date(chicken.birthday).toDateString().slice(4);
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant='top' height="100px" src='https://i5.walmartimages.com/asr/bc407002-7df7-42f0-a94f-884ffede7e2f.6e4cbcc9591b5b1f693fbbd7ed73e3f2.jpeg' />

            {/* <div key={chicken.id} style={{ margin: '6px', padding: '5px', textAlign: 'center', display: "flex", flexDirection: 'column', flex: '0 0 10%', border: '1px solid black' }}> */}
            {/* <img src='https://i5.walmartimages.com/asr/bc407002-7df7-42f0-a94f-884ffede7e2f.6e4cbcc9591b5b1f693fbbd7ed73e3f2.jpeg' style={ */}
            {/* { height: '150px', width: '150px', margin: 'auto' }} /> */}
            {/* <div> */}
            <Card.Body>
                <Card.Title>{chicken.name}</Card.Title>
                <Card.Text>
                    Born on {formatBirthday}
                    <br />
                    {chicken.weight}kg
                    <br />
                    {chicken.steps} total step(s)
                    <br />
                    {chicken.isRunning === false ? 'Idle' : 'Running'}
                    <br />
                    Coop Id: {chicken.coopId}
                    {/* </div> */}
                </Card.Text>
                {/* <div> */}
                {/* <button disabled={loading} onClick={() => deleteChicken(chicken.id)}>Delete chicken</button> */}
                {/* <button disabled={loading} onClick={() => chickenRun(chicken.id)}>Run!</button> */}
                {/* </div> */}
                <Button variant="primary" style={{ marginRight: '10px' }} disabled={loading} onClick={() => deleteChicken(chicken.id)}>Delete chicken</Button>
                <Button variant="primary" disabled={loading} onClick={() => chickenRun(chicken.id)}>Run!</Button>

            </Card.Body>
        </Card >
    )
}