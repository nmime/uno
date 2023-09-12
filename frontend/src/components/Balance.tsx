const Balance = () => {
  const balance =
    typeof window !== "undefined"
      ? Number(localStorage.getItem("balance")) || 0
      : 0

  /*const specialBalance =
    typeof window !== "undefined"
      ? Number(localStorage.getItem("specialBalance")) || 0
      : 0

  <div className="">{`${specialBalance}`}</div>*/
  return (
    <div className="ali absolute right-0 top-0 flex flex-col items-end text-base	text-[--text-color]">
      <div className="">{`${balance} 🪙`}</div>
    </div>
  )
}

export default Balance
