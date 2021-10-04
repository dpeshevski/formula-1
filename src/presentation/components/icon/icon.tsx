import React from 'react';

import useStyles from './icon-styles.scss';

export enum IconName {
  trophy = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABV0lEQVRIie2WMUsDMRiGn4oKFl30f+jmL5CC1lFXnfQH6NCOuuumq/6O4tipVSgt6KCb1blQdShYz+G+o+FILjHXlIJ9IeSSfPc+X3LJEZhpClQHopylbjKfC5g4Ateq4Puio4z+oWdsVBpcBprAF9Aag39LvJrAjilol/ybyVa08HsZrADLwPkYQGfiVZV2Qwf+lMFVaReAWg5ojdHmWpO+jwSmfuMnqStSR8CtLkNH3TA6FYnnoy6wBAwl+AooAitAn7/Ptk+8xEXgWvq+gS1TlofAQAKfgT3g0gN8AewDL9IeAAeWFWID6Cgm7x7gN+W5DazboIkWgOOUgQ/8CJh3hapaJF6yO+DHEfggSS/5AHXaBHoZwJ7EBFGJeHemoUPi321QnWrAJ6Gh/0tlso9XF9gOAe5mQJPy6mpmu/qoiuwh7p6uVx/jbdE3NsSdy3VlZpqMfgFNF+IXu7VTyQAAAABJRU5ErkJggg==',
  home = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACJUlEQVRoge3aPWgUQRjG8V9yUUFEECOIqCCWghaGgGChNtpYX2EnIbWVFilt7FJKWhtt7GwUFUTjVyEpBQstRFQEEQU10ZzFznm7l/Pu9rK7txf3DwPHzrzvPM/O3MzOslT0xX7cx93weyQ5gfdohPIJp4eqKCVjmMMvkYFboTTCtbnQptRsx02R6FVcwbhI+CVJczuGpLEnh/FK92l0JtQ1QtsjbfWLWlOxWR7mpLcj5/AtdPwCB7q03Yenoe13nI/VtZtoltyZEE2fZofXsLWPuC1YiMUtYLO1wgsxshePte7szAA5ZkJsA08MwchJfAidvMHUOnJNhRydplJuRsZwESuhg9vYmUHeyZCrgR+x67kYaV9aL6OWYf4aLqAeu5a5kUN4GZJ+xtksk3chUyN1fA0Jl3Awq8R98Dv0W+/VsBubMC/90polV2P9zwdNqdiFeyHBiujxYljM4qfWLr+n38DjeBcC3+JYHupSchSvRZo+4lSvgFksh4AH2J2nupRM4o7kLFnzFL0NNyQ3pYniNPZNTVLjdZH2vzwPFV/kuJtmRFNfU+szorMC0XRawvRQpA3GtEjz8r8ajMqIJBjv0HAkqYyUjQ1jJMu9YtAFIpNXQ9WIdKHfO5zpEr9hRqQyUjYqI2WjMjIAi3J8s16kkVUFHw8GPY+kjcu0n+o/UjYqI2WjMlI2NoyRToegMr/TipPQ3mlEHhUkZD0U+hFBxX/NH8vdpRiIOiS0AAAAAElFTkSuQmCC'
}

type Props = {
  iconName: IconName
  className?: string
}

const Icon: React.FC<Props> = ({ iconName, className }: Props) => {
  const iconColor = iconName === IconName.trophy ? useStyles.green : useStyles.red;

  return (
    <div className={[useStyles.iconWrap, iconColor, className].join(' ')}>
      <img data-testid="icon" className={useStyles.icon} src={iconName} />
    </div>
  )
}

export default Icon;