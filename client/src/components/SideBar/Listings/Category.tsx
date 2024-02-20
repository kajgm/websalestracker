import React from 'react';
import { Link } from 'react-router-dom';

function Category(props: { name: string; site: string; charScale: number }) {
  const labelName = props.name;
  const labelNameConcat = labelName.length < props.charScale ? labelName : labelName.slice(0, props.charScale) + '...';

  return (
    <>
      <div className="bg-gray py-2 rounded-full font-rubik font-bold text-center" key={labelName}>
        <Link to={'/site/' + props.site} state={{ label: labelName }}>
          <button className="font-rubik font-bold">{labelNameConcat}</button>
        </Link>
      </div>
    </>
  );
}

export default Category;
