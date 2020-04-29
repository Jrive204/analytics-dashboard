import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { addDays } from "date-fns";
import { ChartWrapper } from "./styles";
import CustomDatePicker from "./datepicker";
import { queryReport } from "./queryReport";
import { formatDate } from "./utils";

const DayVisitsReport = (props) => {
  const INITIAL_STATE = {
    labels: [],
    values: [],
  };
  const [reportData, setReportData] = useState(INITIAL_STATE);
  const [startDate, setStartDate] = useState(addDays(new Date(), -10));
  const [endDate, setEndDate] = useState(new Date());
  const [average, setAverage] = useState(0);

  const displayResults = (response) => {
    const queryResult = response.result.reports[0].data.rows;
    const total = response.result.reports[0].data.totals[0].values[0];
    setAverage(parseInt(total / response.result.reports[0].data.rowCount));
    let labels = [];
    let values = [];
    queryResult.forEach((row) => {
      labels.push(formatDate(row.dimensions[0]));
      values.push(row.metrics[0].values[0]);
    });
    setReportData({
      ...reportData,
      labels,
      values,
    });
  };

  const data = {
    labels: reportData.labels,
    datasets: [
      {
        label: `${props.title} per day`,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: reportData.values,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 7,
          },
        },
      ],
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
  };

  useEffect(() => {
    const request = {
      startDate,
      endDate,
      metrics: props.metric,
      dimensions: ["ga:date"],
    };
    queryReport(request)
      .then((resp) => displayResults(resp))
      .catch((error) => console.error(error));
  }, [startDate, endDate]);

  return (
    <>
      <h2>{`${props.title} per day`}</h2>
      <h5>{`Average - ${average} ${props.title}`}</h5>
      <CustomDatePicker
        placeholder={"Start date"}
        date={startDate}
        handleDateChange={(date) => setStartDate(date)}
      />
      <CustomDatePicker
        placeholder={"End date"}
        date={endDate}
        handleDateChange={(date) => setEndDate(date)}
      />
      {reportData && (
        <ChartWrapper>
          <Line data={data} options={options} width={100} height={250} />
        </ChartWrapper>
      )}
    </>
  );
};

export default DayVisitsReport;