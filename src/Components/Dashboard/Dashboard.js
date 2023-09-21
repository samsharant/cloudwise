import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CloudDoneOutlinedIcon from "@mui/icons-material/CloudDoneOutlined";
import CloudSyncOutlinedIcon from "@mui/icons-material/CloudSyncOutlined";

//mui select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";

//axios
// import axios from "axios";

//chart js
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Line, PolarArea } from "react-chartjs-2";
import { toast } from "react-toastify";
import { currency, tabTypes } from "../../constants";
import NavigationTab from "../NavigationTab/NavigationTab";
import CardsContainer from "../CardsContainer/CardsContainer";
ChartJS.register(...registerables);

function Dashboard() {
  const periodType = {
    ONEWEEK: "pastOneWeek",
    THREEMONTHS: "pastThreeMonths",
    ONEYEAR: "pastOneYear",
  };

  const [hoursLeft] = useState(null);
  const [toastError] = useState(null);

  const [costExplorerData, setCostExplorerData] = useState({
    pastOneWeek: [],
    pastThreeMonths: [],
    pastOneYear: [],
  });

  const [xAxisData, setXAxisData] = useState([0]);
  const [yAxisData, setYAxisData] = useState([0]);
  const [chartInformation, setChartInformation] = useState({
    label: "",
    min: 0,
    max: 0,
    mean: 0,
  });

  const [presentMonthCost, setPresentMonthCost] = useState({
    month: "",
    cost: 0,
  });
  const [previousMonthCost, setPreviousMonthCost] = useState({
    month: "",
    cost: 0,
  });

  const [topfiveServices, setTopFiveServices] = useState([]);
  const [pastThreeMonthsCost, setPastThreeMonthsCost] = useState([]);

  useEffect(() => {
    const cost = pastThreeMonthsCost[1]?.TotalCost;
    const month = pastThreeMonthsCost[1]?.MonthYear;
    setPreviousMonthCost({ month, cost });
  }, [pastThreeMonthsCost]);

  //   function isLocalStorageDataValid() {
  //     const currentTime = new Date().getTime();
  //     const prevTimestamp = localStorage.getItem("dashboardTimestamp");
  //     //is invalid, if the prev timestamp exceeds 24 hours
  //     if (!prevTimestamp || currentTime - prevTimestamp > 86400000) return false;
  //     else return true;
  //   }

  //   async function axiosClientForCostExplorerData(PATH) {
  //     await axios
  //       .get(`${baseUrl}/cost/${PATH}`)
  //       .then(function (response) {
  //         setCostExplorerData((prevCostExplorerData) => ({
  //           ...prevCostExplorerData,
  //           [PATH]: response.data.data,
  //         }));
  //         // localStorage.setItem(PATH, JSON.stringify(response.data.data));
  //       })
  //       .catch((error) => {
  //         if (error.message.includes("Network Error")) {
  //           setToastError(true);
  //         } else {
  //           toast.error(`API Error: ${error.message}`);
  //         }
  //       });
  //   }

  async function updateCostExplorerData() {
    //fetch new data from api
    // await axiosClientForCostExplorerData(periodType.ONEWEEK);
    // await axiosClientForCostExplorerData(periodType.THREEMONTHS);
    // await axiosClientForCostExplorerData(periodType.ONEYEAR);

    setCostExplorerData({
      pastOneWeek: [
        {
          Date: "2023-09-13",
          Cost: 9.07,
        },
        {
          Date: "2023-09-14",
          Cost: 9.08,
        },
        {
          Date: "2023-09-15",
          Cost: 9.02,
        },
        {
          Date: "2023-09-16",
          Cost: 8.62,
        },
        {
          Date: "2023-09-17",
          Cost: 8.7,
        },
        {
          Date: "2023-09-18",
          Cost: 8.58,
        },
        {
          Date: "2023-09-19",
          Cost: 7.92,
        },
      ],
      pastThreeMonths: [
        { Week: "2023-06-26", Cost: 89.69000000000001 },
        { Week: "2023-07-03", Cost: 172.26 },
        { Week: "2023-07-10", Cost: 97.30000000000001 },
        { Week: "2023-07-17", Cost: 99.25 },
        { Week: "2023-07-24", Cost: 99.26000000000002 },
        { Week: "2023-07-31", Cost: 99.32 },
        { Week: "2023-08-07", Cost: 175.64000000000004 },
        { Week: "2023-08-14", Cost: 102.25999999999999 },
        { Week: "2023-08-21", Cost: 92.73999999999998 },
        { Week: "2023-08-28", Cost: 76.25 },
        { Week: "2023-09-04", Cost: 99.6 },
        { Week: "2023-09-11", Cost: 66.06 },
        { Week: "2023-09-18", Cost: 61.68999999999999 },
      ],
      pastOneYear: [
        {
          Month: "2022-09-20",
          Cost: 68.2,
        },
        {
          Month: "2022-10-01",
          Cost: 234.93,
        },
        {
          Month: "2022-11-01",
          Cost: 387.72,
        },
        {
          Month: "2022-12-01",
          Cost: 426.1,
        },
        {
          Month: "2023-01-01",
          Cost: 403.44,
        },
        {
          Month: "2023-02-01",
          Cost: 0,
        },
        {
          Month: "2023-03-01",
          Cost: 0,
        },
        {
          Month: "2023-04-01",
          Cost: 0,
        },
        {
          Month: "2023-05-01",
          Cost: 753.69,
        },
        {
          Month: "2023-06-01",
          Cost: 454.77,
        },
        {
          Month: "2023-07-01",
          Cost: 515.93,
        },
        {
          Month: "2023-08-01",
          Cost: 474.32,
        },
        {
          Month: "2023-09-01",
          Cost: 209.01,
        },
      ],
    });

    //need to update this fn with expiry time)
  }

  function updatePresentMonthCost() {
    //     //check with local storage before fetching

    //     //fetch new data from api
    //     axios
    //       .get(`${baseUrl}/cost/presentMonth`)
    //       .then(function (response) {
    //         const { Month, Cost } = response.data.data;
    //         setPresentMonthCost({ month: Month, cost: Cost });
    //         localStorage.setItem(
    //           "presentMonthCost",
    //           JSON.stringify({ month: Month, cost: Cost }),
    //         );
    //       })
    //       .catch((error) => {
    //         if (error.message.includes("Network Error")) {
    //           setToastError(true);
    //         } else {
    //           toast.error(`API Error: ${error.message}`);
    //         }
    //       });

    const { Month, Cost } = {
      Month: "September",
      Cost: 209.01080419899995,
    };
    setPresentMonthCost({ month: Month, cost: Cost });
  }

  function updateTopFiveServices() {
    //     //check with local storage before fetching
    //     const topFiveServicesData = JSON.parse(
    //       localStorage.getItem("pastThreeMonthsTopServicesUsed"),
    //     );
    //     if (isLocalStorageDataValid() && topFiveServicesData) {
    //       setTopFiveServices(topFiveServicesData);
    //       return;
    //     }
    //     //fetch new data from api
    //     axios
    //       .get(`${baseUrl}/cost/pastThreeMonthsTopServicesUsed`)
    //       .then(function (response) {
    //         setTopFiveServices(response.data.data);
    //         localStorage.setItem(
    //           "pastThreeMonthsTopServicesUsed",
    //           JSON.stringify(response.data.data),
    //         );
    //       })
    //       .catch((error) => {
    //         if (error.message.includes("Network Error")) {
    //           setToastError(true);
    //         } else {
    //           toast.error(`API Error: ${error.message}`);
    //         }
    //       });

    const topFiveServicesDataJson = [
      {
        date: "2023-09-01",
        data: [
          {
            Service: "Amazon Elastic Compute Cloud - Compute",
            TotalCost: 71.6546606206,
          },
          {
            Service: "Amazon Elastic Load Balancing",
            TotalCost: 54.5288971672,
          },
          { Service: "Tax", TotalCost: 32.15 },
          {
            Service: "Amazon Elastic Container Service",
            TotalCost: 29.9012380964,
          },
          { Service: "EC2 - Other", TotalCost: 10.1758066687 },
          { Service: "AWS Cost Explorer", TotalCost: 8.9437479999 },
          { Service: "Amazon Route 53", TotalCost: 2.5035928 },
          {
            Service: "Amazon Relational Database Service",
            TotalCost: 0.3244828322,
          },
          { Service: "Amazon Simple Storage Service", TotalCost: 0.3051746356 },
          {
            Service: "Amazon EC2 Container Registry (ECR)",
            TotalCost: 0.2307732534,
          },
          { Service: "Amazon Elastic File System", TotalCost: 0.000762955 },
          { Service: "AWS Backup", TotalCost: 0.0001900098 },
          { Service: "Amazon CloudFront", TotalCost: 4.431e-7 },
          { Service: "AWS Glue", TotalCost: 0 },
          { Service: "AWS Key Management Service", TotalCost: 0 },
          { Service: "AWS Lambda", TotalCost: 0 },
          { Service: "AWS Secrets Manager", TotalCost: 0 },
          { Service: "AWS Service Catalog", TotalCost: 0 },
          { Service: "Amazon Simple Notification Service", TotalCost: 0 },
          { Service: "Amazon Simple Queue Service", TotalCost: 0 },
          { Service: "Amazon Virtual Private Cloud", TotalCost: 0 },
          { Service: "AmazonCloudWatch", TotalCost: 0 },
        ],
        MonthYear: "September 2023",
      },
      {
        date: "2023-08-01",
        data: [
          {
            Service: "Amazon Elastic Compute Cloud - Compute",
            TotalCost: 127.0141080324,
          },
          {
            Service: "Amazon Elastic Container Service",
            TotalCost: 123.3424749252,
          },
          {
            Service: "Amazon Elastic Load Balancing",
            TotalCost: 82.9514136409,
          },
          { Service: "Tax", TotalCost: 72.36 },
          { Service: "EC2 - Other", TotalCost: 50.3631750024 },
          { Service: "AWS Cost Explorer", TotalCost: 4.8084241936 },
          { Service: "Amazon Route 53", TotalCost: 3.0029604 },
          {
            Service: "Amazon EC2 Container Registry (ECR)",
            TotalCost: 0.5028081609,
          },
          {
            Service: "Amazon Relational Database Service",
            TotalCost: 0.49581417,
          },
          { Service: "Amazon Simple Storage Service", TotalCost: 0.3710192873 },
          { Service: "AWS Key Management Service", TotalCost: 0.0286190552 },
          { Service: "AmazonCloudWatch", TotalCost: 0.00296 },
          { Service: "Amazon API Gateway", TotalCost: 0.0016695 },
          { Service: "Amazon Elastic File System", TotalCost: 0.001153152 },
          { Service: "AWS Backup", TotalCost: 0.000306465 },
          { Service: "Amazon CloudFront", TotalCost: 4.419e-7 },
          { Service: "AWS Glue", TotalCost: 0 },
          { Service: "AWS Lambda", TotalCost: 0 },
          { Service: "AWS Secrets Manager", TotalCost: 0 },
          { Service: "AWS Service Catalog", TotalCost: 0 },
          { Service: "Amazon Simple Notification Service", TotalCost: 0 },
          { Service: "Amazon Simple Queue Service", TotalCost: 0 },
          { Service: "Amazon Virtual Private Cloud", TotalCost: 0 },
        ],
        MonthYear: "August 2023",
      },
      {
        date: "2023-07-01",
        data: [
          {
            Service: "Amazon Elastic Compute Cloud - Compute",
            TotalCost: 140.5072768277,
          },
          {
            Service: "Amazon Elastic Container Service",
            TotalCost: 140.0092577372,
          },
          {
            Service: "Amazon Elastic Load Balancing",
            TotalCost: 81.9806162072,
          },
          { Service: "Tax", TotalCost: 78.7 },
          { Service: "EC2 - Other", TotalCost: 55.8283994498 },
          { Service: "Amazon Route 53", TotalCost: 3.0025524 },
          {
            Service: "Amazon EC2 Container Registry (ECR)",
            TotalCost: 0.7463788171,
          },
          {
            Service: "Amazon Relational Database Service",
            TotalCost: 0.49581417,
          },
          { Service: "Amazon Simple Storage Service", TotalCost: 0.3529912729 },
          { Service: "Amazon Virtual Private Cloud", TotalCost: 0.0780006322 },
          { Service: "AWS Key Management Service", TotalCost: 0.031643712 },
          { Service: "Amazon API Gateway", TotalCost: 0.0117985 },
          { Service: "Amazon Elastic File System", TotalCost: 0.001153152 },
          { Service: "AWS Backup", TotalCost: 0.000306465 },
          { Service: "Amazon CloudFront", TotalCost: 5.17e-8 },
          { Service: "AWS Lambda", TotalCost: 3.52e-8 },
          { Service: "AWS CloudTrail", TotalCost: 0 },
          { Service: "AWS Secrets Manager", TotalCost: 0 },
          { Service: "AWS Service Catalog", TotalCost: 0 },
          { Service: "Amazon Simple Notification Service", TotalCost: 0 },
          { Service: "Amazon Simple Queue Service", TotalCost: 0 },
          { Service: "AmazonCloudWatch", TotalCost: 0 },
        ],
        MonthYear: "July 2023",
      },
    ];
    setTopFiveServices(topFiveServicesDataJson);
  }

  function updatePastThreeMonthsCost() {
    //     //check with local storage before fetching
    //     const pastThreeMonthsTotalCost = JSON.parse(
    //       localStorage.getItem("pastThreeMonthsTotalCostsMonthWise"),
    //     );
    //     if (isLocalStorageDataValid() && pastThreeMonthsTotalCost) {
    //       setPastThreeMonthsCost(pastThreeMonthsTotalCost);
    //       return;
    //     }
    //     //fetch new data from api
    //     axios
    //       .get(`${baseUrl}/cost/pastThreeMonthsTotalCostsMonthWise`)
    //       .then(function (response) {
    //         setPastThreeMonthsCost(response.data.data);
    //         localStorage.setItem(
    //           "pastThreeMonthsTotalCostsMonthWise",
    //           JSON.stringify(response.data.data),
    //         );
    //       })
    //       .catch((error) => {
    //         if (error.message.includes("Network Error")) {
    //           setToastError(true);
    //         } else {
    //           toast.error(`API Error: ${error.message}`);
    //         }
    //       });

    const pastThreeMonthsTotalCostJson = [
      { Date: "2023-07-01", TotalCost: 515.931570546, MonthYear: "July, 2023" },
      {
        Date: "2023-08-01",
        TotalCost: 474.3210600443,
        MonthYear: "August, 2023",
      },
      {
        Date: "2023-09-01",
        TotalCost: 209.010804199,
        MonthYear: "September, 2023",
      },
    ];
    setPastThreeMonthsCost(pastThreeMonthsTotalCostJson);
  }

  // Function to calculate the hours difference between two dates
  //   const calculateHoursDifference = (date1, date2) => {
  //     const diffInMilliseconds = Math.abs(date2 - date1);
  //     return Math.floor(diffInMilliseconds / (60 * 60 * 1000));
  //   };

  useEffect(() => {
    updateCostExplorerData();
    updatePresentMonthCost();
    updateTopFiveServices();
    updatePastThreeMonthsCost();
    // if (!isLocalStorageDataValid()) {
    //   const currentTime = new Date().getTime();
    //   localStorage.setItem("dashboardTimestamp", currentTime);
    //   setHoursLeft(24);
    // } else {
    //   const currentTime = new Date().getTime();
    //   const prevTimestamp = Number(localStorage.getItem("dashboardTimestamp"));
    //   const hoursDifference = calculateHoursDifference(
    //     currentTime,
    //     prevTimestamp,
    //   );
    //   const hoursLeftForTheNextRefresh = 24 - hoursDifference;
    //   setHoursLeft(hoursLeftForTheNextRefresh ? hoursLeftForTheNextRefresh : 1);
    // }
  }, []);

  const [period, setPeriod] = React.useState(periodType.THREEMONTHS);

  const handleChange = (event) => {
    setPeriod(event.target.value);
  };

  function updateGraphData(cost, period) {
    setYAxisData(cost);
    setXAxisData(period);
  }

  function getCurrentChartInfo(label) {
    return { ...chartInformation, label };
  }

  useEffect(() => {
    const cost = [...yAxisData];
    const min = Math.min(...cost);
    const max = Math.max(...cost);
    const mean = cost.reduce((acc, cur) => (acc += cur)) / cost.length;
    setChartInformation({ ...chartInformation, min, max, mean });
  }, [yAxisData]);
  useEffect(() => {
    if (toastError) {
      toast.error(`Please try again after some time`);
    }
  }, [toastError]);

  useEffect(() => {
    if (toastError) {
      toast.error(`Please try again after some time`);
    }
  }, [toastError]);

  useEffect(() => {
    switch (period) {
      case periodType.ONEWEEK:
        if (costExplorerData.pastOneWeek?.length)
          updateGraphData(
            costExplorerData.pastOneWeek?.map((data) => data.Cost),
            costExplorerData.pastOneWeek?.map((data) => data.Date),
          );
        setChartInformation(
          getCurrentChartInfo(`${currency} per day from last 7 days`),
        );
        break;
      case periodType.THREEMONTHS:
        if (costExplorerData.pastThreeMonths?.length)
          updateGraphData(
            costExplorerData.pastThreeMonths?.map((data) => data.Cost),
            costExplorerData.pastThreeMonths?.map((data) => data.Week),
          );
        setChartInformation(
          getCurrentChartInfo(`${currency} per week from last 3 months`),
        );
        break;
      case periodType.ONEYEAR:
        if (costExplorerData.pastOneYear?.length)
          updateGraphData(
            costExplorerData.pastOneYear?.map((data) => data.Cost),
            costExplorerData.pastOneYear?.map((data) => data.Month),
          );
        setChartInformation(
          getCurrentChartInfo(`${currency} per month from past 1 year`),
        );

        break;
      default:
        break;
    }
  }, [period, costExplorerData]);

  function getHighestCostService() {
    //current month
    const highestCostService = topfiveServices[0]?.data[0];
    return highestCostService;
  }

  function renderCostDifferenceElement(previousAmount, presentAmount) {
    const difference = Math.abs(presentAmount - previousAmount);
    const percentageDifference = (difference / Math.abs(previousAmount)) * 100;
    const differenceInPercentage = Math.trunc(percentageDifference);
    const isProfit = presentAmount < previousAmount;
    return (
      <span
        className={
          isProfit ? "profit-percentage-div" : "non-profit-percentage-div"
        }>
        <span style={{ display: "inline-block" }}>
          {differenceInPercentage || ""}%
          {isProfit ? (
            <TrendingDownOutlinedIcon sx={{ fontSize: "16px" }} />
          ) : (
            <TrendingUpOutlinedIcon sx={{ fontSize: "16px" }} />
          )}
        </span>
      </span>
    );
  }

  function formatNumberToK(amount) {
    if (!amount) return (0).toFixed(2);

    if (amount >= 1000) {
      return (amount / 1000).toFixed(2) + "k";
    } else {
      return amount.toFixed(2);
    }
  }

  function renderCostExplorerChart() {
    return (
      <Line
        width="600px"
        height="300px"
        data={{
          labels: xAxisData,
          datasets: [
            {
              label: chartInformation.label,
              data: yAxisData,
              backgroundColor: "rgba(211,86,38,0.7)",
              borderColor: "rgba(53,74,95,0.7)",
              borderWidth: "1",
              fill: true,
            },
          ],
        }}
        options={{
          animation: {
            duration: 1000, // Set animation duration in milliseconds
            easing: "linear", // Use 'linear' easing for smoother animations
          },
        }}
      />
    );
  }

  function renderAnalyticChart() {
    return (
      <PolarArea
        width="300px"
        height="300px"
        data={{
          labels: ["Min", "Max", "Mean"],
          datasets: [
            {
              label: chartInformation.label,
              data: [
                chartInformation.min,
                chartInformation.max,
                chartInformation.mean,
              ],
              backgroundColor: [
                "rgba(211,86,38,0.7)",
                "rgba(53,74,95,0.7)",
                "rgba(230,206,160,0.7)",
              ],
              borderColor: "white",
              borderWidth: "0",
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            r: {
              pointLabels: {
                display: true,
                centerPointLabels: true,
                font: {
                  size: 14,
                },
              },
            },
          },
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: `Min: ${
                currency + chartInformation.min?.toFixed(2)
              }, Max: ${currency + chartInformation.max?.toFixed(2)}, Mean: ${
                currency + chartInformation.mean?.toFixed(2)
              }`,
            },
          },
        }}
      />
    );
  }

  function renderTopServices() {
    const lastThreeMonths = topfiveServices.map((obj) => obj.MonthYear);
    const serviceAndCostDataSet = [];
    const colorShades = [
      "rgba(211,86,38,0.6)",
      "rgba(53,74,95,0.4)",
      "rgba(230,206,160,0.6)",
      "rgba(211,86,38,0.4)",
      "rgba(53,74,95,0.7)",
    ];
    let serviceLabels = topfiveServices.length
      ? topfiveServices[0].data
          .map((serviceObj) => serviceObj.Service)
          .slice(0, 5)
      : [];

    serviceLabels.forEach((serviceLabel, idx) => {
      const costData = topfiveServices.map(
        (serviceObj) =>
          serviceObj.data.find((obj) => obj.Service === serviceLabel)
            ?.TotalCost,
      );

      const updatedDataSet = {
        label: serviceLabel,
        data: costData,
        backgroundColor: colorShades[idx],
      };

      serviceAndCostDataSet.push(updatedDataSet);
    });
    return (
      <Bar
        width="400px"
        height="300px"
        data={{
          labels: lastThreeMonths,
          datasets: serviceAndCostDataSet,
        }}
        options={{
          scales: {
            x: {
              stacked: true, // Enable stacking on the x-axis
            },
            y: {
              stacked: true, // Enable stacking on the y-axis
            },
          },
          plugins: {
            legend: {
              display: false,
              position: "top",
            },
            title: {
              display: true,
              text: `Top five service in last three months`,
            },
          },
        }}
      />
    );
  }

  function renderPastThreeMonthsCost() {
    const pastThreeMonths = pastThreeMonthsCost.length
      ? pastThreeMonthsCost.map((obj) => obj.MonthYear)
      : [""];

    const pastThreeMonthsTotalCost = pastThreeMonthsCost.length
      ? pastThreeMonthsCost.map((obj) => obj.TotalCost)
      : [0];

    return (
      <PolarArea
        width="300px"
        height="300px"
        data={{
          labels: pastThreeMonths,
          datasets: [
            {
              data: pastThreeMonthsTotalCost,
              backgroundColor: [
                "rgba(211,86,38,0.7)",
                "rgba(53,74,95,0.7)",
                "rgba(230,206,160,0.7)",
              ],
              borderColor: "black",
              borderWidth: "1",
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            r: {
              pointLabels: {
                display: true,
                centerPointLabels: true,
                font: {
                  size: 12,
                },
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
            title: {
              display: true,
              text: "Past three months total cost",
            },
          },
        }}
      />
    );
  }

  function getCardsData() {
    const cloudAccountsCard = {
      title: "No of cloud accounts",
      icon: <CloudDoneOutlinedIcon fontSize="large" />,
      dataDivElement: (
        <>
          <p>{1}</p>
          <p>Cloud account</p>
        </>
      ),
    };

    const highestCostService = {
      title: "Highest-Cost service",
      icon: <CloudSyncOutlinedIcon fontSize="large" />,
      dataDivElement: (
        <>
          <p>
            {currency + formatNumberToK(getHighestCostService()?.TotalCost)}
          </p>
          <p>{getHighestCostService()?.Service} </p>
        </>
      ),
    };

    const prevMonthCost = {
      title: "Previous month total cost",
      icon: <AccountBalanceWalletOutlinedIcon fontSize="large" />,
      dataDivElement: (
        <>
          <p>{currency + formatNumberToK(previousMonthCost.cost)}</p>
          <p>
            Bill
            {previousMonthCost.month &&
              `${" (" + previousMonthCost.month + ")"}`}
          </p>
        </>
      ),
    };

    const presentMontCost = {
      title: "Present month total Cost",
      icon: <AccountBalanceWalletOutlinedIcon fontSize="large" />,
      dataDivElement: (
        <>
          <p>
            {currency + formatNumberToK(presentMonthCost.cost)}
            <span>
              {renderCostDifferenceElement(
                previousMonthCost.cost,
                presentMonthCost.cost,
              )}
            </span>
          </p>
          <p>
            Bill
            {presentMonthCost.month && `${" (" + presentMonthCost.month + ")"}`}
          </p>
        </>
      ),
    };

    return [
      cloudAccountsCard,
      highestCostService,
      prevMonthCost,
      presentMontCost,
    ];
  }

  return (
    <div className="page-wrapper">
      <NavigationTab activeTab={tabTypes.DASHBOARD} />
      <div className="dashboard-wrapper">
        {hoursLeft && (
          <div data-testid="refresh-time-div" className="refresh-time-label">
            <span className="refresh-time-logo">
              <HistoryOutlinedIcon size="small" />
            </span>
            {`Cost will be refreshed in ${hoursLeft} ${
              hoursLeft > 1 ? "hours" : "hour"
            }`}
          </div>
        )}
        <CardsContainer cards={getCardsData()} />
        <div className="cost-explorer-wrapper">
          <div className="select-cost-explorer">
            <div className="cost-explorer-title">Cost explorer</div>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Period</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={period}
                label="Period"
                onChange={handleChange}>
                <MenuItem value={periodType.ONEWEEK}>Last one week</MenuItem>
                <MenuItem value={periodType.THREEMONTHS}>
                  Last 3 months
                </MenuItem>
                <MenuItem value={periodType.ONEYEAR}>Last 12 months</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="cost-explorer">
            <div>{renderCostExplorerChart()}</div>
            <div>{renderAnalyticChart()}</div>
          </div>
        </div>

        <div className="top-services-wrapper">
          <div className="top-services-title">Services analytics</div>
          <div className="top-services">
            <div>{renderPastThreeMonthsCost()}</div>
            <div>{renderTopServices()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
