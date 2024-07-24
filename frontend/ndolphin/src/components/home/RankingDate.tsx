import React from "react";

interface Props {
  type: string;
}

const RankingDate = (props: Props) => {
  const today = new Date();
  const aWeekAgoToday = new Date();
  aWeekAgoToday.setDate(today.getDate() - 7);
  const aMonthAgoToday = new Date();
  aMonthAgoToday.setMonth(today.getMonth() - 1);

  const formattedDay = `
    ${today.getFullYear()}.${today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1}.${today.getDate() < 10 ? "0" + today.getDate() : today.getDate()}
    ${today.getHours()}:${today.getMinutes()} 기준
  `;
  const formattedWeek = `
    ${aWeekAgoToday.getFullYear()}.${aWeekAgoToday.getMonth() + 1 < 10 ? "0" + (aWeekAgoToday.getMonth() + 1) : aWeekAgoToday.getMonth() + 1}.${aWeekAgoToday.getDate() < 10 ? "0" + aWeekAgoToday.getDate() : aWeekAgoToday.getDate()}
    ~
    ${today.getFullYear()}.${today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1}.${today.getDate() < 10 ? "0" + today.getDate() : today.getDate()}
    ${today.getHours()}:${today.getMinutes()}
  `;
  const formattedMonth = `
    ${aMonthAgoToday.getFullYear()}.${aMonthAgoToday.getMonth() + 1 < 10 ? "0" + (aMonthAgoToday.getMonth() + 1) : aMonthAgoToday.getMonth() + 1}.${aMonthAgoToday.getDate() < 10 ? "0" + aMonthAgoToday.getDate() : aMonthAgoToday.getDate()}
    ~
    ${today.getFullYear()}.${today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1}.${today.getDate() < 10 ? "0" + today.getDate() : today.getDate()}
  `;

  switch (props.type) {
    case "일간":
      return <p>{formattedDay}</p>;
    case "주간":
      return <p>{formattedWeek}</p>;
    case "월간":
      return <p>{formattedMonth}</p>;
    default:
      return null;
  }
};

export default RankingDate;
