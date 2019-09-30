import React from 'react'
import {Link} from 'react-router-dom'

const Track=(props)=> {
    //using destructuring
    const {track}=props;
    return (
        <div className="col-md-6">
            <div className="card mb-4 shadow-sm">
                <div className="card-body ">
                    <h5>{track.artist_name}</h5>
                    <p className="card-text">
                        <strong><i className="fas fa-play"></i>Song</strong>: {track.track_name}
                        <br/>
                        <strong><i className="fas fa-compact-disc"></i>Albumn</strong>: {track.album_name}
                    </p>
                    {/* link dynamic so with curly braces and back ticks */}
                    <Link to={`lyrics/track/${track.track_id}`} className="btn btn-outline-warning btn-block">
                        <i className="fas fa-chevron-right"></i> View Lyrics
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Track;
