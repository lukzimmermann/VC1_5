import SunCalc from 'suncalc';

export function SunPosition(
  radius = 1,
  time = new Date(),
  baseAngle = 0,
  coordinate = [47.3, 8.55]
) {
  const MILLISECONDS_TO_HOURS = 1000 * 60 * 60;

  const sunTimes = SunCalc.getTimes(time, coordinate[0], coordinate[1]);

  const sunPositionTime = new Date();
  sunPositionTime.setMonth(time.getMonth());
  const sunPosition = SunCalc.getPosition(
    sunPositionTime.setHours(13),
    coordinate[0],
    coordinate[1]
  );

  const sunTotalTime =
    (sunTimes.sunset - sunTimes.sunrise) / MILLISECONDS_TO_HOURS;

  const sunTimeUntilNow =
    sunTotalTime - (sunTimes.sunset - time) / MILLISECONDS_TO_HOURS;

  const sunProgress = (1 / sunTotalTime) * sunTimeUntilNow;

  const z_theta = baseAngle;
  const x_theta = Math.PI * -0.5 + sunPosition.altitude;
  const sun_angle = Math.PI * (sunProgress - 0.5) * -1;

  let point = [Math.sin(sun_angle) * radius, 0, Math.cos(sun_angle) * radius];

  const R_z = [
    [Math.cos(z_theta), -Math.sin(z_theta), 0],
    [Math.sin(z_theta), Math.cos(z_theta), 0],
    [0, 0, 1],
  ];

  const R_x = [
    [1, 0, 0],
    [0, Math.cos(x_theta), -Math.sin(x_theta)],
    [0, Math.sin(x_theta), Math.cos(x_theta)],
  ];

  point = [
    R_x[0][0] * point[0] + R_x[0][1] * point[1] + R_x[0][2] * point[2],
    R_x[1][0] * point[0] + R_x[1][1] * point[1] + R_x[1][2] * point[2],
    R_x[2][0] * point[0] + R_x[2][1] * point[1] + R_x[2][2] * point[2],
  ];

  point = [
    R_z[0][0] * point[0] + R_z[0][1] * point[1] + R_z[0][2] * point[2],
    R_z[1][0] * point[0] + R_z[1][1] * point[1] + R_z[1][2] * point[2],
    R_z[2][0] * point[0] + R_z[2][1] * point[1] + R_z[2][2] * point[2],
  ];

  return point;
}
