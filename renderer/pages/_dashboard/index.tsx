import React from "react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div>
      <h1>控制面板</h1>
      <ul>
        <li>
          <h3>导航</h3>
          <ul>
            <li>选择导航</li>
            <li>排序</li>
            <li>添加描述</li>
          </ul>
        </li>
        <li>
          <Link href="/_dashboard/config">
            <a>配置项</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
