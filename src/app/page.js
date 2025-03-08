import { Reviews } from "@/components/Reviews"
import Image from "next/image"
import Link from "next/link"

const Home = () => {
  return (
    <div>
      <section className="grid sm:flex justify-around min-h-[85vh] items-center">
        <div className="grid sm:w-3/6 gap-2 md:px-4">
          <div className="text-xs flex gap-2 items-center bg-gray-800 px-3.5 py-1.5 w-fit rounded-full">
            <span className="animate-pulse block w-2 h-2 bg-purple-800 rounded-full"></span>
            AI-Powered Budget Tracker</div>
          <div className="grid gap-3 sm:gap-5">
            <h2 className="text-3xl  sm:text-4xl md:text-5xl lg:text-6xl text-balance font-bold">
              Track your budget & expenses
            </h2>
            <p className="text-gray-300 text-sm sm:text-lg">Experience next-generation budget management with AI-driven insights and predictive analytics.</p>
            <Link className="block rounded-lg w-fit px-5 py-3 bg-gradient-to-r from-purple-800 to-purple-600" href="#">Start for Free</Link>
          </div>
        </div>
        <img src="./main-header.png" className="sm:mt-0 w-full h-40 sm:h-full object-cover object-center sm:w-4/12 rounded-lg" alt="Dashboard Pic" />
      </section>
      <section className="sm:mt-12 sm:min-h-80 md:min-h-96">
        <div className="text-center grid gap-2 sm:gap-4 text-balance">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-300">Powerful Features for Your Financial Success</h2>
          <p className="text-gray-300 text-sm sm:text-lg">Experience next-generation budget management with AI-driven insights, predictive analytics, and automated tracking.</p>
        </div>
        <div className="flex mt-4 sm:mt-6 flex-wrap justify-center gap-4">
          <article className="px-4 bg-gray-800 bg-opacity-65 py-3 rounded-lg max-w-96 grid gap-1.5">
            <span className="px-3 py-3 bg-green-400 grid items-center w-fit rounded-lg bg-opacity-45">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#fff"} fill={"none"}>
                <path d="M19 16V14C19 11.1716 19 9.75736 18.1213 8.87868C17.2426 8 15.8284 8 13 8H11C8.17157 8 6.75736 8 5.87868 8.87868C5 9.75736 5 11.1716 5 14V16C5 18.8284 5 20.2426 5.87868 21.1213C6.75736 22 8.17157 22 11 22H13C15.8284 22 17.2426 22 18.1213 21.1213C19 20.2426 19 18.8284 19 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M19 18C20.4142 18 21.1213 18 21.5607 17.5607C22 17.1213 22 16.4142 22 15C22 13.5858 22 12.8787 21.5607 12.4393C21.1213 12 20.4142 12 19 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M5 18C3.58579 18 2.87868 18 2.43934 17.5607C2 17.1213 2 16.4142 2 15C2 13.5858 2 12.8787 2.43934 12.4393C2.87868 12 3.58579 12 5 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M13.5 3.5C13.5 4.32843 12.8284 5 12 5C11.1716 5 10.5 4.32843 10.5 3.5C10.5 2.67157 11.1716 2 12 2C12.8284 2 13.5 2.67157 13.5 3.5Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 13V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 13V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 17.5C10 17.5 10.6667 18 12 18C13.3333 18 14 17.5 14 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <h2 className="text-lg font-bold">
              AI-Powered Insights
            </h2>
            <p className="text-sm text-gray-300">Get personalized recommendations and spending insights powered by advanced AI algorithms.</p>
          </article>
          <article className="px-4 bg-gray-800 bg-opacity-65 py-3 rounded-lg max-w-96 grid gap-1.5">
            <span className="px-3 py-3 bg-blue-600 grid items-center w-fit rounded-lg bg-opacity-45">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#fff"} fill={"none"}>
                <path d="M7 11.2947C12.284 1.44656 18.8635 1.333 21.4928 2.50724C22.667 5.1365 22.5534 11.716 12.7053 17C12.6031 16.4129 12.0352 14.8749 10.5801 13.4199C9.12512 11.9648 7.58712 11.3969 7 11.2947Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 16.8C16.0428 17.7334 16.2609 19.4069 16.5439 21C16.5439 21 20.8223 18.0481 18.0856 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.19998 9.99987C6.26664 7.95709 4.59305 7.73899 3 7.45601C3 7.45601 5.95194 3.17753 10 5.91431" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.20866 13.9998C5.57677 14.6317 4.50255 16.4642 5.26082 18.739C7.53564 19.4973 9.36813 18.4231 10 17.7912" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18.0952 7.753C18.0952 6.7328 17.2682 5.90578 16.248 5.90578C15.2278 5.90578 14.4008 6.7328 14.4008 7.753C14.4008 8.77319 15.2278 9.60022 16.248 9.60022C17.2682 9.60022 18.0952 8.77319 18.0952 7.753Z" stroke="currentColor" strokeWidth="1.5" />
              </svg></span>
            <h2 className="text-lg font-bold">
              Smart Analytics
            </h2>
            <p className="text-sm text-gray-300">Visualize your financial health with intuitive charts and predictive analysis.</p>
          </article>
          <article className="px-4 bg-gray-800 bg-opacity-65 py-3 rounded-lg max-w-96 grid gap-1.5">
            <span className="px-3 py-3 bg-purple-600 grid items-center w-fit rounded-lg bg-opacity-45"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#fff"} fill={"none"}>
              <path d="M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1379 20 17.2586 20 13.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14.551 12C14.551 13.3807 13.4317 14.5 12.051 14.5C10.6703 14.5 9.55099 13.3807 9.55099 12C9.55099 10.6193 10.6703 9.5 12.051 9.5C13.4317 9.5 14.551 10.6193 14.551 12Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M5 12L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M18 12L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg></span>
            <h2 className="text-lg font-bold">
              Goal Tracking
            </h2>
            <p className="text-sm text-gray-300">Set and achieve your savings goals with automated tracking and smart recommendations.</p>
          </article>
        </div>
      </section>

      <section className="mt-10 sm:min-h-80 md:min-h-[500px] grid items-center gap-4">
      <div className="text-center grid gap-2 sm:gap-4 text-balance">
          <h2 className="text-2xl text-gray-300 md:text-3xl font-bold">Loved by Users Worldwide</h2>
          <p className="text-gray-300 text-sm sm:text-lg">See what our community has to say about their experience with SmartBudget.</p>
        <Reviews/>
        </div>
      </section>
    </div>
  )
}

export default Home
