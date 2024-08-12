import React from "react";

const BestProfile = () => {
  const userList = [
    {
      id: 1,
      name: "삶은계란",
      point: 142675,
    },
    {
      id: 2,
      name: "만약핑인데",
      point: 14249,
    },
    {
      id: 3,
      name: "별이 빛나는 밤",
      point: 13578,
    },
    {
      id: 4,
      name: "코에촉촉",
      point: 13221,
    },
    {
      id: 5,
      name: "상상의 나무꾼",
      point: 12776,
    },
    {
      id: 1,
      name: "삶은계란",
      point: 142675,
    },
    {
      id: 2,
      name: "만약핑인데",
      point: 14249,
    },
    {
      id: 3,
      name: "별이 빛나는 밤",
      point: 13578,
    },
    {
      id: 4,
      name: "코에촉촉",
      point: 13221,
    },
    {
      id: 5,
      name: "상상의 나무꾼",
      point: 12776,
    },
  ];

  return (
    <>
      {userList.map((user, index) => (
        <>
          <div className="px-14 py-2 grid grid-cols-[10%_75%_15%] hover:scale-110 duration-200" key={index}>
            <div className="flex items-center">
              <p className="text-2xl font-bold">{index + 1}</p>
            </div>
            <div className="flex items-center">
              <img className="w-9 h-9 mr-3 rounded-[50%]" src={`/assets/profile/profile${index + 1}.png`} alt="" />
              <p className="font-semibold hover:underline hover:underline-offset-2">{user.name}</p>
            </div>
            <div className="flex justify-end items-center">
              <p className="font-medium">{user.point}</p>
              <p className="font-medium">P</p>
            </div>
          </div>
          <hr className="bg-[#9E9E9E]" />
        </>
      ))}
    </>
  );
};

export default BestProfile;
