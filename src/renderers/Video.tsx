import * as React from "react";
import Spinner from "../components/Spinner";
import { Renderer, Tester } from "./../interfaces";
import WithHeader from "./wrappers/withHeader";
import WithSeeMore from "./wrappers/withSeeMore";
import Volume from "../components/Volume";
import Mute from "../components/Mute";

export const renderer: Renderer = ({
  story,
  action,
  isPaused,
  config,
  messageHandler,
}) => {
  const [muted, setMuted] = React.useState(false);
  const { width, height, loader, storyStyles } = config;


  let vid = React.useRef<HTMLVideoElement>(null);
  let vidProgress = React.useRef(0);
  let loaded = React.useRef(false);

  let computedStyles = {
    ...styles.storyContent,
    ...(storyStyles || {}),
  };


  React.useEffect(() => {
    if (vid.current) {
      if (isPaused) {
        vid.current.pause();
      } else {
        vid.current.play().catch(() => {
          console.log("playing error")
          onWaiting();
        });
        
      }
    }
  }, [isPaused]);

  const onWaiting = () => {
    console.log("on waiting")
    loaded.current = false;
    action("pause", true);
    setTimeout(() => {
      vid.current
      .play()
      .finally(() => {
        action("play");
      })
    }, 200)
    
  };
  const onError = () => {
    console.log("on error")
    loaded.current = false;
    action("pause", true);
    vid.current
      .play()
      .finally(() => {
        action("play");
      })
  };

  const onPlaying = () => {
    console.log("on playing")
    loaded.current = true;
    action("play", true);
  };

  const videoLoaded = () => {
    console.log("video loaded", vid.current.duration)
    messageHandler("UPDATE_VIDEO_DURATION", { duration: vid.current.duration });
    loaded.current = true;
    vid.current
      .play()
      .then(() => {
        action("play");
      })
      .catch(() => {
        setMuted(true);
        onWaiting();
      });
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      if(!loaded.current){
        return false;
      }
      // if(vid.current.currentTime > vidProgress.current){
        vidProgress.current = vid.current.currentTime;
        if (vid.current.networkState === vid.current.NETWORK_LOADING) {
          // The user agent is actively trying to download data.
          
        }
        
        if (vid.current.readyState < vid.current.HAVE_FUTURE_DATA) {
            // There is not enough data to keep playing from this point
            onWaiting();
        }
      // }else{
        // onWaiting();
        //loaded.current = false;
        //action("pause", true);
      // }
    }, 1000)

    return () => clearInterval(interval);
  }, []);

  return (
    <WithHeader {...{ story, globalHeader: config.header }}>
      <WithSeeMore {...{ story, action }}>
        <div style={styles.videoContainer} className="video-container">
          <div style={{
            position:'absolute',
            top:'34px',
            right: '70px',
            width:'25px',
            height:'25px',
            padding:'3px',
            backgroundColor: muted ? '#fff' : 'transparent',
            borderRadius:'50%',
            color:'#000',
            zIndex: '9999999999',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }} onClick={() => { setMuted(!muted) }}>
            {muted ? <Mute /> : <Volume /> }
          </div>
          <video
            preload='auto'
            ref={vid}
            style={computedStyles}
            controls={false}
            onLoadedData={videoLoaded}
            playsInline
            onWaiting={onWaiting}
            onPlaying={onPlaying}
            muted={muted}
            autoPlay
            webkit-playsinline="true"
            src={story.url}
            className="test-class"
            onError={onError}
            onLoadStart={() => {console.log("on load start")}}
            onLoad={() => {console.log("on load")}}
            // onProgress={onPlaying}
            // onTimeUpdate={onPlaying}
            onSuspend={() => {console.log("on suspend")}}
            onStalled={() => {console.log("on stalled")}}
            
            
            
          >
          </video>
          
          {!loaded.current && (
            <div
              style={{
                width: width,
                height: height,
                position: "absolute",
                left: 0,
                top: 0,
                background: "rgba(0, 0, 0, 0.4)",
                zIndex: 9,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#ccc",
              }}
            >
              {loader || <Spinner />}
            </div>
          )}
        </div>
      </WithSeeMore>
    </WithHeader>
  );
};

const styles = {
  storyContent: {
    width: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
    
  },
  videoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
};

export const tester: Tester = (story) => {
  return {
    condition: story.type === "video",
    priority: 2,
  };
};

export default {
  renderer,
  tester,
};
