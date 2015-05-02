var Timer = React.createClass(
{
  render: function()
  {
    return (
      <div>Seconds Elapsed: {this.props.secondsElapsed}</div>
    );
  }
});

var TopComponent = React.render(<Timer secondsElapsed={time} />, document.body);

var time = 0;

var f = function()
{
  TopComponent.setProps({ secondsElapsed: time++ });
};
setInterval(f, 1000);
