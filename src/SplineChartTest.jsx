import _ from "lodash";
import { Point } from "./charts/Point";
import { Rectangle } from "./charts/Rectangle";
import SplineChart from "./charts/spline/SplineChart";
import SplineChartGrid from "./charts/spline/SplineChartGrid";
import SplineChartPointer from "./charts/spline/SplineChartPointer";
import SplineChartRange from "./charts/spline/SplineChartRange";
import SplineChartShadow from "./charts/spline/SplineChartShadow";
import SplineChartXAxis from "./charts/spline/SplineChartXAxis";
import SplineChartYAxis from "./charts/spline/SplineChartYAxis";
import { useInterval } from "./utilities/hooks";
import { useMemo, useState } from "react";

export default function SplineChartTest() {
  const [active, setActive] = useState(null);

  const [items, setItems] = useState(() => {
    const aPoints = getAPoints();
    const bPoints = getBPoints();

    return [
      {
        key: "A",
        values: aPoints,
        size: aPoints.length,
      },
      {
        key: "B",
        values: bPoints,
        size: bPoints.length,
      },
    ];
  }, []);

  const chartView = useMemo(() => new Rectangle(35, 10, 560, 260), []);
  const rangeView = useMemo(() => new Rectangle(35, 10, 560, 40), []);

  const [rangeStart, setRangeStart] = useState(0);
  const [rangeEnd, setRangeEnd] = useState(900);

  useInterval(() => {
    setItems((t) => t.map((_s, i) => t[t.length - 1 - i]));
  }, 5000);

  const chartRange = useMemo(
    () => ({ minimum: new Point(rangeStart, -100), maximum: new Point(rangeEnd, 300) }),
    [rangeEnd, rangeStart]
  );

  const rangeRange = useMemo(
    () => ({ minimum: new Point(0, -100), maximum: new Point(600, 300) }),
    []
  );

  return (
    <>
      <SplineChart width={600} height={300} view={chartView} range={chartRange} items={items}>
        <SplineChartShadow value={0} />
        <SplineChartXAxis
          items={[
            { key: 0, value: 0 },
            { key: 100, value: 100 },
            { key: 200, value: 200 },
            { key: 300, value: 300 },
            { key: 400, value: 400 },
            { key: 500, value: 500 },
            { key: 590, value: 590 },
          ]}
          labelWidth={70}
        />
        <SplineChartYAxis
          items={[
            { key: 0, value: 0 },
            { key: 100, value: 100 },
            { key: 200, value: 200 },
            { key: 300, value: 300 },
          ]}
          labelHeight={30}
        />
        <SplineChartGrid xAxis={[100, 200, 300, 400, 500]} yAxis={[0, 100, 200, 300]} />
        <SplineChartPointer
          active={active}
          setActive={setActive}
          getLabel={(t) => `${t.spline.item.key}: ${t.value.x}, ${t.value.y}`}
        />
      </SplineChart>

      <SplineChart width={600} height={40} view={rangeView} range={rangeRange} items={items}>
        <SplineChartRange
          start={rangeStart}
          end={rangeEnd}
          setRange={(start, end) => {
            setRangeStart(start);
            setRangeEnd(end);
          }}
        />
      </SplineChart>
    </>
  );
}

function getAPoints() {
  return [
    new Point(0, 120),
    new Point(10, 20),
    new Point(20, 160),
    new Point(30, 170),
    new Point(40, 280),
    new Point(50, 210),
    new Point(60, 210),
    new Point(70, 270),
    new Point(80, 150),
    new Point(90, 170),
    new Point(100, 180),
    new Point(110, 30),
    new Point(120, 220),
    new Point(130, 230),
    new Point(140, 50),
    new Point(150, 140),
    new Point(160, 120),
    new Point(170, 180),
    new Point(180, 270),
    new Point(190, 260),
    new Point(200, 140),
    new Point(210, 140),
    new Point(220, 50),
    new Point(230, 20),
    new Point(240, 230),
    new Point(250, 280),
    new Point(260, 80),
    new Point(270, 60),
    new Point(280, 20),
    new Point(290, 50),
    new Point(300, 0),
    new Point(310, 260),
    new Point(320, 190),
    new Point(330, 210),
    new Point(340, 170),
    new Point(350, 260),
    new Point(360, 150),
    new Point(370, 270),
    new Point(380, 160),
    new Point(390, 210),
    new Point(400, 160),
    new Point(410, 300),
    new Point(420, 220),
    new Point(430, 170),
    new Point(440, 220),
    new Point(450, 20),
    new Point(460, 10),
    new Point(470, 60),
    new Point(480, 70),
    new Point(490, 260),
    new Point(500, 130),
    new Point(510, 10),
    new Point(520, 0),
    new Point(530, 40),
    new Point(540, 140),
    new Point(550, 200),
    new Point(560, 30),
    new Point(570, 90),
    new Point(580, 140),
    new Point(590, 50),
    new Point(600, 200),
  ];
}

function getBPoints() {
  return [
    new Point(0, -30),
    new Point(100, 170),
    new Point(200, 30),
    new Point(300, 130),
    new Point(400, 100),
    new Point(500, 200),
    new Point(600, 100),
  ];
}
