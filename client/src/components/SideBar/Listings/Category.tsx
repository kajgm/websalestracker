import React from 'react';
import { Link } from 'react-router-dom';

function Category(props: { getCategory: (categoryName: string) => void; name: string; charScale: number }) {
  const catName = props.name;
  const catNameConcat = catName.length < props.charScale ? catName : catName.slice(0, props.charScale) + '...';

  return (
    <>
      <div className="bg-gray py-2 rounded-full font-rubik font-bold text-center" key={catName}>
        <Link to="/Site">
          <button onClick={() => props.getCategory(catName)} className="font-rubik font-bold">
            {catNameConcat}
          </button>
        </Link>
      </div>
    </>
  );
}

export default Category;
