import { getPath } from "./SplineGraphLine";
import { Point } from "../Point";
import PropTypes from "prop-types";

import "./SplineGraphArea.scss";

export default function SplineGraphArea(props) {
  const { points, bottom } = props;

  if (points.length <= 2) {
    return <path />;
  }

  const linePath = getPath(points);

  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];

  return (
    <path
      className="spline-graph-area"
      d={`${linePath} L ${lastPoint.x} ${bottom} L ${firstPoint.x} ${bottom} Z`}
    />
  );
}

SplineGraphArea.propTypes = {
  className: PropTypes.string,
  points: PropTypes.arrayOf(PropTypes.instanceOf(Point)).isRequired,
  bottom: PropTypes.number.isRequired,
};
