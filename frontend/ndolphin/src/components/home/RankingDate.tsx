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

  return (
    <>
      <p className="text-sm font-medium text-[#565656]">{props.type === "일간" ? formattedDay : props.type === "주간" ? formattedWeek : formattedMonth}</p>
    </>
  );
};

export default RankingDate;
