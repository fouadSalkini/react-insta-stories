import { useEffect, useState } from 'react';
import { IStoryComponentProps } from '../../types';
import './Image.styles.css';

export function Image(props: IStoryComponentProps) {

  
  const detectObjectFit = function (){
    let res = 'stories-image-contain';
    if(!props.story.width || !props.story.height){
      return res;
    }
    if(props.story.width < props.story.height){
      res = 'stories-image-cover';
    }
    return res;
  }

  const objectFit = detectObjectFit();
  

  function handleLoadImage() {
    //set timeout is done because there is an inconsitancy in safari and other browser
    //on when to call useEffect
    setTimeout(() => {
      props.onStoryLoaded()
    }, 4);
  }
  

  return (
    <img
      className={`stories-image ${objectFit}`}
      src={props.story.url}
      alt="story"
      onLoad={handleLoadImage}
    />
  );
}