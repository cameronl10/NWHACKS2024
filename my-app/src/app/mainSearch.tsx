"use client";
import { FormEventHandler, UIEventHandler, useState } from "react";
import Book from "~/components/book";
import SearchIcon from "~/components/searchIcon";
import { useUser } from "@auth0/nextjs-auth0/client";
import XIcon from "~/components/xicon";
import { Oval, TailSpin } from "react-loader-spinner";

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
              <div className="flex items-center gap-x-4" key={`book-${i}`}>
                <SearchIcon className="w-4 h-4 stroke-neutral-400" strokeWidth={3} />
                <h2 className="text-neutral-400"> {title} </h2>
              </div>
            )
            if (i < a.length - 1)
              return [p, (<hr className="w-full border-search-light border-neutral-400" key={`gap-${i}`} />)]
            else
              return [p]
          })
        }
      </div>
    </div>
  )
};


function SearchArea({ hasResult, loading, book_clicked_handler, queryData }:
  { hasResult: boolean, loading: boolean, book_clicked_handler: (book: QueryResult) => void, queryData: QueryResult[] | null }) {
  if (loading) {
    return (
      <div className="grid place-items-center py-10">
        <Oval
          height="50"
          width="50"
          color="#ffffff"
          secondaryColor="#ffffff"
          ariaLabel="oval-loading"
          strokeWidth={6}
        />
      </div>
    )
  }

  if (!hasResult) {
    return (
      <>
        <BookOfTheDay />
        <Recents />
      </>
    )
  }

  if (queryData == null) {
    return (
      <p>Has result is true, but query data is still null</p>
    )
  }

  return (
    <div className="flex flex-col gap-y-4">
      {queryData.map((book, index) => (
        <div onClick={() => book_clicked_handler(book)}>
          <Book
            key={index}
            auth={book.dewey_decimal}
            desc={book.description}
            name={book.title}
            img={book.cover_url}
          />
        </div>
      ))}
    </div>
  )
}


interface QueryResult {
  dewey_decimal: string
  title: string
  description: string
  shelf_id: number
  cover_url: string
}

export default function MainSearch({ updateShelfNumber }: { updateShelfNumber: (a: number) => void }) {
  const { user } = useUser();

  const [query, setQuery] = useState<string>("");
  const [queryData, setQueryData] = useState<QueryResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const query_books: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true)
    setTopP(SearchBarPositions.UPPER)

    const url = new URL(window.location.origin + "/api/findbook")
    url.searchParams.set("q", query)
    if (user?.org_id) url.searchParams.set("user_sid", user?.org_id)
    const response = await fetch(url.toString())
    if (response.status != 200) {
      console.error(`[query_books] fetch error: ${await response.text()}`)
      return;
    }
    const data = await response.json()
    setHasResult(true);
    setLoading(false);
    setQueryData(data.matches);
  }

  enum SearchBarPositions {
    UPPER = "200px",
    LOWER = "500px",
  }
  const [topP, setTopP] = useState(SearchBarPositions.LOWER);


  const f: UIEventHandler<HTMLDivElement> = (e) => {
    const mainScrollArea = e.currentTarget
    if (!mainScrollArea) return;
    const scrollPos = mainScrollArea.scrollTop;
    if (scrollPos > 30) setTopP(SearchBarPositions.UPPER)
  }

  return (
    <div
      className="w-full flex flex-col fixed bg-slate-800 z-10 [&>div]:mx-4 rounded-t-3xl pt-8 gap-y-4
        transition-[top] bottom-0"
      style={{ top: topP }}
    >
      <div className="relative">
        <SearchIcon className="absolute w-6 h-6 stroke-neutral-400 left-3 top-[50%] translate-y-[-50%]" strokeWidth={2} />
        <form className="flex items-center gap-x-2" onSubmit={query_books}>
          <input type="search"
            className="px-4 py-2 pl-12 w-full text-xl font-body rounded-xl bg-slate-700 text-neutral-300 focus:outline-none focus:ring-4 duration-600 ease-in-out flex-1"
            placeholder="Search BookTrail"
            onChange={(e) => {
              const new_query = e.target.value
              setQuery(new_query)
              new_query.length == 0 && setHasResult(false)
            }}
          />
          <XIcon className="w-10 h-10 stroke-neutral-400" strokeWidth={2} onClick={() => setTopP(SearchBarPositions.LOWER)} />
        </form>
      </div>

      {/* SCROLL AREA */}
      <div className="overflow-y-scroll pb-8" onScroll={f}>
        <SearchArea
          book_clicked_handler={(book: QueryResult) => {
            setTopP(SearchBarPositions.LOWER)
            console.log(book.shelf_id)
            updateShelfNumber(book.shelf_id)
          }}
          hasResult={hasResult}
          queryData={queryData}
          loading={loading}
        />
      </div>
    </div>
  );
}