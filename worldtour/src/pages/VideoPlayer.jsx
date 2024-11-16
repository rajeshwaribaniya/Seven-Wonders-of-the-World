import React, { useRef, useState } from 'react'
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

    const timeFormat = (time)=> {
      const minutes = Math.floor(time/60);
      const seconds = Math.floor(time % 60);
      return(`${minutes} : ${seconds < 10 ? "0": ""}${seconds}`);
    }

    const sliderChange = (e)=> {
      const newTime = e.target.value;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }

    const loadedData = ()=> {
      setDuration(videoRef.current.duration);
    }

    return(
        <div className='flex flex-col gap-[24px] '>

            <p className='text-[32px] font-[300]'>{data.id}. {data.title}</p>

             {/* video part */}
            <div className='flex flex-col gap-[16px] items-start'>


            {/* Note: The onloadedmetadata event occurs when meta data for a media has been loaded. */}
              <video 
                  ref= {videoRef}
                  onPlay={()=> setVideoPlaying(true)}
                  onPause={()=> setVideoPlaying(false)}
                  onLoadedMetadata={loadedData}
                  onTimeUpdate={()=> setCurrentTime(videoRef.current.currentTime)}>

                  <source
                  src= {data.video}
                  type = "video/mp4" />
              </video>

              {/* video controls */}

              <div className='flex felx-col gap-[16px] w-full'>

                {/* duration part + slider + play for video */}
                <div className='flex flex-col gap-[16px] w-full'>

                  <div className='text-[16px] text-[#373737] w-full text-right' >
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
                    className='w-full h-[2px] appearance-none  rounded-lg accent-[#373737] bg-[#A9A9A9]'
                     />
                  </div>

                  <div className='flex gap-[8px]'>

                  <button onClick={buttonClick} className=' w-fit rounded-full'>

                  { videoPlaying? 
                  (
                    <div>
                      <img 
                      src= "icons/pause.png"
                      className='  w-[32px]'/>
                    </div>
                  ) : 

                  ((
                    <div>
                      <img src= "icons/PlayCircle.png"
                      className='w-[32px]'/>
                    </div>
                  ) )
                  }

                </button>

                  </div>

                </div>

                
                

                

                

              </div>
                

                
                    
                

            </div>

              <p className='text-[#4E4E4E]  text-[18px] leading-[28px] '>{data.description}</p>

            

        </div>
    );

}
