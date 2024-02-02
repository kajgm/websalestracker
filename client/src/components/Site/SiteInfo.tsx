import React from 'react';


function SiteInfo(props: {name: string, category: string}) {

    const infoTitle = props.name && props.category ? props.name + ": " + props.category : '';

    return (
        <div className="flex flex-wrap text-4xl p-6 font-pmarker">
            <h1>{infoTitle}</h1>
        </div>    
    );
}

export default SiteInfo;

