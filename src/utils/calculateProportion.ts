// Calculate day proportion based on the Earth's position and whether it is increasing or decreasing (being dragged clockwise or anticlockwise) // probably move this out of this component, too messy!!
export function calculateProportion (
    position: number,
    isIncreasing: boolean
  ): number {
    const transitions = [
      { start: 90, end: 135, startValue: 60, endValue: 70, isIncreasing: true },
      {
        start: 135,
        end: 90,
        startValue: 70,
        endValue: 60,
        isIncreasing: false,
      },
      {
        start: 135,
        end: 180,
        startValue: 70,
        endValue: 60,
        isIncreasing: false,
      },
      {
        start: 180,
        end: 135,
        startValue: 60,
        endValue: 70,
        isIncreasing: true,
      },
      {
        start: 180,
        end: 225,
        startValue: 60,
        endValue: 50,
        isIncreasing: true,
      },
      {
        start: 225,
        end: 180,
        startValue: 50,
        endValue: 60,
        isIncreasing: false,
      },
      {
        start: 225,
        end: 270,
        startValue: 50,
        endValue: 40,
        isIncreasing: true,
      },
      {
        start: 270,
        end: 225,
        startValue: 40,
        endValue: 50,
        isIncreasing: false,
      },
      {
        start: 270,
        end: 315,
        startValue: 40,
        endValue: 30,
        isIncreasing: true,
      },
      {
        start: 315,
        end: 270,
        startValue: 30,
        endValue: 40,
        isIncreasing: false,
      },
      {
        start: 315,
        end: 360,
        startValue: 30,
        endValue: 40,
        isIncreasing: true,
      },
      {
        start: 360,
        end: 315,
        startValue: 40,
        endValue: 30,
        isIncreasing: false,
      },
      { start: 0, end: 45, startValue: 40, endValue: 50, isIncreasing: true },
      { start: 45, end: 0, startValue: 50, endValue: 40, isIncreasing: false },
      { start: 45, end: 90, startValue: 50, endValue: 60, isIncreasing: true },
      { start: 90, end: 45, startValue: 60, endValue: 50, isIncreasing: false },
    ];

    for (const transition of transitions) {
      if (
        isIncreasing &&
        position > transition.start &&
        position <= transition.end
      ) {
        const proportion =
          transition.startValue +
          ((transition.endValue - transition.startValue) /
            (transition.end - transition.start)) *
            (position - transition.start);
        // console.log(
        //   `Proportion increased from ${transition.startValue} to ${transition.endValue} for position ${position}`
        // );
        return proportion;
      } else if (
        !isIncreasing &&
        position >= transition.end &&
        position <= transition.start
      ) {
        const proportion =
          transition.endValue +
          ((transition.startValue - transition.endValue) /
            (transition.start - transition.end)) *
            (position - transition.end);
        // console.log(
        //   `Proportion decreased from ${transition.endValue} to ${transition.startValue} for position ${position}`
        // );
        return proportion;
      }
    }

    // console.log(`Default proportion for position ${position}`);
    return 60; // Default value if no transitions match
  };