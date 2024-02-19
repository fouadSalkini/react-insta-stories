import * as React from "react";

export interface ReactInstaStoriesProps {
  stories: Story[];
  width?: NumberOrString;
  height?: NumberOrString;
  loader?: JSX.Element;
  header?: Function;
  storyContainerStyles?: Record<string, any>;
  storyInnerContainerStyles?: Record<string, any>;
  storyStyles?: Object;
  progressContainerStyles?: Object;
  progressWrapperStyles?: Object;
  progressStyles?: Object;
  loop?: boolean;
  defaultInterval?: number;
  isPaused?: boolean;
  currentIndex?: number;
  renderers?: {
    renderer: Renderer;
    tester: Tester;
  }[];
  onAllStoriesEnd?: Function;
  onStoryStart?: Function;
  onStoryEnd?: Function;
  onNext?: Function;
  onPrevious?: Function;
  keyboardNavigation?: boolean;
  preventDefault?: boolean;
  preloadCount?: number;
  isMuted?: boolean;
  muteStyles?: Object;
  onMute?: Function;
  onPause?: Function;
}

export interface GlobalCtx {
  width?: NumberOrString;
  height?: NumberOrString;
  loader?: JSX.Element;
  header?: Function;
  storyContainerStyles?: Record<string, any>;
  storyInnerContainerStyles?: Record<string, any>;
  storyStyles?: Object;
  progressContainerStyles?: Object;
  progressWrapperStyles?: Object;
  progressStyles?: Object;
  loop?: boolean;
  defaultInterval?: number;
  isPaused?: boolean;
  currentIndex?: number;
  renderers?: {
    renderer: Renderer;
    tester: Tester;
  }[];
  onAllStoriesEnd?: Function;
  onStoryStart?: Function;
  onStoryEnd?: Function;
  onPrevious?: Function;
  onNext?: Function;
  keyboardNavigation?: boolean;
  preventDefault?: boolean;
  preloadCount?: number;
  isMuted?: boolean;
  muteStyles?: Object;
  onMute?: Function;
  onPause?: Function;
}

type NumberOrString = number | string;

export interface StoriesContext {
  stories: Story[];
}

export interface ContainerState {
  currentId: number;
  pause: boolean;
  count: number;
  storiesDone: number;
}

export type Action = (action: string, bufferAction?: boolean) => void;
export type Renderer = React.FC<{
  action: Action;
  isPaused: boolean;
  story: Story;
  config: {
    width?: NumberOrString;
    height?: NumberOrString;
    loader?: JSX.Element;
    header?: Function;
    storyStyles?: Object;
    isMuted?: boolean,
    muteStyles?: Object;
  };
  messageHandler: (type: string, data: any) => { ack: "OK" | "ERROR" };
}>;

export type Tester = (story: Story) => {
  condition: boolean;
  priority: number;
};

export interface StoryProps {
  story: Story;
  action: Action;
  playState: boolean;
  getVideoDuration: Function;
  bufferAction: boolean;
  isPaused: boolean
}

export interface StoryState {
  loaded: boolean;
  showMore: boolean;
}

export interface Story {
  url?: string;
  seeMore?: Function;
  seeMoreCollapsed?: React.ComponentType<{
    toggleMore: (show: boolean) => void;
    action: Action;
  }>;
  header?: Header;
  type?: string;
  duration?: number;
  styles?: object;
  width?: number;
  height?: number;
  content?: Renderer;
  originalContent?: Renderer
  // Whether to preload the resource or not, defaults to `true` for images and `false` for videos (video preloading is experimental)
  preloadResource?: boolean;
}

export interface Header {
  heading: string;
  subheading: string;
  profileImage: string;
}

export interface SeeMoreProps {
  seeMoreContent: Function;
  showContent: boolean;
  action: Action;
  toggleMore: (show: boolean) => void;
  customCollapsed: React.ComponentType<{
    toggleMore: (show: boolean) => void;
    action: Action;
  }>;
}

export interface HeaderProps {
  profileImage: string;
  heading: string;
  subheading: string;
}

export interface ProgressProps {
  width: number;
  active: number;
  count: number;
}

export interface ProgressWrapperProps {
  children: any;
  width: number;
  pause: boolean;
  bufferAction: boolean;
}

export interface ProgressArrayProps {}

export interface ProgressContext {
  currentId: number;
  videoDuration: number;
  bufferAction: boolean;
  pause: boolean;
  next: Function;
}
