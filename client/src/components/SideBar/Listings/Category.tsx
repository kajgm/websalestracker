import React from 'react';
import { Link } from 'react-router-dom';

function Category(props: {
  getCategory: (categoryName: string, sorting: string) => void;
  category: string;
  charScale: number;
}) {
  const catName =
    props.category.length < props.charScale ? props.category : props.category.slice(0, props.charScale) + '...';

  return (
    <>
      <div className="bg-gray py-2 rounded-full font-rubik font-bold text-center" key={props.category}>
        <Link to="/Site">
          <button onClick={() => props.getCategory(props.category, 'new')} className="font-rubik font-bold">
            {catName}
          </button>
        </Link>
      </div>
    </>
  );
}

export default Category;
