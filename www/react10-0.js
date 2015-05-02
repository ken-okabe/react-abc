var Timer = React.createClass(
{
  render: function()
  {
    return (
      <div>Seconds Elapsed: {time}</div>
    );
  }
});

var time = 0;

var f = function()
{
  time++;
  React.render(<Timer/>, document.body);
};
setInterval(f, 1000);
