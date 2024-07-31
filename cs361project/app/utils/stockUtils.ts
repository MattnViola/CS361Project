export const getCurrentPrice = (intradayData: any) => {
  if (!intradayData || !intradayData["Time Series (5min)"]) {
    return 0; // Or handle the error as needed
  }
  const latestTime = Object.keys(intradayData["Time Series (5min)"])[0];
  return parseFloat(intradayData["Time Series (5min)"][latestTime]["4. close"]);
};

export const calculatePercentChange = (
  startPrice: number,
  endPrice: number
) => {
  return ((endPrice - startPrice) / startPrice) * 100;
};

export const getPercentChangeToday = (dailyData: any) => {
  if (!dailyData || !dailyData["Time Series (Daily)"]) {
    return 0;
  }
  const times = Object.keys(dailyData["Time Series (Daily)"]);
  const latestTime = times[0];
  const openTime = times.find(
    (time) =>
      new Date(time).toDateString() === new Date(latestTime).toDateString()
  );
  if (!openTime) return 0;
  const latestPrice = parseFloat(
    dailyData["Time Series (Daily)"][latestTime]["4. close"]
  );
  const openPrice = parseFloat(
    dailyData["Time Series (Daily)"][openTime]["1. open"]
  );
  return calculatePercentChange(openPrice, latestPrice);
};

export const getPercentChangeThisMonth = (dailyData: any, month: string) => {
  if (!dailyData || !dailyData["Time Series (Daily)"]) {
    return 0;
  }
  const times = Object.keys(dailyData["Time Series (Daily)"]);
  const latestTime = times[0];
  const startTime = times.reverse().find((time) => time.startsWith(month));
  if (!startTime) return 0;
  const latestPrice = parseFloat(
    dailyData["Time Series (Daily)"][latestTime]["4. close"]
  );
  const startPrice = parseFloat(
    dailyData["Time Series (Daily)"][startTime]["1. open"]
  );
  return calculatePercentChange(startPrice, latestPrice);
};

export const getPercentChangeThisYear = (dailyData: any, year: string) => {
  if (!dailyData || !dailyData["Time Series (Daily)"]) {
    return 0;
  }
  const times = Object.keys(dailyData["Time Series (Daily)"]);
  const latestTime = times[0];
  const startTime = times.reverse().find((time) => time.startsWith(year));
  if (!startTime) return 0;
  const latestPrice = parseFloat(
    dailyData["Time Series (Daily)"][latestTime]["4. close"]
  );
  const startPrice = parseFloat(
    dailyData["Time Series (Daily)"][startTime]["1. open"]
  );
  return calculatePercentChange(startPrice, latestPrice);
};
