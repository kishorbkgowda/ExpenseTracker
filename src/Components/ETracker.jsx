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
    <div className="w-screen bg-stone-100 h-screen flex justify-center items-center">
      <div className="min-w-[380px] mx-auto text-center flex flex-col gap-2 p-2 border-[2px] border-gray-400">
        <h1 className="lg:text-2xl font-bold">Expense Tracker</h1>
        <div className="text-left mt-5">
          <h3 className="md:text-[0.8rem] font-semibold">YOUR BALANCE</h3>
          <h3 className="md:text-[1.5rem] font-semibold">
            {bal === 0 ? "$0.00" : "$"+bal+".00"}
          </h3>
        </div>
        <div className="flex bg-white p-4 border-b-black border-solid border-2">
          <div className="flex-1">
            <h2 className="text-[0.9rem] font-bold">INCOME</h2>
            <h2 className="text-[1.1rem] text-green-600 font-bold">
              {income === 0 ? "$0.00" : "$"+income+".00"}
            </h2>
          </div>
          <div className="flex-1">
            <h2 className="text-[0.9rem] font-bold">EXPENSE</h2>
            <h2 className="text-[1.1rem] text-red-700 font-bold">
              {exp === 0 ? "$0.00" : "$"+exp+".00"}
            </h2>
          </div>
        </div>
        <div>
          <h3 className="text-left text-[1rem] font-semibold">History</h3>
          <hr className="bg-black h-[2px]" />
          <div className="flex flex-col text-left my-2 overflow-auto h-[142px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {his &&
              his.map((hip) => {
                return (
                  <div
                    key={hip.id}
                    className="bg-white py-2 flex items-center justify-between border-2 mb-1"
                  >
                    <div className="flex gap-2 pl-1">
                      <button
                        className="opacity-2"
                        onClick={() => filer(hip.id)}
                      >
                        <AiFillDelete />
                      </button>
                      <span className="text-[1rem]">{hip.name}</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-[1rem]">
                        {hip.rs < 0 ? hip.rs : "+" + hip.rs}
                      </span>
                      <div
                        className="w-1 bg-green-500"
                        style={{ backgroundColor: hip.add ? "green" : "red" }}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col text-left gap-1">
          <h3 className="text-[1rem] font-semibold">Add new transaction</h3>
          <hr className="bg-black h-[3px]" />
          <label className="text-[1rem] font-semibold mt-2">Text</label>
          <input
            type="text"
            className="text-[1rem] p-2"
            placeholder="Enter text..."
            onChange={(e) => settext(e.target.value)}
          />
          <label className="text-[1rem] font-semibold">
            Amount <br />
            (negative-expense,positive-income)
          </label>
          <input
            placeholder="Enter amount..."
            type="number"
            className="text-[1rem] p-2 bg-white"
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
