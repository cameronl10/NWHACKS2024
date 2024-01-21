"use client";
import { FormEventHandler, useState } from "react";
import Book from "~/components/book";
import SearchIcon from "~/components/searchIcon";
import { useUser } from "@auth0/nextjs-auth0/client";

const BookOfTheDay = () => (
  <div className="bg-slate-800 py-3">
    <h1 className="text-2xl font-bold text-white mb-2">Book of The Day:</h1>
    <Book
      auth={"Stephen Covey"}
      desc={"The 7 Habits of Highly Effective People, first published in 1989, is a business and self-help book written by Stephen R. Covey. Covey defines effectiveness as the balance of obtaining desirable results with caring for that which produces those results."}
      name={"The 7 Habits of Highly Effective People"}
      img={"https://m.media-amazon.com/images/I/51ST4ws-CgL._SY445_SX342_.jpg"}
    />
  </div>
);

const Recents = () => {
  const [userRecentTitles, setUserRecentTitles] = useState(["The 7 Habits of highly effective people", "Complete Pokedex", "BLACKPINK - The Movie"]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-3"> Recents </h1>

      <div className="flex flex-col gap-y-3">
        {
          userRecentTitles.flatMap((title, i, a) => {
            const p = (
              <div className="flex items-center gap-x-4">
                <SearchIcon className="w-4 h-4 stroke-neutral-400" strokeWidth={3} />
                <h2 className="text-neutral-400"> {title} </h2>
              </div>
            )
            if (i < a.length - 1)
              return [p, (<hr className="w-full border-search-light border-neutral-400" />)]
            else
              return [p]
          })
        }
      </div>
    </div>
  )
};



export default function MainSearch({ updateShelfNumber }: { updateShelfNumber: (a: number) => void }) {
  //   const [mainSearchFocused, setMainSearchFocused] = React.useState(false);

  //   const sizeClass = mainSearchFocused ? "h-[90vh]" : "h-[38vh]";

  //   const handleFocusMainSearch = () => {
  //     setMainSearchFocused(!mainSearchFocused);
  //   };
  const shelfNumToSend = 139;
  const { user } = useUser();
  const [showResult, setShowResult] = useState(false);
  const [responseData, setData] = useState([]);
  const query_books: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = new URL(window.location.origin + "/api/findbook")
    url.searchParams.set("q", query)
    if (user?.org_id) url.searchParams.set("user_sid", user?.org_id)
    const response = await fetch(url.toString())
    if (response.status != 200) {
      console.error(`[query_books] fetch error: ${await response.text()}`)
      return;
    }
    const data = await response.json()
    updateShelfNumber(shelfNumToSend)
    setShowResult(true);
    setData(data.matches);
  }

  enum SearchBarPositions {
    LOWER = 80,
    UPPER = 50,
  }
  const [topP, setTopP] = useState(SearchBarPositions.LOWER);
  const [query, setQuery] = useState<string>("");
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
      className="w-full flex flex-col fixed bg-slate-800 z-10 [&>div]:mx-4 rounded-t-3xl pt-8 gap-y-4
        transition-[top] bottom-0"
      style={{ top: ` 50%` }}
    >
      <div className="relative">
        <SearchIcon className="absolute w-6 h-6 stroke-neutral-400 left-3 top-[50%] translate-y-[-50%]" strokeWidth={2} />
        <form className="form" onSubmit={query_books}>
          <input type="search"
            className="px-4 py-2 pl-12 w-full text-xl font-body rounded-lg bg-slate-700"
            placeholder="Search BookTrail"
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>

      {/* SCROLL AREA */}
      <div className="overflow-y-scroll pb-8">
        {!showResult ? (
          <>
            <BookOfTheDay />
            <Recents />
          </>
        ) : (
          <>
          {console.log(responseData)}
          </>
        )}
      </div>
    </div>
  );
}