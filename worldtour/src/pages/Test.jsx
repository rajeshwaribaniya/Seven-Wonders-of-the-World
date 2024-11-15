import React, { useRef, useState } from 'react'

export  function Test() {

    const[videoPlaying, setVideoPlaying] = useState(false);
    const videoRef = useRef(null);

    const buttonClick = ()=> {
        const videoNotPlaying = !videoPlaying;
        setVideoPlaying(videoNotPlaying);

        // Note: play() and pause() are video methods
        if(videoNotPlaying){
            videoRef.current.play();
        }else{
            videoRef.current.pause();
        }
    }

    
  return (
    <>
     <button onClick={buttonClick}>

        { videoPlaying? 'Pause' : 'Play'}

    </button>

        {/* Note: The onplay event occurs when an video is started. */}
        {/* The onpause event occurs when an audio/video is paused. */}
        <video 
        ref= {videoRef}
        onPlay={()=> setVideoPlaying(true)}
        onPause={()=> setVideoPlaying(false)}>
            <source
            src='videos/testvideo.mp4'
            type = "video/mp4" />
        </video>

     
    </>
  )
}
