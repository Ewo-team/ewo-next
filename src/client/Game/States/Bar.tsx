/**
 * @module Client.Game.States
 * Display a bar
 */

import * as React from 'react';

export type BarColors = 'green' | 'red' | 'blue' | 'yellow' | 'gray' | 'none';

export interface BarProps {
  actual: number;
  max?: number;
  ratio: number;
  min?: number;
  message: string;
  large?: boolean;
  backgroundColor?: BarColors;
  valueColor?: BarColors;
}

export interface InfoBarProps {
  message: string;
  inverted?: boolean;
  backgroundColor?: BarColors;
  valueColor?: BarColors;
}

export interface SimpleBarProps {
  actual: number;
  message?: string;
  inverted?: boolean;
  backgroundColor?: BarColors;
  valueColor?: BarColors;
}

export interface DoubleBarProps {
  actual: number;
  max: number;
  min?: number;
  inverted?: boolean;
  large?: boolean;
  backgroundColor?: BarColors;
  valueColor?: BarColors;
}

// InfoBar are always green
export const InfoBar = ({ inverted, ...rest }: InfoBarProps) => !inverted ?
  (
    <Bar ratio={100} actual={1} {...rest} />
  ) :
  (
    <Bar ratio={0} actual={0} {...rest} />
  );

// SimpleBar has two state : full (any value other than 0) and empty (0)
export const SimpleBar = ({ actual, message, inverted, ...rest }: SimpleBarProps) => {
  let ratio = actual > 0 ? 100 : 0;
  if (inverted) {
    ratio = actual > 0 ? 0 : 100;
  }

  let msg = message;

  if (!message || message === '') {
    msg = String(actual);
  }

  return (
    <Bar
      actual={actual}
      ratio={ratio}
      message={msg}
      {...rest}
    />
  );
};

// DoubleBar receive two value, and display these value
export const DoubleBar = ({ actual, max, inverted, ...rest }: DoubleBarProps) => {
  const ratio = Math.ceil(actual / max * 100);
  const message = `${actual}/${max}`;

  if (inverted) {
    return (
      <Bar
        actual={actual}
        max={max}
        ratio={100 - ratio}
        message={message}
        {...rest}
      />
    );
  }

  return (
    <Bar
      actual={actual}
      max={max}
      ratio={ratio}
      message={message}
      {...rest}
    />
  );
};

const colorToClass = (color: BarColors): string | null => {
  switch (color) {
    case 'blue':
      return '';
    case 'gray':
      return 'bg-info';
    case 'green':
      return 'bg-success';
    case 'red':
      return 'bg-danger';
    case 'yellow':
      return 'bg-warning';
    case 'none':
    default:
      return null;
  }
};

export const Bar = ({ ratio, actual, min, max, message, large, backgroundColor, valueColor }: BarProps) => {
  let color = valueColor ? colorToClass(valueColor) : colorToClass('green');
  const fillRatio = 100 - ratio;
  if (!valueColor && large && ratio > 30 && ratio < 50) {
    color = colorToClass('yellow');
  }

  const background = backgroundColor ? colorToClass(backgroundColor) : colorToClass('red');

  return (
    <div className="States__Bar progress">
      <div
        className={`progress-bar ${color}`}
        role="progressbar"
        style={{ width: `${ratio}%` }}
        aria-valuenow={actual}
        aria-valuemin={min || 0}
        aria-valuemax={max || actual}
      />
      {fillRatio > 0 && background !== null ? <div
        className={`progress-bar ${background}`}
        role="progressbar"
        style={{ width: `${fillRatio}%` }}
        aria-valuenow={fillRatio}
        aria-valuemin={min || 0}
        aria-valuemax={max || actual}
      /> : null}
      <span className="Label">{message}</span>
    </div>
  );
};
