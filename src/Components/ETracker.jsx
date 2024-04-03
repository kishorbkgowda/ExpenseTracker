import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import "../Components/Style.css";
function ETracker() {
  const [text, settext] = useState("");
  const [amt, setamt] = useState(null);
  const [his, sethis] = useState([]);
  const [bal, setbal] = useState(0);
  const [income, setincome] = useState(0);
  const [exp, setexp] = useState(0);

  const update = () => {
    hisupdate();
  };

  const hisupdate = () => {
    if (text === "" || amt === null) {
      alert("Please enter a valid amount and name");
      return;
    }
    const newTransaction = {
      id: his.length === 0 ? 1 : his[his.length - 1].id + 1,
      name: text,
      rs: amt,
      add: amt >= 0 ? true : false,
    };
    sethis([...his, newTransaction]);
    balanceupdate([...his, newTransaction]);
  };

  const balanceupdate = (history) => {
    let ball = 0;
    let inc = 0;
    let expe = 0;
    for (let index = 0; index < history.length; index++) {
      console.log(typeof(history[index].rs));
      if (history[index].rs > 0) {
        inc = inc + parseInt(history[index].rs);
        console.log("hi");
      } else {
        expe = expe + parseInt(history[index].rs);
        console.log("hello");
      }
    }
    ball = inc + expe;
    setbal(ball);
    setincome(inc);
    setexp(expe);
  };

  const filer = (data) => {
    const lol = his.filter((hi) => {
      if (hi.id === data) return false;
      else return true;
    });
    sethis(lol);
    balanceupdate(lol)
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="glass min-w-[400px] mx-auto text-center flex flex-col gap-2 py-2 px-4 border-[2px] border-gray-400">
        <h1 className="lg:text-2xl font-bold text-gray-400">Expense Tracker</h1>
        <div className="text-left mt-5">
          <h3 className="md:text-[0.9rem] font-semibold text-gray-400">YOUR BALANCE</h3>
          <h3 className="md:text-[1.5rem] font-semibold text-gray-400">
            {bal === 0 ? "$0.00" : "$"+bal+".00"}
          </h3>
        </div>
        <div className="flex glass p-4 border-solid border-2">
          <div className="flex-1">
            <h2 className="text-[0.9rem] font-bold text-gray-400 ">INCOME</h2>
            <h2 className="text-[1.1rem] text-green-400 font-bold">
              {income === 0 ? "$0.00" : "$"+income+".00"}
            </h2>
          </div>
          <div className="flex-1">
            <h2 className="text-[0.9rem] font-bold text-gray-400">EXPENSE</h2>
            <h2 className="text-[1.1rem] text-red-600 font-bold">
              {exp === 0 ? "$0.00" : "$"+exp+".00"}
            </h2>
          </div>
        </div>
        <div>
          <h3 className="text-left text-[0.9rem] font-semibold text-gray-400">History</h3>
          <hr className="bg-black h-[2px]" />
          <div style={{}} className={{display: his.length > 0 ? "flex flex-col text-left my-2 overflow-auto h-[130px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 " : "hidden"}}>
            {his &&
              his.map((hip) => {
                return (
                  <div
                    key={hip.id}
                    className="py-2 flex items-center justify-between border-2 mb-1 glassborder relative"
                  >
                    <div className="flex gap-2 pl-1">
                      <button
                        className="opacity-2 text-gray-400"
                        onClick={() => filer(hip.id)}
                      >
                        <AiFillDelete />
                      </button>
                      <span className="text-[1rem] text-gray-400">{hip.name}</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-[1rem] text-gray-400 mr-3">
                        {hip.rs < 0 ? hip.rs : "+" + hip.rs}
                      </span>
                      <div
                        className="w-2 bg-green-500 absolute right-0 top-0 h-full"
                        style={{ backgroundColor: hip.add ? "green" : "red" }}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col text-left gap-2">
          <h3 className="text-[0.9rem] font-semibold text-gray-400">Add new transaction</h3>
          <hr className="bg-black h-[3px]" />
          <label className="text-[0.9rem] font-semibold mt-2 text-gray-400">Text</label>
          <input
            type="text"
            className="text-[1rem] p-2 glassborder text-gray-400"
            placeholder="Enter text..."
            onChange={(e) => settext(e.target.value)}
          />
          <label className="text-[0.9rem] font-semibold text-gray-400">
            Amount
            (negative - expense, positive - income)
          </label>
          <input
            placeholder="Enter amount..."
            type="number"
            className="text-[1rem] p-2 glassborder"
            onChange={(e) => setamt(e.target.value)}
          />
          <button
            onClick={update}
            className="bg-purple-400 p-2 text-white font-semibold hover:bg-white hover:text-purple-400 transition-all duration-500 hover:border-solid hover:b-2 hover:hover:border-purple-400"
          >
            Add transaction
          </button>
        </div>
      </div>
    </div>
  );
}

export default ETracker;
