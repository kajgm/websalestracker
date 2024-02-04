import React, { useState } from 'react';

interface SiteProps {
  title: string;
  description: string;
}

const collapsedWidth = '1/3';
const expandedWidth = 'full';

function SiteItem(props: SiteProps) {
  const [isExpanded, setExpand] = useState(false);

  const searchTitle = props.title.match('\\[(.*?)\\]'); //Will need to update this
  const displayTitle = searchTitle ? searchTitle[0].replace(/[\[\]']+/g, '') : null;

  if (!displayTitle) {
    return;
  }

  return (
    <>
      <div className={'ease-in-out duration-300 w-' + (isExpanded ? expandedWidth : collapsedWidth)}>
        <div className="m-2">
          <button
            className="bg-gradient-to-br from-gray-dark to-gray-dark2 rounded-lg hover:shadow-lg hover:shadow-purple hover:-translate-y-3 ease-in-out duration-300 w-full"
            onClick={() => setExpand(!isExpanded)}
          >
            <div className="p-2 rounded-lg">
              <div className="text-center">
                <h1 className="p-1 text-white text-xl font-pmarker">{displayTitle}</h1>
                <p className="p-1 text-white text-base">desc</p>
              </div>
              {isExpanded && (
                <div>
                  <a href={props.description} target="_blank">
                    Link
                  </a>
                </div>
              )}
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default SiteItem;
