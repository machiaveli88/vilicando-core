const dblTouchTapMaxDelay = 300;
let latestTouchTap: { time: number; target: any } = {
  time: 0,
  target: null
};

export default (event: any) => {
  const touchTap = {
    time: new Date().getTime(),
    target: event.currentTarget
  };
  const isFastDblTouchTap =
    touchTap.target === latestTouchTap.target &&
    touchTap.time - latestTouchTap.time < dblTouchTapMaxDelay;
  latestTouchTap = touchTap;

  return isFastDblTouchTap;
};
