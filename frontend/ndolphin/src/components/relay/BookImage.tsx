function BookImage() {
  return (
    <>
      <div className="w-[53%] mx-[47.5%] mt-4 border border-zinc-950">
        <p className="m-3 text-xl font-bold">표지</p>
        <hr className="mx-3 my-2 border-zinc-900" />
        <div className="grid grid-rows-[60%_40%]">
          <div className="flex justify-center items-center">
            <img src="/assets/relayStartSample.png" alt="#" className="w-3/4 h-4/5 border rounded-md" />
          </div>

          <div className="py-11 h-full grid grid-cols-[49%_2%_49%]">
            <div className="flex flex-col items-center justify-center">
              <button className="w-32 px-2 py-1 flex justify-between items-center rounded-3xl border border-solid border-zinc-300 font-bold text-zinc-800">
                <img src="/assets/aiImageIcon.png" className="w-5" alt="#"></img>
                <p className="text-xs">AI 이미지 생성</p>
              </button>
              <div className="my-5 flex flex-col items-center justify-center">
                <div>
                  <span className="font-bold">AI로 이미지</span>를
                </div>
                <p>만들어 표지로 생성</p>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <hr className="h-36 border-l border-dashed border-zinc-400"></hr>
            </div>

            <div className="flex flex-col items-center justify-center">
              <button className="w-32 px-2 py-1 flex items-center rounded-3xl border border-solid border-zinc-300 font-bold text-zinc-800">
                <img src="/assets/addImageIcon.png" className="w-5" alt="#"></img>
                <p className="ml-5 text-xs">사진 첨부</p>
              </button>
              <div className="my-5 flex flex-col items-center">
                <span>
                  표지 이미지<span className="font-bold"> 직접</span> 첨부
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookImage;
