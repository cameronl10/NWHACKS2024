"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

export default function MainSearch({}) {
  //   const [mainSearchFocused, setMainSearchFocused] = React.useState(false);

  //   const sizeClass = mainSearchFocused ? "h-[90vh]" : "h-[38vh]";

  //   const handleFocusMainSearch = () => {
  //     setMainSearchFocused(!mainSearchFocused);
  //   };

  enum SearchBarPositions {
    LOWER = 80,
    UPPER = 50,
  }
  const [topP, setTopP] = useState(SearchBarPositions.LOWER);
  const searchBarFocusToggle = (isFocus: boolean) => {
    console.log(isFocus);
    if (isFocus) {
      setTopP(SearchBarPositions.UPPER);
    } else {
      setTopP(SearchBarPositions.LOWER);
    }
  };

  return (
    <div
      className={"w-full flex flex-col bg-search-primary fixed rounded-t-3xl bg-slate-400 z-10 [&>div]:mx-4 pt-10 transition-[top] bottom-0"}
      style={{ top: `${topP}%` }}
    >
      <div className="relative mb-4">
        <svg
          className="fill-black stroke-black top-[50%] translate-y-[-50%] left-3 absolute w-"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="21"
          viewBox="0 0 24 21"
          fill="none"
        >
          <path d="M21.07 14.234L19 12.4837C18.5547 12.1342 17.9931 11.9027 17.3872 11.8188C16.7814 11.7349 16.159 11.8026 15.6 12.013L14.7 11.27C15.7606 10.1 16.2449 8.64168 16.0555 7.18868C15.8662 5.73568 15.0172 4.39586 13.6794 3.43892C12.3417 2.48198 10.6145 1.97899 8.84567 2.03119C7.0768 2.08339 5.39755 2.68692 4.14597 3.72027C2.8944 4.75363 2.16342 6.14008 2.10019 7.60053C2.03696 9.06099 2.64618 10.487 3.80521 11.5915C4.96423 12.696 6.587 13.397 8.34684 13.5533C10.1067 13.7096 11.8729 13.3098 13.29 12.4341L14.18 13.1689C13.8951 13.631 13.793 14.1552 13.8881 14.6677C13.9832 15.1802 14.2706 15.6552 14.71 16.0257L16.83 17.776C17.3925 18.2399 18.155 18.5004 18.95 18.5004C19.745 18.5004 20.5075 18.2399 21.07 17.776C21.3557 17.5453 21.5828 17.2698 21.7378 16.9657C21.8928 16.6616 21.9726 16.335 21.9726 16.005C21.9726 15.6751 21.8928 15.3484 21.7378 15.0443C21.5828 14.7402 21.3557 14.4647 21.07 14.234V14.234ZM12.59 10.7333C11.8902 11.3096 10.9993 11.7017 10.0297 11.8602C9.06019 12.0186 8.0555 11.9362 7.14261 11.6235C6.22971 11.3107 5.44957 10.7816 4.90072 10.1029C4.35187 9.42429 4.05894 8.62656 4.05894 7.81052C4.05894 6.99449 4.35187 6.19675 4.90072 5.5181C5.44957 4.83945 6.22971 4.31032 7.14261 3.99756C8.0555 3.6848 9.06019 3.60244 10.0297 3.76088C10.9993 3.91932 11.8902 4.31146 12.59 4.88775C13.0556 5.27123 13.4251 5.72678 13.6771 6.22832C13.9292 6.72985 14.0589 7.26752 14.0589 7.81052C14.0589 8.35353 13.9292 8.89119 13.6771 9.39273C13.4251 9.89427 13.0556 10.3498 12.59 10.7333V10.7333ZM19.66 16.5706C19.567 16.648 19.4564 16.7094 19.3346 16.7513C19.2127 16.7932 19.082 16.8148 18.95 16.8148C18.818 16.8148 18.6873 16.7932 18.5654 16.7513C18.4436 16.7094 18.333 16.648 18.24 16.5706L16.12 14.8202C16.0263 14.7435 15.9519 14.6521 15.9011 14.5515C15.8503 14.4509 15.8242 14.343 15.8242 14.234C15.8242 14.125 15.8503 14.0171 15.9011 13.9165C15.9519 13.8159 16.0263 13.7246 16.12 13.6478C16.213 13.5704 16.3236 13.509 16.4454 13.4671C16.5673 13.4252 16.698 13.4036 16.83 13.4036C16.962 13.4036 17.0927 13.4252 17.2146 13.4671C17.3364 13.509 17.447 13.5704 17.54 13.6478L19.66 15.3982C19.7537 15.4749 19.8281 15.5662 19.8789 15.6668C19.9297 15.7675 19.9558 15.8754 19.9558 15.9844C19.9558 16.0934 19.9297 16.2013 19.8789 16.3019C19.8281 16.4025 19.7537 16.4938 19.66 16.5706V16.5706Z" />
        </svg>
        <input
          type="search"
          className="px-4 py-2 pl-12 w-full text-xl font-body rounded-md"
          placeholder="Search BookTrail"
          name=""
          id=""
          onFocus={() => searchBarFocusToggle(true)}
          onBlur={() => searchBarFocusToggle(false)}
        />
      </div>
      <div className="overflow-y-scroll mx-4">
        <BookOfTheDay />
        <Recents />
      </div>
    </div>
  );
}

const BookOfTheDay = () => (
  <div className="bg-slate-500">
    <h1 className="text-2xl font-bold">Book of The Day:</h1>
    <div className="w-30 h-30 flex flex-row">
      <div className="w-[50px] h-[50px] m-6 bg-search-highlight rounded-full flex items-center justify-center">
        <svg className="z-10" xmlns="http://www.w3.org/2000/svg" width="23" height="21" viewBox="0 0 25 22" fill="none"><path d="M18.75 2.61243H8.33334C7.22827 2.61243 6.16846 2.97487 5.38706 3.62003C4.60566 4.26519 4.16667 5.14021 4.16667 6.0526V16.3731C4.16667 17.2855 4.60566 18.1605 5.38706 18.8057C6.16846 19.4508 7.22827 19.8133 8.33334 19.8133H18.75C19.3025 19.8133 19.8324 19.6321 20.2231 19.3095C20.6138 18.9869 20.8333 18.5494 20.8333 18.0932V4.33251C20.8333 3.87632 20.6138 3.43881 20.2231 3.11623C19.8324 2.79365 19.3025 2.61243 18.75 2.61243ZM6.25001 6.0526C6.25001 5.5964 6.4695 5.15889 6.8602 4.83631C7.2509 4.51373 7.7808 4.33251 8.33334 4.33251H18.75V12.9329H8.33334C7.59901 12.9355 6.87916 13.1019 6.25001 13.4146V6.0526ZM8.33334 18.0932C7.7808 18.0932 7.2509 17.912 6.8602 17.5894C6.4695 17.2668 6.25001 16.8293 6.25001 16.3731C6.25001 15.9169 6.4695 15.4794 6.8602 15.1568C7.2509 14.8342 7.7808 14.653 8.33334 14.653H18.75V18.0932H8.33334ZM10.4167 7.77268H14.5833C14.8596 7.77268 15.1246 7.68207 15.3199 7.52078C15.5153 7.35949 15.625 7.14074 15.625 6.91264C15.625 6.68454 15.5153 6.46579 15.3199 6.3045C15.1246 6.14321 14.8596 6.0526 14.5833 6.0526H10.4167C10.1404 6.0526 9.87545 6.14321 9.6801 6.3045C9.48475 6.46579 9.37501 6.68454 9.37501 6.91264C9.37501 7.14074 9.48475 7.35949 9.6801 7.52078C9.87545 7.68207 10.1404 7.77268 10.4167 7.77268Z" fill="white"></path></svg>
      </div>
    </div>
    
    <div className="flex-col my-3">
      <p className="text-white font-body fw-600 text-xl font-bold">To Kill a Mockingbird</p>
      <p className="text-search-text font-body fw-600 text-l mb-2">
        Harper Lee - Non-Fiction
      </p>
      <p className="text-search-text font-body fw-600 text-l pr-3 text-justify">
        Set in small-town Alabama, the novel is a bildungsroman, or
        coming-of-age story, and chronicles the childhood of Scout and Jem Finch
        as their father Atticus defends a Black man falsely accus...
      </p>
    </div>
  </div>
);

const Recents = () => (
  <div className="bg-slate-500">
    <h1 className="text-2xl font-bold">
      Recents:
    </h1>

    <div className="w-11/12 h-[2px] bg-search-light mx-auto opacity-50 "></div>
    <div className="flex items-center w-11/12 mx-auto">
      <svg
        className=" mr-3 text-search-text"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="21"
        viewBox="0 0 24 21"
        fill="none"
      >
        <path
          d="M21.07 14.234L19 12.4837C18.5547 12.1342 17.9931 11.9027 17.3872 11.8188C16.7814 11.7349 16.159 11.8026 15.6 12.013L14.7 11.27C15.7606 10.1 16.2449 8.64168 16.0555 7.18868C15.8662 5.73568 15.0172 4.39586 13.6794 3.43892C12.3417 2.48198 10.6145 1.97899 8.84567 2.03119C7.0768 2.08339 5.39755 2.68692 4.14597 3.72027C2.8944 4.75363 2.16342 6.14008 2.10019 7.60053C2.03696 9.06099 2.64618 10.487 3.80521 11.5915C4.96423 12.696 6.587 13.397 8.34684 13.5533C10.1067 13.7096 11.8729 13.3098 13.29 12.4341L14.18 13.1689C13.8951 13.631 13.793 14.1552 13.8881 14.6677C13.9832 15.1802 14.2706 15.6552 14.71 16.0257L16.83 17.776C17.3925 18.2399 18.155 18.5004 18.95 18.5004C19.745 18.5004 20.5075 18.2399 21.07 17.776C21.3557 17.5453 21.5828 17.2698 21.7378 16.9657C21.8928 16.6616 21.9726 16.335 21.9726 16.005C21.9726 15.6751 21.8928 15.3484 21.7378 15.0443C21.5828 14.7402 21.3557 14.4647 21.07 14.234V14.234ZM12.59 10.7333C11.8902 11.3096 10.9993 11.7017 10.0297 11.8602C9.06019 12.0186 8.0555 11.9362 7.14261 11.6235C6.22971 11.3107 5.44957 10.7816 4.90072 10.1029C4.35187 9.42429 4.05894 8.62656 4.05894 7.81052C4.05894 6.99449 4.35187 6.19675 4.90072 5.5181C5.44957 4.83945 6.22971 4.31032 7.14261 3.99756C8.0555 3.6848 9.06019 3.60244 10.0297 3.76088C10.9993 3.91932 11.8902 4.31146 12.59 4.88775C13.0556 5.27123 13.4251 5.72678 13.6771 6.22832C13.9292 6.72985 14.0589 7.26752 14.0589 7.81052C14.0589 8.35353 13.9292 8.89119 13.6771 9.39273C13.4251 9.89427 13.0556 10.3498 12.59 10.7333V10.7333ZM19.66 16.5706C19.567 16.648 19.4564 16.7094 19.3346 16.7513C19.2127 16.7932 19.082 16.8148 18.95 16.8148C18.818 16.8148 18.6873 16.7932 18.5654 16.7513C18.4436 16.7094 18.333 16.648 18.24 16.5706L16.12 14.8202C16.0263 14.7435 15.9519 14.6521 15.9011 14.5515C15.8503 14.4509 15.8242 14.343 15.8242 14.234C15.8242 14.125 15.8503 14.0171 15.9011 13.9165C15.9519 13.8159 16.0263 13.7246 16.12 13.6478C16.213 13.5704 16.3236 13.509 16.4454 13.4671C16.5673 13.4252 16.698 13.4036 16.83 13.4036C16.962 13.4036 17.0927 13.4252 17.2146 13.4671C17.3364 13.509 17.447 13.5704 17.54 13.6478L19.66 15.3982C19.7537 15.4749 19.8281 15.5662 19.8789 15.6668C19.9297 15.7675 19.9558 15.8754 19.9558 15.9844C19.9558 16.0934 19.9297 16.2013 19.8789 16.3019C19.8281 16.4025 19.7537 16.4938 19.66 16.5706V16.5706Z"
          fill="#A1A4AB"
        />
      </svg>
      <h2 className="text-search-text fw-600 text-2xl font-body my-3">
        The 7 Habits of highly effecti..
      </h2>
    </div>

    <div className="w-11/12 h-[2px] bg-search-light mx-auto opacity-50 "></div>
    <div className="flex items-center w-11/12 mx-auto">
      <svg
        className=" mr-3 text-search-text"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="21"
        viewBox="0 0 24 21"
        fill="none"
      >
        <path
          d="M21.07 14.234L19 12.4837C18.5547 12.1342 17.9931 11.9027 17.3872 11.8188C16.7814 11.7349 16.159 11.8026 15.6 12.013L14.7 11.27C15.7606 10.1 16.2449 8.64168 16.0555 7.18868C15.8662 5.73568 15.0172 4.39586 13.6794 3.43892C12.3417 2.48198 10.6145 1.97899 8.84567 2.03119C7.0768 2.08339 5.39755 2.68692 4.14597 3.72027C2.8944 4.75363 2.16342 6.14008 2.10019 7.60053C2.03696 9.06099 2.64618 10.487 3.80521 11.5915C4.96423 12.696 6.587 13.397 8.34684 13.5533C10.1067 13.7096 11.8729 13.3098 13.29 12.4341L14.18 13.1689C13.8951 13.631 13.793 14.1552 13.8881 14.6677C13.9832 15.1802 14.2706 15.6552 14.71 16.0257L16.83 17.776C17.3925 18.2399 18.155 18.5004 18.95 18.5004C19.745 18.5004 20.5075 18.2399 21.07 17.776C21.3557 17.5453 21.5828 17.2698 21.7378 16.9657C21.8928 16.6616 21.9726 16.335 21.9726 16.005C21.9726 15.6751 21.8928 15.3484 21.7378 15.0443C21.5828 14.7402 21.3557 14.4647 21.07 14.234V14.234ZM12.59 10.7333C11.8902 11.3096 10.9993 11.7017 10.0297 11.8602C9.06019 12.0186 8.0555 11.9362 7.14261 11.6235C6.22971 11.3107 5.44957 10.7816 4.90072 10.1029C4.35187 9.42429 4.05894 8.62656 4.05894 7.81052C4.05894 6.99449 4.35187 6.19675 4.90072 5.5181C5.44957 4.83945 6.22971 4.31032 7.14261 3.99756C8.0555 3.6848 9.06019 3.60244 10.0297 3.76088C10.9993 3.91932 11.8902 4.31146 12.59 4.88775C13.0556 5.27123 13.4251 5.72678 13.6771 6.22832C13.9292 6.72985 14.0589 7.26752 14.0589 7.81052C14.0589 8.35353 13.9292 8.89119 13.6771 9.39273C13.4251 9.89427 13.0556 10.3498 12.59 10.7333V10.7333ZM19.66 16.5706C19.567 16.648 19.4564 16.7094 19.3346 16.7513C19.2127 16.7932 19.082 16.8148 18.95 16.8148C18.818 16.8148 18.6873 16.7932 18.5654 16.7513C18.4436 16.7094 18.333 16.648 18.24 16.5706L16.12 14.8202C16.0263 14.7435 15.9519 14.6521 15.9011 14.5515C15.8503 14.4509 15.8242 14.343 15.8242 14.234C15.8242 14.125 15.8503 14.0171 15.9011 13.9165C15.9519 13.8159 16.0263 13.7246 16.12 13.6478C16.213 13.5704 16.3236 13.509 16.4454 13.4671C16.5673 13.4252 16.698 13.4036 16.83 13.4036C16.962 13.4036 17.0927 13.4252 17.2146 13.4671C17.3364 13.509 17.447 13.5704 17.54 13.6478L19.66 15.3982C19.7537 15.4749 19.8281 15.5662 19.8789 15.6668C19.9297 15.7675 19.9558 15.8754 19.9558 15.9844C19.9558 16.0934 19.9297 16.2013 19.8789 16.3019C19.8281 16.4025 19.7537 16.4938 19.66 16.5706V16.5706Z"
          fill="#A1A4AB"
        />
      </svg>
      <h2 className="text-search-text fw-600 text-2xl font-body my-3">
        Complete Pokedex
      </h2>
    </div>

    <div className="w-11/12 h-[2px] bg-search-light mx-auto opacity-50 "></div>
    <div className="flex items-center w-11/12 mx-auto">
      <svg
        className=" mr-3 text-search-text"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="21"
        viewBox="0 0 24 21"
        fill="none"
      >
        <path
          d="M21.07 14.234L19 12.4837C18.5547 12.1342 17.9931 11.9027 17.3872 11.8188C16.7814 11.7349 16.159 11.8026 15.6 12.013L14.7 11.27C15.7606 10.1 16.2449 8.64168 16.0555 7.18868C15.8662 5.73568 15.0172 4.39586 13.6794 3.43892C12.3417 2.48198 10.6145 1.97899 8.84567 2.03119C7.0768 2.08339 5.39755 2.68692 4.14597 3.72027C2.8944 4.75363 2.16342 6.14008 2.10019 7.60053C2.03696 9.06099 2.64618 10.487 3.80521 11.5915C4.96423 12.696 6.587 13.397 8.34684 13.5533C10.1067 13.7096 11.8729 13.3098 13.29 12.4341L14.18 13.1689C13.8951 13.631 13.793 14.1552 13.8881 14.6677C13.9832 15.1802 14.2706 15.6552 14.71 16.0257L16.83 17.776C17.3925 18.2399 18.155 18.5004 18.95 18.5004C19.745 18.5004 20.5075 18.2399 21.07 17.776C21.3557 17.5453 21.5828 17.2698 21.7378 16.9657C21.8928 16.6616 21.9726 16.335 21.9726 16.005C21.9726 15.6751 21.8928 15.3484 21.7378 15.0443C21.5828 14.7402 21.3557 14.4647 21.07 14.234V14.234ZM12.59 10.7333C11.8902 11.3096 10.9993 11.7017 10.0297 11.8602C9.06019 12.0186 8.0555 11.9362 7.14261 11.6235C6.22971 11.3107 5.44957 10.7816 4.90072 10.1029C4.35187 9.42429 4.05894 8.62656 4.05894 7.81052C4.05894 6.99449 4.35187 6.19675 4.90072 5.5181C5.44957 4.83945 6.22971 4.31032 7.14261 3.99756C8.0555 3.6848 9.06019 3.60244 10.0297 3.76088C10.9993 3.91932 11.8902 4.31146 12.59 4.88775C13.0556 5.27123 13.4251 5.72678 13.6771 6.22832C13.9292 6.72985 14.0589 7.26752 14.0589 7.81052C14.0589 8.35353 13.9292 8.89119 13.6771 9.39273C13.4251 9.89427 13.0556 10.3498 12.59 10.7333V10.7333ZM19.66 16.5706C19.567 16.648 19.4564 16.7094 19.3346 16.7513C19.2127 16.7932 19.082 16.8148 18.95 16.8148C18.818 16.8148 18.6873 16.7932 18.5654 16.7513C18.4436 16.7094 18.333 16.648 18.24 16.5706L16.12 14.8202C16.0263 14.7435 15.9519 14.6521 15.9011 14.5515C15.8503 14.4509 15.8242 14.343 15.8242 14.234C15.8242 14.125 15.8503 14.0171 15.9011 13.9165C15.9519 13.8159 16.0263 13.7246 16.12 13.6478C16.213 13.5704 16.3236 13.509 16.4454 13.4671C16.5673 13.4252 16.698 13.4036 16.83 13.4036C16.962 13.4036 17.0927 13.4252 17.2146 13.4671C17.3364 13.509 17.447 13.5704 17.54 13.6478L19.66 15.3982C19.7537 15.4749 19.8281 15.5662 19.8789 15.6668C19.9297 15.7675 19.9558 15.8754 19.9558 15.9844C19.9558 16.0934 19.9297 16.2013 19.8789 16.3019C19.8281 16.4025 19.7537 16.4938 19.66 16.5706V16.5706Z"
          fill="#A1A4AB"
        />
      </svg>
      <h2 className="text-search-text fw-600 text-2xl font-body my-3">
        BLACKPINK - The Movie
      </h2>
    </div>
  </div>
);
