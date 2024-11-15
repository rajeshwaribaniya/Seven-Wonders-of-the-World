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

    return(
        <div className='flex flex-col gap-[24px] pb-[16px]  border-b-[16px]'>

             {/* video part */}
            <div className='flex flex-col gap-[16px] items-start'>

              <video 
                  ref= {videoRef}
                  onPlay={()=> setVideoPlaying(true)}
                  onPause={()=> setVideoPlaying(false)}>

                  <source
                  src= {data.video}
                  type = "video/mp4" />
              </video>
                

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

            {/* textpart */}
            <div className='flex flex-col gap-[12px]'>

              <p className='text-[32px] font-[300]'>{data.id}. {data.title}</p>

              <p className='text-[#4E4E4E]  text-[18px] leading-[28px] '>{data.description}</p>

            </div>

        </div>
    );

}
