import React, {  useRef, useState } from 'react'
import { placesdatas } from '../data/placesdatas';

export  function VideoPlayer() {
  return (
    <>
      <div className=' flex flex-col justify-center items-center'>

        <div className='flex flex-col w-1/2 justify-center items-center gap-[48px] py-[56px]'>

        {/* top part */}
         <div className='flex flex-col justify-center items-center gap-[24px]'>

          <p className='text-center text-[48px] font-[700px]'>Seven Wonders of the World</p>

          <p 
          className='text-[#4E4E4E] text-center text-[18px] leading-[26px] '>
            The Seven Wonders of the World are incredible landmarks known for their beauty, history, and cultural importance. Each wonder showcases amazing human creativity and engineering from around the world.
          </p>

         </div>

         {/* cards part */}

         <div className='flex flex-col gap-[72px]'>

          {placesdatas.map((data, index)=>{
              return(

                <div>

                <Card key = {index}
                data = {data}/>

                
                  
                </div>
                
                
                
              );
          })}
          
         </div>






        </div>

      </div>
    </>
  )
}

const Card = ({data})=> {

    const[videoPlaying, setVideoPlaying] = useState(false);
    const videoRef = useRef(null);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const playPauseClick = ()=> {
        const videoNotPlaying = !videoPlaying;
        setVideoPlaying(videoNotPlaying);

        // Note: play() and pause() are video methods
        if(videoNotPlaying){
            videoRef.current.play();
        }else{
            videoRef.current.pause();
        }
    }

    const timeFormat = (time)=> {
      const minutes = Math.floor(time/60);
      const seconds = Math.floor(time % 60);
      return(`${minutes} : ${seconds < 10 ? "0": ""}${seconds}`);
    }

    const sliderChange = (e)=> {
      const newTime = e.target.value <= duration ? e.target.value: duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }

    const loadedData = ()=> {
      setDuration(videoRef.current.duration);
    }

    const handleTimeUpdate = () => {
      setCurrentTime(videoRef.current.currentTime);
    };

    const handleEnded = () => {
      setCurrentTime(duration); 
      videoRef.current.currentTime = duration; 
  
    };

    const handleForward = ()=> {
      videoRef.current.currentTime = videoRef.current.currentTime + 10;
    }

    const handleBackward = ()=> {
      videoRef.current.currentTime = videoRef.current.currentTime - 10;
    }

 
    
    return(

      // this is main div. It has title, video part and a description
        <div className='flex flex-col gap-[24px] '> 

            <p className='text-[32px] font-[300]'>{data.id}. {data.title}</p>

             {/* video part. first part : video second part : (duration part + slider) + play for video  */ }
            <div className='flex flex-col gap-[24px] items-start'>


            {/* first part video */}
            {/* Note: The onloadedmetadata event occurs when meta data for a media has been loaded. */}
              <video 
                  ref= {videoRef}
                  onPlay={()=> setVideoPlaying(true)}
                  onPause={()=> setVideoPlaying(false)}
                  onLoadedMetadata={loadedData}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleEnded}>

                  <source
                  src= {data.video}
                  type = "video/mp4" />
              </video>


              {/* video controls */}

                {/* (duration part + slider) + play for video */}
                <div className='flex flex-col gap-[16px] w-full'>


                  {/* duration text + slider */}
                  <div className='flex flex-col '>

                    <div className='text-[16px] text-[#373737] w-full text-right leading-[100%]' >
                        {`${timeFormat(currentTime)} / ${duration>0 ? timeFormat(duration): "0: 00"}`}
                    </div>

                    <div>

                    {/* Note: appearance-none: Removes default browser styling for inputs. */}
                    {/* accentColor Property:
                    Controls the color of form elements like the slider thumb, checkboxes, and radio buttons. */}
                    <input 
                    type='range'
                    min= '0'
                    max = {duration}
                    value={currentTime}
                    onChange={sliderChange}
                    className='w-full h-[2px] appearance-none  rounded-lg accent-[#373737] bg-[#A9A9A9] '
                     />
                  </div>

                  </div>

   
                    {/* video play */}
                  <div className='flex items-center'>

                  <button onClick={playPauseClick} className=' w-fit rounded-full'>

                  { videoPlaying? 
                  (
                    <div>
                      <img 
                      src= "icons/pause.png"
                      className='w-[48px]'/>
                    </div>
                  ) : 

                  ((
                    <div>
                      <img src= "icons/play.png"
                      className='w-[48px]'/>
                    </div>
                  ) )
                  }

                  </button>

                 <div onClick={handleBackward}>
                  <img 
                  src="icons/back.png" 
                  className='w-[48px]' />
                 </div>

                 <div onClick={handleForward}>
                  <img src="icons/forward.png"
                  className='w-[48px]'  />
                 </div>

                  </div>

                </div>
    

              
                
    

            </div>

              <p className='text-[#4E4E4E]  text-[18px] leading-[28px] '>{data.description}</p>

            

        </div>
    );

}
