import {useEffect, useState} from "react";

function timeDifference(current, previous) {
  const milliSecondsPerMinute = 60 * 1000;
  const milliSecondsPerHour = milliSecondsPerMinute * 60;
  const milliSecondsPerDay = milliSecondsPerHour * 24;
  const milliSecondsPerMonth = milliSecondsPerDay * 30;
  const milliSecondsPerYear = milliSecondsPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < milliSecondsPerMinute / 3) {
    return "just now";
  }

  if (elapsed < milliSecondsPerMinute) {
    return "less than 1 min ago";
  } else if (elapsed < milliSecondsPerHour) {
    return Math.round(elapsed / milliSecondsPerMinute) + " min ago";
  } else if (elapsed < milliSecondsPerDay) {
    return Math.round(elapsed / milliSecondsPerHour) + " h ago";
  } else if (elapsed < milliSecondsPerMonth) {
    return Math.round(elapsed / milliSecondsPerDay) + " days ago";
  } else if (elapsed < milliSecondsPerYear) {
    return Math.round(elapsed / milliSecondsPerMonth) + " mo ago";
  } else {
    return Math.round(elapsed / milliSecondsPerYear) + " years ago";
  }
}

const approute = 'https://lupareader.com'
export const links = {
  author: (name) => (approute + '/user/' + name)
}

export function timeDifferenceForDate(date) {
  const now = new Date().getTime();
  const updated = new Date(date).getTime();
  return timeDifference(now, updated);
}
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const countNested = (obj, prop) => obj[prop].reduce((accum, value) => accum + value[prop].length, 0) + obj[prop].length

export {countNested}

export function Fetch({stock, viewOption, render}) {
    const [data, setData] = useState({speciesData: []})
    const [requestError, setRequestError] = useState(null)


    const fetcher = () => fetch('https://ghibliapi.herokuapp.com/species')
        .then(res => res.json())
        .then(res => setData({speciesData: res}))

    useEffect(() => {
        fetcher()
        console.log('ran on stock change', data)
    }, [requestError])
    //[stock] is dependent value => rerender if changed


    return render(data)
}


