import React from "react";
import moment from "moment";

const purchases = {
  user1: [
    {
      date: "2020-10-12",
      purchase: 49
    },
    {
      date: "2020-10-09",
      purchase: 120
    },
    {
      date: "2020-09-01",
      purchase: 99
    },
    {
      date: "2020-08-30",
      purchase: 180
    },
    {
      date: "2020-08-12",
      purchase: 99
    },
    {
      date: "2020-08-09",
      purchase: 180
    }
  ],
  user2: [
    {
      date: "2020-10-12",
      purchase: 250
    },
    {
      date: "2020-10-09",
      purchase: 300
    },
    {
      date: "2020-09-01",
      purchase: 22
    },
    {
      date: "2020-08-30",
      purchase: 10
    },
    {
      date: "2020-08-12",
      purchase: 599
    },
    {
      date: "2020-08-09",
      purchase: 119
    }
  ]
};

const calculateRewards = purchase => {
  const hundradRemain = purchase - 100;
  const fiftyRemain = (purchase - 50 > 50 && 50) || purchase - 50;
  return (
    2 * ((hundradRemain > 0 && hundradRemain) || 0) +
    1 * ((fiftyRemain > 0 && fiftyRemain) || 0)
  );
};

const Rewards = () => {
  const [lastMonths, setLastMonths] = React.useState(1);
  const [user, setUser] = React.useState("user1");
  const [records, setRecords] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  React.useEffect(() => {
    const filterRecords = purchases[user].filter(({ date }) => {
      const purchaseDate = moment(date).format();
      return moment().diff(purchaseDate, "month", true) <= lastMonths;
    });
    const mapRecords = filterRecords.map(({ date, purchase }) => ({
      date,
      reward: calculateRewards(purchase)
    }));
    const calcTotalRewards = mapRecords.reduce(
      (acc, curr) => acc + curr.reward,
      0
    );
    setRecords(mapRecords);
    setTotal(calcTotalRewards);
  }, [lastMonths, user]);
  return (
    <React.Fragment>
      {Object.keys(purchases).map(i => (
        <button role="button" onClick={() => setUser(i)}>
          {i}
        </button>
      ))}
      <br />
      <br />
      {[1, 2, 3].map(i => (
        <button role="button" onClick={() => setLastMonths(i)}>
          Last {i} month
        </button>
      ))}
      <p>
      <strong>{user.toUpperCase()} & selected Durations: {lastMonths} months</strong>, Today:{" "}
        {moment().format("YYYY-MM-DD")}
      </p>
      {records.map(({ date, reward }) => (
        <p>
          <strong>Rewards:</strong> {reward}, <strong>Date:</strong> {date}
        </p>
      ))}
      <p>
        <strong>Total:</strong> {total}
      </p>
    </React.Fragment>
  );
};

export default Rewards
