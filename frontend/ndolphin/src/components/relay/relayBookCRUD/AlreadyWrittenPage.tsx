const AlreaduWrittenPage = () => {
  return (
    <div className="h-[90%] flex flex-col justify-center items-center gap-2">
      {/* 페이지 추가 버튼을 클릭하지 않았을 시 */}
      <div className="flex flex-col items-center gap-6">
        <p className="text-outline text-2xl font-bold drop-shadow-md text-zinc-600">이미 내가 참여한 이야기예요</p>
      </div>
      <p className="font-bold text-zinc-700">페이지 추가는 1회만 가능해요</p>
    </div>
  );
}

export default AlreaduWrittenPage