function RelayBookPageForm() {
  return (
    <div className="w-[53%] border border-zinc-950">
      <p className="m-3 text-xl font-bold">본문</p>
      <hr className="mx-3 my-2 border-zinc-900" />
      <textarea className="notes w-full h-[370px] resize-none focus:outline-none placeholder:text-zinc-400" placeholder="이야기가 시작될 '만약에~' 내용을 입력해 주세요 (최소 글자수 100자 이상)"></textarea>
    </div>
  );
}

export default RelayBookPageForm;
