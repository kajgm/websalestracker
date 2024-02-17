import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../hooks';

import Main from '../layouts/Main';
import Item from '../components/Site/Item';
import Info from '../components/Site/Info';
import { selectItemsByCategory } from '../slices/itemSlice';

function Site() {
  const { category } = useParams();
  const items = useAppSelector((state) => selectItemsByCategory(state, category || ''));

  return (
    <>
      {category ? (
        <Main>
          <div className="flex flex-col h-full overflow-auto">
            <Info name={category} />
            <div className="bg-gray-dark2 rounded-lg overflow-auto">
              <div className="flex flex-wrap items-center content-start">
                {items.map((e) => {
                  return <Item {...e}></Item>;
                })}
              </div>
            </div>
          </div>
        </Main>
      ) : null}
    </>
  );
}

export default Site;
