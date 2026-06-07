"use client";
import { prepareData } from "@/src/utils/funcs";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function DurationChart({ orders }: any) {
  const startData = [
    {
      duration: "اشتراک 30 روزه",
      value: 0,
      color: "#b91c1c",
    },
    {
      duration: "اشتراک 60 روزه",
      value: 0,
      color: "#7e22ce",
    },
    {
      duration: "اشتراک 90 روزه",
      value: 0,
      color: "#1d4ed8",
    },
    {
      duration: "اشتراک 180",
      value: 0,
      color: "#a16207",
    },
  ];
  const data = prepareData(startData, orders);
  console.log(data);

  const windowWidth: any = typeof window !== "undefined" && window.innerWidth;

  return (
    <div className="bg-namavaBlack duration-chart  rounded-md border border-gray-800 shadow py-4 md:py-6 px-8">
      <h2 className="text-xl">تعداد خرید اشتراک</h2>
      <ResponsiveContainer height={267}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="duration"
            paddingAngle={2}
            cx={windowWidth >= 768 ? "40%" : ""}
            cy={windowWidth >= 768 ? "50%" : ""}
            outerRadius={110}
            innerRadius={85}
          >
            {data.map((entry: any) => (
              <Cell
                key={entry.duration}
                fill={entry.color}
                stroke={entry.color}
              />
            ))}
          </Pie>

          <Tooltip
            wrapperStyle={{
              fontSize: windowWidth > 768 ? "16px" : "12px",
              fontFamily: "Dana",
            }}
          />

          {windowWidth >= 768 && (
            <Legend
              verticalAlign="middle"
              layout="horizontal"
              align="right"
              width={135}
              iconSize={12}
              iconType="circle"
              wrapperStyle={{ fontFamily: "Dana" }}
            />
          )}

          <Legend
            verticalAlign="bottom"
            layout="horizontal"
            align="right"
            wrapperStyle={{
              marginTop: "20px",
              fontSize: "14px",
              fontFamily: "Dana",
            }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DurationChart;
