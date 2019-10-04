import React from 'react';

export default function Thumbnail(props) {
    return (
        <aside className="thumbsContainer">
            {props.file.map(file => (
                <div className="thumb" key={file.name}>
                    <div className="thumbInner">
                        <img
                            src={file.preview}
                            className="img"
                        />
                    </div>
                </div>
            ))}
        </aside>
    )
}