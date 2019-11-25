import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

import { Dir } from "../../../data/dir.interface";
import { fullUrl } from "../../../common/useFetch";

const Dirs = function({ title = "Directories" }: { title: string }) {
  const [tmp, setTmp] = useState("");
  const [dirs, setDirs] = useState<Dir[]>([]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(fullUrl("config/dirs"));
        const json = await res.json();

        setDirs(json);
      } catch (error) {
        console.info(error, "Get config.DIRS");
      }
    };
    fetchData();
  }, [count]);
  const refresh = () => {
    setCount(count + 1);
  };
  // const [_err, dirs] = useFetch<Dir[]>("config/dirs", undefined, []);
  return (
    <div>
      <h4>{title}</h4>
      <ul>
        {dirs.map((dir, idx) => (
          <li key={idx}>
            <button
              title="删除文件夹"
              onClick={async () => {
                try {
                  await fetch(fullUrl(`config/dirs/${dir.id}`), {
                    method: "DELETE"
                  });
                  const newDirs = [...dirs];
                  newDirs.splice(idx, 1);
                  setDirs(newDirs);
                } catch (error) {}
              }}
            >
              x
            </button>
            {dir.path}
          </li>
        ))}
      </ul>
      <div>
        <input value={tmp} onChange={e => setTmp(e.target.value)} />
        <button
          onClick={async () => {
            //
            await fetch(fullUrl("config/dirs"), {
              method: "POST",
              body: JSON.stringify({ path: tmp })
            });

            setTmp("");
            refresh();
          }}
        >
          添加到文件夹
        </button>
        {tmp}
        <button onClick={refresh}>刷新</button>
      </div>
    </div>
  );
};

export default function Configs() {
  return (
    <div>
      <Dirs title="文件夹" />
    </div>
  );
}
