import React, { FC, useEffect, useState } from 'react';

import { Dictionary } from '@nest-react/domain';

import { API_URL } from '~/config';
import { Logger, checkServerVersion } from '~/utils';

export const App: FC<unknown> = () => {
  const [response, setResponse] = useState<string>('NO SERVER RESPONSE');
  const [chicken, setChicken] = useState<string>("no chicken :(");

  useEffect(() => {
    async function fetchResponse(): Promise<void> {
      try {
        const res = await fetch(API_URL);
        const data = await res.text();
        setResponse(data);
      } catch (err) {
        Logger.error(err);
      }
    }

    async function chickenMake() {
      try {
        const res = await fetch(`${API_URL}/chicken`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "Buck", birthday: `${Date.now()}`, weight: '60' })
        })
        const data = await res.text();
        setChicken(data);
      } catch (err) {
        Logger.error(err);
      }
    }

    fetchResponse();
    chickenMake();
  }, []);

  useEffect(() => {
    checkServerVersion();
  }, []);

  const dictExample: Dictionary<number> = {
    first: 1,
    second: 2,
  };
  return (
    <>
      <div>
        Here we use a <code>Dictionary&lt;number&gt;</code> interface from the{' '}
        <code>@nest-react/domain</code> package:
        <pre>{JSON.stringify(dictExample)}</pre>
      </div>
      <div>
        And here we get a response from the API:
        <br />
        <br />
        {response}
      </div>
      <div>
        And here we get chicken?
        <br />
        <br />
        {chicken}
      </div>
    </>
  );
};
