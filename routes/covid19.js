const express = require("express");
const route = express.Router();

route.post("/on-covid-19", (req, res, next) => {
  const impact = {};
  const severeImpact = {};
  const data = req.body;
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;

  const { periodType, timeToElapse } = data;

  let convertToDays = timeToElapse;

  switch (periodType) {
    case "months":
      convertToDays = timeToElapse * 30;
      break;

    case "weeks":
      convertToDays = timeToElapse * 7;
      break;

    default:
      convertToDays = timeToElapse;
      break;
  }

  const power = parseInt(convertToDays / 3, 10);
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** power;
  severeImpact.infectionsByRequestedTime =
    severeImpact.currentlyInfected * 2 ** power;

  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  severeImpact.severeCasesByRequestedTime =
    severeImpact.infectionsByRequestedTime * 0.15;

  const availBeds = data.totalHospitalBeds * 0.35;
  impact.hospitalBedsByRequestedTime =
    availBeds - impact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime =
    availBeds - severeImpact.severeCasesByRequestedTime;

  impact.casesForICUByRequestedTime = impact.infectionsByRequestedTime * 0.05;
  severeImpact.casesForICUByRequestedTime =
    severeImpact.infectionsByRequestedTime * 0.05;

  impact.casesForVentilatorsByRequestedTime =
    impact.infectionsByRequestedTime * 0.02;
  severeImpact.casesForVentilatorsByRequestedTime =
    severeImpact.infectionsByRequestedTime * 0.02;

  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = data.region;

  impact.dollarsInFlight =
    impact.infectionsByRequestedTime *
    avgDailyIncomeInUSD *
    avgDailyIncomePopulation *
    convertToDays;

  severeImpact.dollarsInFlight =
    severeImpact.infectionsByRequestedTime *
    avgDailyIncomeInUSD *
    avgDailyIncomePopulation *
    convertToDays;

  res.status(200).json({
    data,
    impact,
    severeImpact,
  });
});

route.post("/on-covid-19/xml", (req, res, next) => {
  const impact = {};
  const severeImpact = {};
  const data = req.body;
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;

  const { periodType, timeToElapse } = data;

  let convertToDays = timeToElapse;

  switch (periodType) {
    case "months":
      convertToDays = timeToElapse * 30;
      break;

    case "weeks":
      convertToDays = timeToElapse * 7;
      break;

    default:
      convertToDays = timeToElapse;
      break;
  }

  const power = parseInt(convertToDays / 3, 10);
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** power;
  severeImpact.infectionsByRequestedTime =
    severeImpact.currentlyInfected * 2 ** power;

  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  severeImpact.severeCasesByRequestedTime =
    severeImpact.infectionsByRequestedTime * 0.15;

  const availBeds = data.totalHospitalBeds * 0.35;
  impact.hospitalBedsByRequestedTime =
    availBeds - impact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime =
    availBeds - severeImpact.severeCasesByRequestedTime;

  impact.casesForICUByRequestedTime = impact.infectionsByRequestedTime * 0.05;
  severeImpact.casesForICUByRequestedTime =
    severeImpact.infectionsByRequestedTime * 0.05;

  impact.casesForVentilatorsByRequestedTime =
    impact.infectionsByRequestedTime * 0.02;
  severeImpact.casesForVentilatorsByRequestedTime =
    severeImpact.infectionsByRequestedTime * 0.02;

  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = data.region;

  impact.dollarsInFlight =
    impact.infectionsByRequestedTime *
    avgDailyIncomeInUSD *
    avgDailyIncomePopulation *
    convertToDays;

  severeImpact.dollarsInFlight =
    severeImpact.infectionsByRequestedTime *
    avgDailyIncomeInUSD *
    avgDailyIncomePopulation *
    convertToDays;

  // res.status(200).json({
  //   data,
  //   impact,
  //   severeImpact,
  // });

  res.type("application/xml");
  res.status(200).send(data, impact, severeImpact);
});

route.post("/on-covid-19/json", (req, res, next) => {
  const impact = {};
  const severeImpact = {};
  const data = req.body;
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;

  const { periodType, timeToElapse } = data;

  let convertToDays = timeToElapse;

  switch (periodType) {
    case "months":
      convertToDays = timeToElapse * 30;
      break;

    case "weeks":
      convertToDays = timeToElapse * 7;
      break;

    default:
      convertToDays = timeToElapse;
      break;
  }

  const power = parseInt(convertToDays / 3, 10);
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** power;
  severeImpact.infectionsByRequestedTime =
    severeImpact.currentlyInfected * 2 ** power;

  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  severeImpact.severeCasesByRequestedTime =
    severeImpact.infectionsByRequestedTime * 0.15;

  const availBeds = data.totalHospitalBeds * 0.35;
  impact.hospitalBedsByRequestedTime =
    availBeds - impact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime =
    availBeds - severeImpact.severeCasesByRequestedTime;

  impact.casesForICUByRequestedTime = impact.infectionsByRequestedTime * 0.05;
  severeImpact.casesForICUByRequestedTime =
    severeImpact.infectionsByRequestedTime * 0.05;

  impact.casesForVentilatorsByRequestedTime =
    impact.infectionsByRequestedTime * 0.02;
  severeImpact.casesForVentilatorsByRequestedTime =
    severeImpact.infectionsByRequestedTime * 0.02;

  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = data.region;

  impact.dollarsInFlight =
    impact.infectionsByRequestedTime *
    avgDailyIncomeInUSD *
    avgDailyIncomePopulation *
    convertToDays;

  severeImpact.dollarsInFlight =
    severeImpact.infectionsByRequestedTime *
    avgDailyIncomeInUSD *
    avgDailyIncomePopulation *
    convertToDays;

  res.type("application/json");

  res.status(200).json({
    data,
    impact,
    severeImpact,
  });
});

module.exports = route;
