import React from "react";

// todo: => move to Core!

interface IPositionOptions extends PositionOptions {
  watch?: Boolean;
  fields?: Array<keyof Coordinates>;
}

interface IPosition extends Partial<Coordinates> {
  timestamp?: number;
  error?: string;
}

function usePosition(
  settings: IPositionOptions = {
    watch: true,
    fields: ["latitude", "longitude"],
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0,
  }
): IPosition {
  const [position, setPosition] = React.useState<IPosition>({});
  const { watch, fields, ..._settings } = settings;

  const onSuccess = React.useCallback(
    ({ coords, timestamp }: Position) => {
      const hasChanged = fields.reduce((acc, val) => {
        return acc || coords[val] !== position[val];
      }, false);

      if (hasChanged)
        setPosition({
          accuracy: coords.accuracy,
          altitude: coords.altitude,
          altitudeAccuracy: coords.altitudeAccuracy,
          heading: coords.heading,
          latitude: coords.latitude,
          longitude: coords.longitude,
          speed: coords.speed,
          timestamp,
        });
    },
    [fields]
  );
  const onError = React.useCallback(
    (error: PositionError) =>
      setPosition({ ...position, error: error.message }),
    []
  );

  React.useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      setPosition({ ...position, error: "Geolocation is not supported" });
      return undefined;
    }

    let watcher: number;
    if (watch) watcher = geo.watchPosition(onSuccess, onError, _settings);
    else geo.getCurrentPosition(onSuccess, onError, _settings);

    return () => !!watcher && geo.clearWatch(watcher);
  }, [_settings]);

  return position;
}

export default usePosition;
