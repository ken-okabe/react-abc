var HelloComponent = React.createClass(
{
  render: function()
  {
    var el = (<div>Hello</div>);
    return el;
  }
});

var mount = React.render(<HelloComponent/>, document.body);
