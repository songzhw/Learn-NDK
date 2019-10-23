import React from "react";

export const AutoAdvancesWrapper = (InComponent, advancePropName) =>
  class ComponentWithAutoAdvance extends React.PureComponent {

    componentDidMount() {
      this.startTimer();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      // 第一次加载时不走componentDidUpdate
    }


    startTimer = () => {
      const { interval, upperBound } = this.props;
      console.log(`szw 111 interval = ${interval}`);
      // 这包含了 undefined 与 0
      if (!interval) {
        return;
      }
      console.log(`szw 222`);
      this._timer = setTimeout(() => {
        this.props[`${advancePropName}Increment`](upperBound);
      }, interval);
    };

    componentWillUnmount() {
      this.clearTimer();
    }

    clearTimer = () => {
      clearTimeout(this._timer);
    };

    render() {
      return <InComponent {...this.props}/>;
    }
  };
