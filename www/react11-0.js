"use strict";
//worldcomponent the tiny FRP
//copy-pasted here, available in npm-------------
var worldcomponent = function(initialVal)
{
  var computingF = [];
  var value = {};
  var state;
  Object.defineProperties(value,
  {
    val: //value.val
    {
      get: function()
      {
        return state;
      },
      set: function(x)
      {
        state = x;
        computingF.map(
          function(f)
          {
            f(x);
          });
        return;
      }
    }
  });
  var o = {
    compute: function(f)
    {
      var f1 = function()
      {
        computingF[computingF.length] = f; //push  f
        value.val = initialVal;
      };
      return f1;
    },
    appear: function(a)
    {
      var f1 = function(){value.val = a;};
      return f1;
    },
    now: function()
    {
      return value.val;
    }
  };

  return o;
};

Object.defineProperties(worldcomponent,
{
  world: //our physical world
  {
    set: function(f)
    {
      return f();
    }
  }
});

worldcomponent.log = function(a)
{
  var f = console.log.bind(console, a);
  return f;
};
//-----------------------------------------

var ___ = worldcomponent;
___.world = ___.log('start!'); //debug log

var CARDS = 4;
var ___totalClicks = ___(0);

var TopComponent = React.createClass(
{
  render: function()
  {
    var divStyle = {background:"#aaaaaa"};
    var el = (
      <div style={divStyle}>
        <h1>Click Counter</h1>
        <ChildrenComponent/>
      </div>
    );
    return el;
  }
});

var ChildrenComponent = React.createClass(
{
  render: function()
  {
    var createChild = function(n)
    {
      return (<ChildComponent id={n} ___clicks={___(0)}/>);
    };

    var array = Immutable.Range(0, CARDS).toArray();
    var elArray = array.map(createChild);

    var el = (<div>{elArray}</div>);
    return el;
  }
});

var ChildComponent = React.createClass(
{
  componentDidMount: function()
  {
    var com = this;

    ___.world = com.props.___clicks
                .compute(function(x){com.forceUpdate();});
    ___.world = ___totalClicks
                .compute(function(x){com.forceUpdate();});
  },
  handleClick: function()
  {
    var com = this;

    ___.world = com.props.___clicks
                  .appear(com.props.___clicks.now() + 1);
    ___.world = ___totalClicks
                  .appear(___totalClicks.now() + 1);
  },
  render: function()
  {
    var com = this;

    var divStyle = {background:"#dddddd",
                    width:"210px",height:"210px",
                    margin:"5px",float:"left",
                    "user-select": "none",
                    "-moz-user-select": "none",
                    "-webkit-user-select": "none",
                    "-ms-user-select": "none"};

    var el = (<div style={divStyle} onClick={com.handleClick}>
                <h2>id : {com.props.id}</h2>
                <h4>Local Clicks : {com.props.___clicks.now()}</h4>
                <h4>Total Clicks : {___totalClicks.now()}</h4>
              </div>);
    return el;
  }
});

var mount = React.render(<TopComponent/>, document.body);
