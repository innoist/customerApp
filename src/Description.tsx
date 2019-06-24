import React from "react";

interface IProps {
  countBy?: number;
}

interface IState {
  count: number;
}

class Description extends React.Component<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    countBy: 1
  };

  public state: IState = {
    count: 0
  };

  // public increase = () => {
  //     const countBy: number = countBy
  // }
}
