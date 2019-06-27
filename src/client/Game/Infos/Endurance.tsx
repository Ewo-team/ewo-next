import { IStateFrontend } from '@client/reducers';
import { getSelectedCharacter } from '@client/selector';
import { Character } from '@models';
import * as React from 'react';
import { connect } from 'react-redux';

export interface EnduranceProps {
  character: Character;
}

export interface EnduranceState {
  currentDate: Date;
}

export class EnduranceComponent extends React.Component<EnduranceProps, EnduranceState> {
  constructor(props: EnduranceProps) {
    super(props);
    this.state = { currentDate: new Date() };
  }

  public render() {

    if (this.props.character === undefined) {
      return null;
    }

    const { minutes } = this.props.character;
    const { currentDate } = this.state;

    if (minutes === undefined) {
      return (
        <div className="Infos__Endurance">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: '100%' }}
            aria-valuenow={100}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      );
    }

    let dateDiff = minutes - currentDate.getMinutes();
    if (dateDiff <= 0) {
      dateDiff += 60;
    }

    const valuenow = 60 - dateDiff;
    const percent = Math.round((valuenow / 60) * 100);

    return (
      <div className="Infos__Endurance progress">
        <div
          className="progress-bar progress-bar-striped"
          role="progressbar"
          style={{ width: `${percent}%` }}
          aria-valuenow={valuenow}
          aria-valuemin={1}
          aria-valuemax={60}
        >
          {dateDiff} minutes
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state: IStateFrontend) => ({
  character: getSelectedCharacter(state),
});

export const Endurance = connect(
  mapStateToProps,
)(EnduranceComponent);
