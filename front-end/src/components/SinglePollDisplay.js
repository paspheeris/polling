import React from 'react';
import Chart from 'chart.js';


class SinglePollDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.myChart = null;
    this.backgroundColors = null;
    this.drawChart = this.drawChart.bind(this);
    this.randomRGBA = this.randomRGBA.bind(this);
  }

  drawChart(canvasEl) {
    const { question, allChoices, votesByChoice } = this.props.poll;
    if (!votesByChoice) {
      return;
    }
    const choices = allChoices;
    let votes = votesByChoice.map(obj => obj.count);
    let noVotesYet = false;
    //Only redraw chart colors first time
    if (!this.backgroundColors) {
      this.backgroundColors = choices.map(() => this.randomRGBA(.4));
    }
    //Or also redraw chart colors if a new choice is added
    if (this.backgroundColors.length !== choices.length) {
      this.backgroundColors = choices.map(() => this.randomRGBA(.4));
    }
    //By default, no chart will be drawn if the array of votes for a poll
    //only contains 0's. In that case, we substitute an array of 1's for the votes, and in the label callback for the chart below, we show a decremented version for the labels if the noVotesYet flag === true
    if (votes.every(val => val === 0)) {
      votes = votes.map(val => val + 1);
      noVotesYet = true;
    }

    const ctx = canvasEl;
    Chart.defaults.global.defaultFontFamily = "sans-serif";
    this.myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [...choices],
        datasets: [{
          label: '# of Votes',
          data: [...votes],
          backgroundColor: this.backgroundColors,
        }]
      },
      options: {
        title: {
          display: true,
          text: question
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var dataLabel = data.labels[tooltipItem.index];
              var value = ': ' + (data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] - (noVotesYet ? 1 : 0));

              dataLabel += value;


              return dataLabel;
            }
          }
        }
      }
    });

  }
  randomRGBA(opacity) {
    function randomRGBAVal() {
      return Math.floor(Math.random() * 255) + 1;
    }
    return `rgba(${randomRGBAVal()}, ${randomRGBAVal()}, ${randomRGBAVal()}, ${opacity})`
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.votePending && nextProps.votePending) return false;
    return true;
  }

  componentDidUpdate() {

    if (this.myChart) {
      this.myChart.destroy();
    }
    this.drawChart(this.canvasEl);
  }

  componentDidMount() {
    if (this.myChart) {
      this.myChart.destroy();
    }
    this.drawChart(this.canvasEl);
  }

  componentWillUnmount() {
    if (this.myChart) {
      this.myChart.destroy();
    }
  }

  render() {
    if (!this.props.poll) return false;
    return (
      <div className="SinglePollDisplay-wrapper">
        <canvas ref={(canvas) => { this.canvasEl = canvas }}></canvas>
      </div>
    )
  }
}

export default SinglePollDisplay;