import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="w-full pt-48 text-center">
      <h1 className="text-white font-bold text-5xl"><Spin size="large"/></h1>
    </div>
  )
}